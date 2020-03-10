/**
 * A partial interface but n levels deep
 */
export type RecursivePartial<T> = {
	[P in keyof T]?:
	// eslint-disable-next-line functional/prefer-readonly-type
	T[P] extends Array<infer U> ? Array<RecursivePartial<U>> :
		T[P] extends object
			? RecursivePartial<T[P]>
			: T[P];
};
