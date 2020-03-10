import { types } from 'util';

import { AbstractConstructor } from './Constructor';
import { Primitive } from './Primitive';
import { AsyncFunction } from './AsyncFunction';

// https://nodejs.org/api/util.html#util_util_types
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
// https://github.com/CodingFu/typeof
// https://blog.logrocket.com/javascript-typeof-2511d53a1a62

/**
 * Extended types from `typeof`
 */
export type PrimitiveType = 'undefined' | 'null' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'array' | 'object';

/**
 * For runtime type operations
 */
export class Type {

	/**
	 * Improved `typeof value` function, accounts for null and arrays.
	 * @param value The value to test.
	 */
	public static of(value: unknown): PrimitiveType {

		if (value === null) {
			return 'null';
		}
		if (Array.isArray(value)) {
			return 'array';
		}
		return typeof value;
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

	/**
	 * Check if a value is an instance of a type
	 * @param constructor The type
	 * @param value The value
	 */
	public static isInstanceOf<T>(constructor: AbstractConstructor<T>, value: any): value is T {

		return value instanceof constructor;
	}

	/**
	 * Check if a value is null
	 * @param value The value
	 */
	public static isNull(value: any): value is null {

		return value === null;
	}

	/**
	 * Check if a value is undefined
	 * @param value The value
	 */
	public static isUndefined(value: any): value is undefined {

		return value === undefined;
	}

	/**
	 * Check if a value is a boolean
	 * @param value The value
	 */
	public static isBoolean(value: any): value is boolean {

		return typeof value === 'boolean';
	}

	/**
	 * Check if a value is a number
	 * @param value The value
	 */
	public static isNumber(value: any): value is number {

		return typeof value === 'number';
	}

	/**
	 * Check if a value is a BigInt
	 * @param value The value
	 */
	public static isBigInt(value: any): value is BigInt {

		return typeof value === 'bigint';
	}

	/**
	 * Check if a value is a string
	 * @param value The object
	 */
	public static isString(value: any): value is string {

		return typeof value === 'string';
	}

	/**
	 * Check if a value is a function
	 * @param value The value
	 */
	// tslint:disable-next-line:ban-types
	public static isFunction(value: any): value is Function {

		return typeof value === 'function';
	}

	/**
	 * Check if a value is a symbol
	 * @param value The value
	 */
	public static isSymbol(value: any): value is symbol {

		return typeof value === 'symbol';
	}

	/**
	 * Check if a value is a generator function
	 * @param value The value
	 */
	public static isGeneratorFunction(value: any): value is GeneratorFunction {

		return types.isGeneratorFunction(value);
	}

	/**
	 * Check if a value is an async function
	 * @param value The value
	 */
	public static isAsyncFunction(value: any): value is AsyncFunction<any> {

		return types.isAsyncFunction(value);
	}

	/**
	 * Check if a value is a promise
	 * @param value The value
	 */
	public static isPromise(value: any): value is Promise<any> {

		return types.isPromise(value);
	}

	/**
	 * Check if a value is a proxy
	 * @param value The value
	 */
	public static isProxy(value: any): value is typeof Proxy {

		return types.isProxy(value);
	}

	/**
	 * Check if a value is a regular expression
	 * @param value The value
	 */
	public static isRegExp(value: any): value is RegExp {

		return types.isRegExp(value);
	}

	/**
	 * Check if a value is an iterable
	 * @param value The value
	 */
	public static isIterable(value: any): value is Iterable<any> {

		if (typeof value !== 'object' || value === null) {
			return false;
		}
		return Symbol.iterator in value && typeof value[Symbol.iterator] === 'function';
	}

	/**
	 * Check if a value is an async iterable
	 * @param value The value
	 */
	public static isAsyncIterable(value: any): value is AsyncIterable<any> {

		if (typeof value !== 'object' || value === null) {
			return false;
		}
		return Symbol.asyncIterator in value && typeof (value)[Symbol.asyncIterator] === 'function';
	}

	/**
	 * Check if a value is an array
	 * @param value The value
	 */
	public static isArray(value: unknown): value is ReadonlyArray<any> {

		return Array.isArray(value);
	}

	/**
	 * Check if a value is array like
	 * @param value The value
	 */
	public static isArrayLike(value: unknown): value is ArrayLike<any> {

		if (typeof value !== 'object' || value === null) {
			return false;
		}
		return Type.hasKeysOf<ArrayLike<any>>(value, ['length']);
	}

	/**
	 * Check if a value is a non-null object
	 * @param value The value
	 */
	public static isObject(value: unknown): value is NonNullable<object> {

		if (typeof value !== 'object' || value === null || Array.isArray(value) || types.isRegExp(value)) {
			return false;
		}
		return true;
	}

	/**
	 * Check if a value is a class
	 * @param value The value
	 */
	// tslint:disable-next-line:ban-types
	public static isClass(value: unknown): value is object {

		if (typeof value !== 'object' || value === null || Array.isArray(value) || types.isRegExp(value)) {
			return false;
		}
		return value.constructor !== Object.prototype.constructor; // TODO: Is this the best way to test is a class?
	}

	/**
	 * Check if an object is a primitive
	 * @param value The value
	 */
	public static isPrimitive(value: unknown): value is Primitive {

		if (value === null) {
			return false;
		}
		if (value === undefined) {
			return false;
		}
		return (value !== Object(value));
	}


	// public static hasKeysOf<T extends object>(value: unknown, expectedKeys: ReadonlyArray<keyof T> | ReadonlyMap<keyof T, typeof value[keyof T]>): value is T {
	public static hasKeysOf<T extends object>(value: unknown, expectedKeys: ReadonlyArray<keyof T> | ReadonlyMap<keyof T, PrimitiveType>): value is T {
	// public static hasKeysOf<T extends object>(value: unknown, expectedKeys: ReadonlyArray<keyof T> | { readonly [key: keyof T]: string }): value is T {
	// public static hasKeysOf<T extends object>(value: unknown, expectedKeys: ReadonlyArray<keyof T>): value is T {

		if (typeof value !== 'object' || value === null) {
			return false;
		}
		const expectedKeyMap: ReadonlyMap<keyof T, PrimitiveType | '*'> = Type.isArray(expectedKeys)
			? new Map(expectedKeys.map((expectedKey) => [expectedKey, '*']))
			: expectedKeys;
		// 	: new Map(Object.entries(expectedKeys));
		for (const [expectedKey, expectedKeyType] of expectedKeyMap) {
			if (!(expectedKey in value)) {
				return false;
			}
			if (expectedKeyType === '*') {
				continue;
			}
			if (typeof (value as any)[expectedKey] !== expectedKeyType) {
				return false;
			}
		}
		return true;
	}
}
