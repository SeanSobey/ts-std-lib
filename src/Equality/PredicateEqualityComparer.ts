import { IEqualityComparer } from './IEqualityComparer';

/**
 * Equality comparer that tests equality using a given predicate function.
 */
export class PredicateEqualityComparer<T> implements IEqualityComparer<T> {

	public constructor(
		private readonly _predicate: (a: T, b: T) => boolean
	) {}

	public equals(a: T, b: T): boolean {

		return this._predicate(a, b);
	}
}
