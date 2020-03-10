import { IJsonSerializable } from './Json';
import { Type } from '../../Type';

/**
 * Checks if an object is json serializable
 */
export function isJsonSerializable(object: unknown): object is IJsonSerializable {

	return Type.hasKeysOf<IJsonSerializable>(object, new Map([
		['toJSON', 'function']
	]));
}
