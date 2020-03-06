import { types } from 'util';

import { AbstractConstructor } from './Constructor';
import { Primitive } from './Primitive';
import { AsyncFunction } from './AsyncFunction';

// https://nodejs.org/api/util.html#util_util_types
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
//https://github.com/CodingFu/typeof
//https://blog.logrocket.com/javascript-typeof-2511d53a1a62

export type PrimitiveType = 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'array' | 'object';

export class Type {

	/**
	 * Improved `typeof object` function, accounts for null and arrays.
	 * @param object The object to test.
	 */
	public static of(object: unknown): PrimitiveType {

		if (object === null) {
			return 'null';
		}
		if (Array.isArray(object)) {
			return 'array';
		}
		return typeof object;
	}

	// /**
	//  * Check for the same javascript type, for primitives and for custom types (using )
	//  * @param object
	//  * @param other
	//  */
	// public static isSame<T>(object: unknown, other: T): object is T {

	// 	if (object === null || other === null) {
	// 		return Object.is(other, object);
	// 	}
	// 	if (typeof object !== 'object' || typeof other !== 'object') {
	// 		return typeof other === typeof object;
	// 	}
	// 	return Reflect.getPrototypeOf(object) === Reflect.getPrototypeOf(other as any);
	// }

	public static isInstanceOf<T>(constructor: AbstractConstructor<T>, object: any): object is T {

		return object instanceof constructor;
	}

	public static isNull(object: any): object is null {

		return object === null;
	}

	public static isUndefined(object: any): object is undefined {

		return object === undefined;
	}

	public static isBoolean(object: any): object is boolean {

		return typeof object === 'boolean';
	}

	public static isNumber(value: any): value is number {

		return typeof value === 'number';
	}

	public static isBigInt(value: any): value is BigInt {

		return typeof value === 'bigint';
	}

	public static isString(object: any): object is string {

		return typeof object === 'string';
	}

	// tslint:disable-next-line:ban-types
	public static isFunction(object: any): object is Function {

		return typeof object === 'function';
	}

	public static isSymbol(object: any): object is symbol {

		return typeof object === 'symbol';
	}

	public static isGeneratorFunction(object: any): object is GeneratorFunction {

		return types.isGeneratorFunction(object);
	}

	public static isAsyncFunction(object: any): object is AsyncFunction<any> {

		return types.isAsyncFunction(object);
	}

	public static isPromise(object: any): object is Promise<any> {

		return types.isPromise(object);
	}

	public static isProxy(object: any): object is typeof Proxy {

		return types.isProxy(object);
	}

	public static isRegExp(object: any): object is RegExp {

		return types.isRegExp(object);
	}

	public static isIterable(object: any): object is Iterable<any> {

		if (typeof object !== 'object' || object === null) {
			return false;
		}
		return Symbol.iterator in object && typeof object[Symbol.iterator] === 'function';
	}

	public static isAsyncIterable(object: any): object is AsyncIterable<any> {

		if (typeof object !== 'object' || object === null) {
			return false;
		}
		return Symbol.asyncIterator in object && typeof (object)[Symbol.asyncIterator] === 'function';
	}

	public static isArray(object: unknown): object is ReadonlyArray<any> {

		return Array.isArray(object);
	}

	public static isArrayLike(object: unknown): object is ArrayLike<any> {

		if (typeof object !== 'object' || object === null) {
			return false;
		}
		return 'length' in object && typeof (object as any).length === 'number';
	}

	public static isObject(object: unknown): object is NonNullable<object> {

		if (typeof object !== 'object' || object === null || Array.isArray(object) || types.isRegExp(object)) {
			return false;
		}
		return true;
	}

	// tslint:disable-next-line:ban-types
	public static isClass(object: unknown): object is object {

		if (typeof object !== 'object' || object === null || Array.isArray(object) || types.isRegExp(object)) {
			return false;
		}
		return object.constructor !== Object.prototype.constructor; // TODO: Is this the best way to test is a class?
	}

	public static isPrimitive(object: unknown): object is Primitive {

		if (object === null) {
			return false;
		}
		if (object === undefined) {
			return false;
		}
		return (object !== Object(object));
	}


	// public static hasKeysOf<T extends object>(object: unknown, expectedKeys: ReadonlyArray<keyof T> | ReadonlyMap<keyof T, typeof object[keyof T]>): object is T {
	public static hasKeysOf<T extends object>(object: unknown, expectedKeys: ReadonlyArray<keyof T> | ReadonlyMap<keyof T, PrimitiveType>): object is T {
	// public static hasKeysOf<T extends object>(object: unknown, expectedKeys: ReadonlyArray<keyof T> | { readonly [key: keyof T]: string }): object is T {
	// public static hasKeysOf<T extends object>(object: unknown, expectedKeys: ReadonlyArray<keyof T>): object is T {

		if (typeof object !== 'object' || object === null) {
			return false;
		}
		const expectedKeyMap: ReadonlyMap<keyof T, PrimitiveType | '*'> = Type.isArray(expectedKeys)
			? new Map(expectedKeys.map((expectedKey) => [expectedKey, '*']))
			: expectedKeys;
		// 	: new Map(Object.entries(expectedKeys));
		for (const [expectedKey, expectedKeyType] of expectedKeyMap) {
			if (!(expectedKey in object)) {
				return false;
			}
			if (expectedKeyType === '*') {
				continue;
			}
			if (typeof (object as any)[expectedKey] !== expectedKeyType) {
				return false;
			}
		}
		return true;
	}
}
