export const equals = Symbol('equals');

/**
 * Can be evaluated vor equality
 */
export interface IEquatable<T> {
	[equals](other: T): boolean;
}
