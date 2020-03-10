/**
 * Type safe JSON
 */
export type Json = string | number | boolean | null | undefined | JsonObject | JsonArray | IJsonSerializable;

/**
 * Type safe JSON object
 */
export type JsonObject = {
	// Note: https://github.com/Microsoft/TypeScript/issues/15300
	readonly [index: string]: Json;
};

/**
 * Type safe JSON array
 */
export interface JsonArray extends ReadonlyArray<Json> {}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

/**
 * Convertible into a JSON string.
 */
export interface IJsonSerializable {
	/**
	 * @param key If this object is a property value, the property name, if it is in an array, the index in the array, as a string, otherwise an empty string.
	 */
	toJSON(key?: string | number): Json;
}

//export type Reviver<T> = (this: T, key: keyof T, value: any) => any;
export type Reviver<T> = (this: T, key: string, value: any) => any;

//export type Replacer<T> = (this: T, key: keyof T & string, value: any) => any;
export type Replacer<T> = (this: T, key: string, value: any) => any;
