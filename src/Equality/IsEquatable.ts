import { IEquatable, equals } from './IEquatable';
import { Type } from '../Type';

export function isEquatable<T>(object: unknown): object is IEquatable<T> {

	return Type.hasKeysOf<IEquatable<T>>(object, [equals]);
}
