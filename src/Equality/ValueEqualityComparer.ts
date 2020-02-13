import { IEqualityComparer } from './IEqualityComparer';

/**
 * Equality comparer that tests equality using [same-value equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value_equality).
 */
export class ValueEqualityComparer implements IEqualityComparer<any> {

	public equals(a: any, b: any): boolean {

		return Object.is(a, b);
	}
}
