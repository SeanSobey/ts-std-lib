/**
 * A function that returns a promise
 */
export type AsyncFunction<T> = (...args: ReadonlyArray<any>) => Promise<T>;
