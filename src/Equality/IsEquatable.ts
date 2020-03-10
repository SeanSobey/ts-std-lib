import { IEquatable, equals } from './IEquatable';
import { Type } from '../Type';

/**
 * Checks if an object implements equatable
 * @param object the object to check
 */
export function isEquatable<T>(object: unknown): object is IEquatable<T> {

	return Type.hasKeysOf<IEquatable<T>>(object, new Map([
		[equals, 'function']
	]));
}
