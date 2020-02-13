export const equals = Symbol('equals');

export interface IEquatable<T> {
	[equals](other: T): boolean;
}
