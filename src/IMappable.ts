/**
 * A Functor object that can apply a map function.
 */
export interface IMappable<T> {
	/**
	 * Calls a defined callback function on each element of an object, and returns a new Mappable that contains the results.
	 *
	 * @param callbackfn The map method calls the callbackfn function one time for each element in the Mappable.
	 * @returns A new Mappable of the results.
	 */
	map<U>(callbackfn: (value: T) => U): IMappable<U>;
}
