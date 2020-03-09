import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Type, PrimitiveType } from '../../Type';

export function isJsonSerializer<T>(object: unknown): object is IJsonSerializer<T> {

	return Type.hasKeysOf<IJsonSerializer<T>>(object, new Map<keyof IJsonSerializer<T>, PrimitiveType>([
		[jsonSerializer, 'boolean'],
		['serialize', 'function'],
		['deserialize', 'function']
	]));
}
