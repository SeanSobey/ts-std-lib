import { IEqualityComparer } from './IEqualityComparer';
import { DefaultEqualityComparer } from './DefaultEqualityComparer';

export function equalTo<T>(a: T, b: T, equalityComparer?: IEqualityComparer<T>): boolean {

	const comparer = equalityComparer || new DefaultEqualityComparer();
	return comparer.equals(a, b);
}
