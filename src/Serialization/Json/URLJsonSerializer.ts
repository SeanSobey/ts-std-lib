import { URL } from 'url';

import { Json } from './Json';
import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Type } from '../../Type';
import { UnexpectedJsonError } from './UnexpectedJsonError';

/**
 * Json serializer for the node URL class
 */
export class URLJsonSerializer implements IJsonSerializer<URL> {

	public readonly [jsonSerializer] = true;

	public serialize(object: URL): Json {

		return object;
	}

	public deserialize(json: Json): URL {

		if (!Type.isString(json)) {
			throw new UnexpectedJsonError(json);
		}
		return new URL(json);
	}
}
