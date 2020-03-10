import { Json } from './Json';

export const jsonSerializer = Symbol('jsonSerializer');

/**
 * Json serializer for objects
 */
export interface IJsonSerializer<T> {
	readonly [jsonSerializer]: true;
	serialize(object: T): Json;
	deserialize(json: Json): T;
}
