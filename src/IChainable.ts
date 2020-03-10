/**
 * A Monad object that can apply a flatMap/chain function.
 *
 * @template T The input type.
 */
export interface IChainable<T> {
	/**
	 * Calls a defined callback function on each element of an object, and returns a new Chainable that contains the results.
	 *
	 * @template U The output type.
	 * @param callbackfn The chain method calls the callbackfn function one time for each element in the Mappable.
	 * @returns A new Chainable of the results.
	 */
	chain<U>(callbackfn: (value: T) => IChainable<U>): IChainable<U>;
	// tslint:disable-next-line:unified-signatures
	chain<U>(callbackfn: (value: T) => U): IChainable<U>;
}
