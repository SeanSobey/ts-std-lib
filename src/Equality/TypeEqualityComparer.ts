import { IEqualityComparer } from './IEqualityComparer';

/**
 * Equality comparer that tests equality using runtime types.
 */
export class TypeEqualityComparer implements IEqualityComparer<any> {

	public equals(a: unknown, b: unknown): boolean {

		if (typeof a !== 'object' || typeof b !== 'object') {
			return typeof b === typeof a;
		}
		if (a === null || b === null) {
			return Object.is(a, b);
		}
		return Reflect.getPrototypeOf(a) === Reflect.getPrototypeOf(b);
	}
}
