import 'reflect-metadata';

import { Json } from './Json';
import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { IJsonSerializable } from './Json';
import { Constructor } from '../../Constructor';
import { Type } from '../../Type';
import { Optional } from '../../Optional';
import { isJsonSerializable } from './IsJsonSerializable';
import { isJsonSerializer } from './IsJsonSerializer';
import { DefaultInspector } from '../../DefaultInspector';

export interface JsonSerializableConstructor {
	fromJSON<T extends JsonSerializable>(json: Json): T;
}

/**
 * A base type to use for objects that can then be serialized to/from json using decorators
 */
export abstract class JsonSerializable implements IJsonSerializable {

	public static fromJSON<T extends JsonSerializable>(json: Json): T {

		const constructor: Constructor<T> = this as any;
		//const parameterNames = getConstructorParameterNames(constructor); //?
		const parameterMetadatas = getJsonParameterMetadata<T>(constructor);
		const parsedJson = parseJson(json);
		if (Type.isArray(parsedJson)) {
			throw new Error('Array json is not yet supported.');
		}
		const constructorArgs: ReadonlyArray<any> = !parameterMetadatas
			? []
			: Array.from({ length: constructor.length })
				.map((_, index) => {
					const parameterMetadata = parameterMetadatas.find(p => p.index === index);
					if (!parameterMetadata) {
						return undefined;
					}
					// TODO: Here we assume we should use the same raw JSON for potentially multiple parameters...
					const value = Type.isObject(parsedJson)
						? parsedJson[parameterMetadata.name]
						: parsedJson;
					const serializer: IJsonSerializer<any> = isJsonSerializer(parameterMetadata.serializer)
						? parameterMetadata.serializer
						: new DefaultSerializer(parameterMetadata.serializer);
					return serializer.deserialize(value);
				});
		const instance = new constructor(...constructorArgs);
		for (const propertyKey of Reflect.ownKeys(instance)) {
			const propertyMetadata = getJsonPropertyMetadata<T>(instance, propertyKey);
			if (!propertyMetadata) {
				continue;
			}
			if (!!parameterMetadatas && parameterMetadatas.find(p => p.name === propertyMetadata.name)) {
				continue;
			}
			// TODO: Here we assume we should use the same raw JSON for potentially multiple properties...
			const value = Type.isObject(parsedJson)
				? parsedJson[propertyMetadata.name]
				: parsedJson;
			const serializer: IJsonSerializer<any> = isJsonSerializer(propertyMetadata.serializer)
				? propertyMetadata.serializer
				: new DefaultSerializer(propertyMetadata.serializer);
			(instance as any)[propertyKey] = serializer.deserialize(value);
		}
		return instance;
	}

	public toJSON(_key?: string | number): Json {

		const serialized: { [index: string]: any } = {};
		for (const propertyKey of Reflect.ownKeys(this)) {
			const propertyValue = (this as any)[propertyKey];
			const metadata = getJsonPropertyMetadata<JsonSerializable>(this, propertyKey);
			if (metadata) {
				const serializer: IJsonSerializer<any> = isJsonSerializer(metadata.serializer)
					? metadata.serializer
					: new DefaultSerializer(metadata.serializer);
				serialized[metadata.name] = serializer.serialize(propertyValue);
			}
		}
		return serialized;
	}
}

/**
 * A default implementation of IJsonSerializer
 */
export class DefaultSerializer implements IJsonSerializer<any> {

	public readonly [jsonSerializer] = true;

	private readonly _jsonSerializableConstructor: Optional<JsonSerializableConstructor>;

	public constructor(jsonSerializableConstructor?: JsonSerializableConstructor) {

		this._jsonSerializableConstructor = new Optional(jsonSerializableConstructor);
	}

	public serialize(object: unknown): Json {

		if (Type.isNull(object)) {
			return object;
		}
		if (Type.isUndefined(object)) {
			return object;
		}
		if (Type.isBoolean(object)) {
			return object;
		}
		if (Type.isNumber(object)) {
			return object;
		}
		if (Type.isString(object)) {
			return object;
		}
		if (Type.isFunction(object)) {
			throw new Error('Cannot serialize functions');
		}
		if (Type.isSymbol(object)) {
			throw new Error('Cannot serialize symbols');
		}
		if (!Type.isObject(object)) {
			throw new Error('Cannot serialize ' + typeof object);
		}
		if (Type.isArray(object)) {
			return object.map((value) => this.serialize(value));
		}
		if (isJsonSerializable(object)) {
			return object;
		}
		if (Type.isClass(object)) {
			const defaultInspector = new DefaultInspector();
			throw new Error('Cannot serialize class ' + defaultInspector.inspect(object));
		}
		return Object.entries(object).reduce((obj, [key, value]) => {
			obj[key] = this.serialize(value);
			return obj;
		}, {} as { [key: string]: any });
	}

	public deserialize(json: Json): any {

		// if (json === null || json === undefined) {
		// 	return json;
		// }
		if (this._jsonSerializableConstructor.isPresent()) {
			const jsonSerializableConstructor = this._jsonSerializableConstructor.get();
			return jsonSerializableConstructor.fromJSON(json);
		}
		return json;
	}
}

