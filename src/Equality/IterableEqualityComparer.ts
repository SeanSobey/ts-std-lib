import { IEqualityComparer } from './IEqualityComparer';

/**
 * Equality comparer that tests equality using sequential equality (same elements in same position) for Iterables. Is not recursive.
 */
export class IterableEqualityComparer<T> implements IEqualityComparer<Iterable<T>> {

	public constructor(
		private readonly _equalityComparer: IEqualityComparer<T>,
	) { }

	public equals(a: Iterable<T>, b: Iterable<T>): boolean {

		const aArray = Array.from(a);
		const bArray = Array.from(b);
		if (aArray.length !== bArray.length) {
			return false;
		}
		return aArray.every((element, index) => {
			const otherElement = bArray[index];
			return this._equalityComparer.equals(element, otherElement);
		});
	}
}
