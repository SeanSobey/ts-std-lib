import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Json, JsonArray } from './Json';
import { Type } from '../../Type';
import { UnexpectedJsonError } from './UnexpectedJsonError';

export class SetJsonSerializer<T extends Json> implements IJsonSerializer<ReadonlySet<T>> {

	public readonly [jsonSerializer] = true;

	public serialize(object: ReadonlySet<T>): Json {

		return [...object] as JsonArray;
	}

	public deserialize(json: Json): ReadonlySet<T> {

		if (!Type.isArray(json)) {
			throw new UnexpectedJsonError(json);
		}
		return new Set(json as any); // TODO!
	}
}
