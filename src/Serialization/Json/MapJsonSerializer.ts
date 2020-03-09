import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Json, JsonArray } from './Json';
import { Type } from '../../Type';
import { UnexpectedJsonError } from './UnexpectedJsonError';

export class MapJsonSerializer<K extends Json, V extends Json> implements IJsonSerializer<ReadonlyMap<K, V>> {

	public readonly [jsonSerializer] = true;

	public serialize(object: ReadonlyMap<K, V>): Json {

		return [...object] as JsonArray;
	}

	public deserialize(json: Json): ReadonlyMap<K, V> {

		if (!Type.isArray(json)) {
			throw new UnexpectedJsonError(json);
		}
		return new Map(json as any); // TODO!
	}
}
