import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Json } from './Json';
import { Type } from '../../Type';
import { UnexpectedJsonError } from './UnexpectedJsonError';
import { isJsonSerializable } from './IsJsonSerializable';
import { equalTo } from '../../Equality';

/**
 * Json serializer for the native Buffer class
 */
export class BufferJsonSerializer implements IJsonSerializer<Buffer> {

	public readonly [jsonSerializer] = true;

	public serialize(object: Buffer): Json {

		return object.toJSON();
	}

	public deserialize(json: Json): Buffer {

		if (!Type.isObject(json) || Type.isArray(json) || isJsonSerializable(json)) {
			throw new UnexpectedJsonError(json);
		}
		const { type, data } = json;
		if (!Type.isString(type) || !equalTo(type, 'Buffer')) {
			throw new UnexpectedJsonError(json);
		}
		if (!Type.isArray(data)) {
			throw new UnexpectedJsonError(json);
		}
		return Buffer.from(data as Array<number>);
	}
}
