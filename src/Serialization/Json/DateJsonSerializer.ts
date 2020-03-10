import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Json } from './Json';
import { Type } from '../../Type';
import { UnexpectedJsonError } from './UnexpectedJsonError';

/**
 * Json serializer for the native Date class
 */
export class DateJsonSerializer implements IJsonSerializer<Date> {

	public readonly [jsonSerializer] = true;

	public serialize(object: Date): Json {

		return object.toJSON();
	}

	public deserialize(json: Json): Date {

		if (!Type.isString(json)) {
			throw new UnexpectedJsonError(json);
		}
		return new Date(json);
	}
}
