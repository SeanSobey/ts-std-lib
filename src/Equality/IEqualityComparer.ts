export interface IEqualityComparer<T> {
	equals(a: T, b: T): boolean;
}
