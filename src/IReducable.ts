/**
 * A object that can apply a reduce function.
 */
export interface IReducable<T, U> {
	/**
	 * Calls the specified callback function for all the elements. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
	 *
	 * @param callbackfn The reduce method calls the callbackfn function one time for each element.
	 * @param initialValue If initialValue is specified, it is used as the initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an element.
	 * @returns The result.
	 */
	reduce(callbackfn: (previousValue: T, currentValue: T) => T, initialValue?: T): U;
	/**
	 * Calls the specified callback function for all the elements. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
	 *
	 * @param callbackfn The reduce method calls the callbackfn function one time for each element.
	 * @param initialValue The initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an element.
	 * @returns The result.
	 */
	reduce<V>(callbackfn: (previousValue: V, currentValue: T) => V, initialValue: V): V;
}
