import { IEqualityComparer } from './IEqualityComparer';
import { DefaultEqualityComparer } from './DefaultEqualityComparer';

/**
 * A better `===` operator function
 * @param a First object
 * @param b Second object
 * @param equalityComparer Optional equality comparer
 */
export function equalTo<T>(a: T, b: T, equalityComparer?: IEqualityComparer<T>): boolean {

	const comparer = equalityComparer || new DefaultEqualityComparer();
	return comparer.equals(a, b);
}
