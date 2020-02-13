export interface IPipeable<T> {
	/**
	 * Runs each of the functions supplied as parameters in turn,
	 * passing the return value of each function invocation to the next function invocation,
	 * beginning with whatever arguments were passed to the initial invocation.
	 */
	pipe<T1>(fn: (v: T) => T1): IPipeable<T1>;
	pipe<T1, T2>(fn0: (v: T) => T1, fn1: (v: T1) => T2): IPipeable<T2>;
	pipe<T1, T2, T3>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3): IPipeable<T3>;
	pipe<T1, T2, T3, T4>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4): IPipeable<T4>;
	pipe<T1, T2, T3, T4, T5>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4, fn4: (v: T4) => T5): IPipeable<T5>;
	pipe<T1, T2, T3, T4, T5, T6>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4, fn4: (v: T4) => T5, fn5: (v: T5) => T6): IPipeable<T6>;
	pipe<T1, T2, T3, T4, T5, T6, T7>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4, fn4: (v: T4) => T5, fn5: (v: T5) => T6, fn: (v: T6) => T7): IPipeable<T7>;
	pipe<T1, T2, T3, T4, T5, T6, T7, T8>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4, fn4: (v: T4) => T5, fn5: (v: T5) => T6, fn6: (v: T6) => T7, fn: (v: T7) => T8): IPipeable<T8>;
	pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4, fn4: (v: T4) => T5, fn5: (v: T5) => T6, fn6: (v: T6) => T7, fn7: (v: T7) => T8, fn8: (v: T8) => T9): IPipeable<T9>;
	pipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(fn0: (v: T) => T1, fn1: (v: T1) => T2, fn2: (v: T2) => T3, fn3: (v: T3) => T4, fn4: (v: T4) => T5, fn5: (v: T5) => T6, fn6: (v: T6) => T7, fn7: (v: T7) => T8, fn8: (v: T8) => T9, fn9: (v: T9) => T10): IPipeable<T10>;
}
