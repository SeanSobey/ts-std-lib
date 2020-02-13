/**
 * A object that can apply a filter function.
 */
export interface IFilterable<T> {
	/**
	 * Returns a Filterable that meets the condition specified in a predicate function.
	 *
	 * @param predicate The filter method calls the predicate function to check for value(s) that pass.
	 * @returns A new Filterable that passed the predicate.
	 */
	filter<S extends T>(predicate: (value: T) => value is S): IFilterable<S>;
	/**
	 * Returns a Filterable that meets the condition specified in a predicate function.
	 *
	 * @param predicate The filter method calls the predicate function to check for value(s) that pass.
	 * @returns A new Filterable that passed the predicate.
	 */
	filter(predicate: (value: T) => boolean): IFilterable<T>;
}