function parseJson(json: Json): { readonly [key: string]: any } | ReadonlyArray<any> | string | number | boolean | null | undefined {

	if (isJsonSerializable(json)) {
		return parseJson(json.toJSON());
	}
	if (Type.isArray(json)) {
		return (json as ReadonlyArray<Json>).map(parseJson);
	}
	if (Type.isObject(json)) {
		const object = {} as { [key: string]: any };
		Object.entries(json).forEach(([key, value]) => {
			object[key] = parseJson(value);
		});
		return object;
	}
	return json;
}

function getJsonPropertyMetadata<T>(constructor: object, propertyKey: PropertyKey): JsonPropertyMetadata<T> | undefined {

	return Reflect.getMetadata(jsonPropertyMetadataKey, constructor, typeof propertyKey === 'number' ? propertyKey.toString() : propertyKey);
}

function getJsonParameterMetadata<T>(constructor: object): ReadonlyArray<JsonParameterMetadata<T>> | undefined {

	return Reflect.getMetadata(jsonParameterMetadataKey, constructor, constructorPropertyKey);
}

const jsonPropertyMetadataKey = Symbol('jsonProperty');
const jsonParameterMetadataKey = Symbol('jsonParameter');
const constructorPropertyKey = Symbol('constructor');

interface JsonPropertyMetadata<T> {
	readonly name: string;
	readonly serializer?: IJsonSerializer<T> | JsonSerializableConstructor;
}

interface JsonParameterMetadata<T> {
	readonly index: number;
	readonly name: string;
	readonly serializer?: IJsonSerializer<T> | JsonSerializableConstructor;
}

export function jsonProperty<T>(name?: string, serializer?: IJsonSerializer<T> | JsonSerializableConstructor): PropertyDecorator;
export function jsonProperty<T>(serializer?: IJsonSerializer<T> | JsonSerializableConstructor): PropertyDecorator;
export function jsonProperty<T>(nameOrSerializer?: string | IJsonSerializer<T> | JsonSerializableConstructor, serializer?: IJsonSerializer<T> | JsonSerializableConstructor): PropertyDecorator {

	const name = typeof nameOrSerializer === 'string'
		? nameOrSerializer
		: undefined;
	return (target, propertyKey) => {

		if (!target || !propertyKey) {
			return;
		}
		const metadataValue: JsonPropertyMetadata<T> = {
			name: name || propertyKey.toString(),
			serializer: !!nameOrSerializer && typeof nameOrSerializer !== 'string'
				? nameOrSerializer
				: serializer,
		};
		Reflect.defineMetadata(jsonPropertyMetadataKey, metadataValue, target, propertyKey);
	};
}

const STRIP_COMMENTS = /(\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s*=[^,)]*(('(?:\\'|[^'\r\n])*')|("(?:\\"|[^"\r\n])*"))|(\s*=[^,)]*))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;

// tslint:disable-next-line:ban-types
function getParamNames(func: Function): ReadonlyArray<string> {

	const fnStr = func.toString().replace(STRIP_COMMENTS, '');
	const result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	return result || [];
}

function getConstructorParameterNames(func: object): ReadonlyArray<string> {

	// https://gist.github.com/afaqurk/507a9954c47491ebbc3adfe12dc8fd28
	try {
		// try to see if environment supports class syntax
		// tslint:disable-next-line:no-eval
		eval('"use strict"; class foo {}'); // thanks to: http://stackoverflow.com/a/30692705/1735884
	} catch (e) {
		throw new Error('Expected native classes to be supported');
	}

	const classString = func.toString();
	const beginningOfConstructor = classString.indexOf('constructor(');
	const endOfConstructor = classString.indexOf(')', beginningOfConstructor);
	const length = endOfConstructor - beginningOfConstructor;
	const args = classString.substr(beginningOfConstructor, length).replace('constructor(', '');

	// thanks to: https://davidwalsh.name/javascript-arguments
	const result = args
		.split(',')
		.map((arg) => arg.replace(/\/\*.*\*\//, '').trim())
		.filter((arg) => !!arg);

	return result;
}

export function jsonParameter<T>(name?: string, serializer?: IJsonSerializer<T> | JsonSerializableConstructor): ParameterDecorator {

	return (target, propertyKey, parameterIndex) => {

		if (!target) {
			return;
		}
		const parameterNames = propertyKey
			? getParamNames((target as any)[propertyKey])
			: getConstructorParameterNames(target);
		const methodName = propertyKey || constructorPropertyKey;
		const metadataValues: Array<JsonParameterMetadata<T>> = Reflect.getOwnMetadata(jsonParameterMetadataKey, target, methodName) || [];
		const metadataValue: JsonParameterMetadata<T> = {
			index: parameterIndex,
			name: name || parameterNames[parameterIndex],
			serializer,
		};
		metadataValues.push(metadataValue);
		Reflect.defineMetadata(jsonParameterMetadataKey, metadataValues, target, methodName);
	};
}
