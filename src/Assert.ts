import { strict as assert, AssertionError as AssertionErrorBase } from 'assert';

import { IEqualityComparer } from './Equality/IEqualityComparer';
import { DefaultEqualityComparer } from './Equality/DefaultEqualityComparer';
import { Constructor } from './Constructor';
import { IterableEqualityComparer } from './Equality/IterableEqualityComparer';
import { RecursivePartial } from './RecursivePartial';
import { Type } from './Type';
import { ValueEqualityComparer } from './Equality/ValueEqualityComparer';
import { IJsonSerializable, Json } from './Serialization/Json/Json';

type ErrorValidatorPredicate<T> = (value: T) => boolean;

type ErrorValidatorMap = { readonly [index: string]: any };

// tslint:disable:ban-types

// See npm assertion-error, note extending strict.AssertionError does not work for Mocha!

class AssertionError extends AssertionErrorBase implements IJsonSerializable {

	public readonly showDiff = true;

	public constructor(options?: {
		readonly message?: string;
		readonly actual?: any;
		readonly expected?: any;
		readonly operator?: string;
		readonly stackStartFn?: Function;
	}) {
		super(options);
		// For wallaby JS
		if (
			(process.env.TEST_DISABLE_ASSERT_DETAIL || '').toLowerCase() === 'true'
			&& this.generatedMessage
		) {
			// expect(this.actual).toEqual(this.expected); // Jasmine
			this.message = ''; // Mocha
		}
	}

	public toJSON(_key?: string | number): Json {

		throw new Error('not implemented');
	}
}

export class Assert {

	/**
	 * Tests if value is not undefined.
	 *
	 * @param value The value to test.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static defined<T>(value: T, messageOrError?: string | Error): void {

		const result = value !== undefined;
		if (!result) {
			throw new AssertionError({
				message: messageOrError instanceof Error ? messageOrError.message : messageOrError,
				actual: undefined,
				expected: value,
				operator: 'to be',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.defined,
			});
		}
	}

	/**
	 * Tests if value is undefined.
	 *
	 * @param value The value to test.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static undefined<T>(value: T, messageOrError?: string | Error): void {

		const result = value === undefined;
		if (!result) {
			throw new AssertionError({
				message: messageOrError instanceof Error ? messageOrError.message : messageOrError,
				actual: value,
				expected: undefined,
				operator: 'to be',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.undefined,
			});
		}
	}

	/**
	 * Tests if value is true.
	 *
	 * @param value The value to test.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static true(value: boolean, messageOrError?: string | Error): void {

		const result = value === true;
		if (!result) {
			throw new AssertionError({
				message: messageOrError instanceof Error ? messageOrError.message : messageOrError,
				actual: value,
				expected: true,
				operator: 'to be',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.true,
			});
		}
	}

	/**
	 * Tests if value is truthy.
	 *
	 * @param value The value to test.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static truthy<T>(value: T, messageOrError?: string | Error): void {

		const result = !!value;
		if (!result) {
			throw new AssertionError({
				message: messageOrError instanceof Error ? messageOrError.message : messageOrError,
				actual: value,
				expected: 'truthy',
				operator: 'to be',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.true,
			});
		}
	}

	/**
	 * Tests if value is false.
	 *
	 * @param value The value to test.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static false(value: boolean, messageOrError?: string | Error): void {

		const result = value === false;
		if (!result) {
			throw new AssertionError({
				message: messageOrError instanceof Error ? messageOrError.message : messageOrError,
				actual: value,
				expected: false,
				operator: 'to be',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.false,
			});
		}
	}

	/**
	 * Tests if value is falsy.
	 *
	 * @param value The value to test.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static falsy<T>(value: T, messageOrError?: string | Error): void {

		const result = !value;
		if (!result) {
			throw new AssertionError({
				message: messageOrError instanceof Error ? messageOrError.message : messageOrError,
				actual: value,
				expected: 'falsy',
				operator: 'to be',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.false,
			});
		}
	}

	/**
	 * Throws an AssertionError with the provided error message or a default error message.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 * @param operator
	 */
	public static fail<T>(actual: T, expected: T, messageOrError?: string | Error, operator?: string): void {

		// eslint-disable-next-line @typescript-eslint/unbound-method
		return assert.fail(actual, expected, messageOrError, operator, Assert.fail);
	}

	/**
	 * Tests equality between the actual and expected parameters.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 * @param equalityComparer The equality comparer to use.
	 */
	public static equal<T>(actual: T, expected: T, messageOrError?: string | Error, equalityComparer?: IEqualityComparer<T>): void;
	/**
	 * Tests equality between the actual and expected parameters.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param equalityComparer The equality comparer to use.
	 */
	public static equal<T>(actual: T, expected: T, equalityComparer?: IEqualityComparer<T>): void;
	public static equal<T>(actual: T, expected: T, errorOrMessageOrEqualityComparer?: string | Error | IEqualityComparer<T>, equalityComparer?: IEqualityComparer<T>): void {

		const message = Assert.getMessage(errorOrMessageOrEqualityComparer);
		const comparer = equalityComparer || Assert.getEqualityComparer(errorOrMessageOrEqualityComparer) || new DefaultEqualityComparer();
		const result = comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.equal,
			});
		}
	}

	/**
	 * Tests inequality between the actual and expected parameters.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 * @param equalityComparer The equality comparer to use.
	 */
	public static notEqual<T>(actual: T, expected: T, messageOrError?: string | Error, equalityComparer?: IEqualityComparer<T>): void;
	/**
	 * Tests inequality between the actual and expected parameters.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param equalityComparer The equality comparer to use.
	 */
	public static notEqual<T>(actual: T, expected: T, equalityComparer?: IEqualityComparer<T>): void;
	public static notEqual<T>(actual: T, expected: T, errorOrMessageOrEqualityComparer?: string | Error | IEqualityComparer<T>, equalityComparer?: IEqualityComparer<T>): void {

		const message = Assert.getMessage(errorOrMessageOrEqualityComparer);
		const comparer = equalityComparer || Assert.getEqualityComparer(errorOrMessageOrEqualityComparer) || new DefaultEqualityComparer();
		const result = !comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'not equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.notEqual,
			});
		}
	}

	/**
	 * Tests equality between the actual and expected parameters using value equality.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static valueEqual<T>(actual: T, expected: T, errorOrMessage?: string | Error): void {

		const message = Assert.getMessage(errorOrMessage);
		const comparer = new ValueEqualityComparer();
		const result = comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'value equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.notEqual,
			});
		}
	}

	/**
	 * Tests inequality between the actual and expected parameters using value equality.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static notValueEqual<T>(actual: T, expected: T, errorOrMessage?: string | Error): void {

		const message = Assert.getMessage(errorOrMessage);
		const comparer = new ValueEqualityComparer();
		const result = !comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'not value equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.notEqual,
			});
		}
	}

	/**
	 * Tests equality between the actual and expected parameters using structural equality.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static structuralEqual<T>(actual: T, expected: T, messageOrError?: string | Error): void {

		const comparer = new DefaultEqualityComparer(false);
		const result = comparer.equals(actual, expected);
		if (!result) {
			const message = Assert.getMessage(messageOrError);
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'structural equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.structuralEqual,
			});
		}
	}

	/**
	 * Tests inequality between the actual and expected parameters using structural equality.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static notStructuralEqual<T>(actual: T, expected: T, messageOrError?: string | Error): void {

		const comparer = new DefaultEqualityComparer(false);
		const result = !comparer.equals(actual, expected);
		if (!result) {
			const message = Assert.getMessage(messageOrError);
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'not structural equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.structuralEqual,
			});
		}
	}

	/**
	 * Tests partial equality between the actual and expected parameters using structural equality.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static partialStructuralEqual<T extends object>(actual: T, expected: RecursivePartial<T>, messageOrError?: string | Error): void {

		const message = Assert.getMessage(messageOrError);
		const comparer = new DefaultEqualityComparer(false, true);
		const result = comparer.equals(expected, actual);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'partial structural equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.partialStructuralEqual,
			});
		}
	}

	/**
	 * Tests partial inequality between the actual and expected parameters using structural equality.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static notPartialStructuralEqual<T>(actual: T, expected: RecursivePartial<T>, messageOrError?: string | Error): void {

		const message = Assert.getMessage(messageOrError);
		const comparer = new DefaultEqualityComparer(false, true);
		const result = !comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'partial structural equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.partialStructuralEqual,
			});
		}
	}

	/**
	 * Tests sequential equality between the actual and expected iterables.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 * @param equalityComparer Optional equality comparer to use to compare items in the iterables.
	 */
	public static sequenceEqual<T>(actual: Iterable<T>, expected: Iterable<T>, messageOrError?: string | Error, equalityComparer?: IEqualityComparer<T>): void;
	/**
	 * Tests sequential equality between the actual and expected iterables.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param equalityComparer Optional equality comparer to use to compare items in the iterables.
	 */
	public static sequenceEqual<T>(actual: Iterable<T>, expected: Iterable<T>, equalityComparer?: IEqualityComparer<T>): void;
	public static sequenceEqual<T>(actual: Iterable<T>, expected: Iterable<T>, errorOrMessageOrEqualityComparer?: string | Error | IEqualityComparer<T>, equalityComparer?: IEqualityComparer<T>): void {

		const message = Assert.getMessage(errorOrMessageOrEqualityComparer);
		const itemComparer = equalityComparer || Assert.getEqualityComparer(errorOrMessageOrEqualityComparer) || new DefaultEqualityComparer();
		const comparer = new IterableEqualityComparer(itemComparer);
		const result = comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'sequence equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.notEqual,
			});
		}
	}

	/**
	 * Tests sequential inequality between the actual and expected iterables.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 * @param equalityComparer Optional equality comparer to use to compare items in the iterables.
	 */
	public static notSequenceEqual<T>(actual: Iterable<T>, expected: Iterable<T>, message?: string | Error, equalityComparer?: IEqualityComparer<T>): void;
	/**
	 * Tests sequential equality between the actual and expected iterables.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 * @param equalityComparer Optional equality comparer to use to compare items in the iterables.
	 */
	public static notSequenceEqual<T>(actual: Iterable<T>, expected: Iterable<T>, equalityComparer?: IEqualityComparer<T>): void;
	public static notSequenceEqual<T>(actual: Iterable<T>, expected: Iterable<T>, errorOrMessageOrEqualityComparer?: string | Error | IEqualityComparer<T>, equalityComparer?: IEqualityComparer<T>): void {

		const message = Assert.getMessage(errorOrMessageOrEqualityComparer);
		const itemComparer = equalityComparer || Assert.getEqualityComparer(errorOrMessageOrEqualityComparer) || new DefaultEqualityComparer();
		const comparer = new IterableEqualityComparer(itemComparer);
		const result = !comparer.equals(actual, expected);
		if (!result) {
			throw new AssertionError({
				message,
				actual,
				expected,
				operator: 'not sequence equal to',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.notEqual,
			});
		}
	}

	/**
	 * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is rejected.
	 *
	 * @param asyncFn If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.rejects() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped.
	 * @param error Validate error message using RegExp, custom error validation using predicate, instanceof using constructor or the Error message string.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static rejects<T>(asyncFn: (() => Promise<T>) | Promise<T>, error?: Error | RegExp | ErrorValidatorPredicate<T> | Constructor<Error> | string, messageOrError?: string | Error): Promise<void> {

		if (typeof error === 'string') {
			return assert.rejects(asyncFn, { message: error }, messageOrError);
		}
		return assert.rejects(asyncFn, error || Error, messageOrError);
	}

	/**
	 * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is not rejected.
	 *
	 * @param asyncFn If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.doesNotReject() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped.
	 * @param error Validate error message using RegExp, custom error validation using predicate, instanceof using constructor or the Error message string.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static doesNotReject<T>(asyncFn: (() => Promise<T>) | Promise<T>, error?: RegExp | ErrorValidatorPredicate<T>, messageOrError?: string | Error): Promise<void> {

		const defaultErrorPredicate: ErrorValidatorPredicate<T> = (value) => value instanceof Error;
		return assert.doesNotReject(asyncFn, error || defaultErrorPredicate, messageOrError);
	}

	/**
	 * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is rejected.
	 *
	 * @param asyncFn If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.rejects() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped.
	 * @param error The error constructor to check for.
	 * @param errorMessage The error.msg to check for.
	 * @param message
	 */
	public static rejectsError<T>(asyncFn: (() => Promise<T>) | Promise<T>, error: Constructor<Error>, errorMessage: string, message?: string): Promise<void> {

		return Assert.rejects(asyncFn, (err) => err instanceof error && err.message === errorMessage, message);
	}

	/**
	 * Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is not rejected.
	 *
	 * @param asyncFn If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.doesNotReject() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped.
	 * @param error The error constructor to check for.
	 * @param errorMessage The error.msg to check for.
	 * @param message
	 */
	public static doesNotRejectError<T>(asyncFn: (() => Promise<T>) | Promise<T>, error: Constructor<Error>, errorMessage: string, message?: string): Promise<void> {

		return Assert.doesNotReject(asyncFn, (err) => err instanceof error && err.message === errorMessage, message);
	}

	/**
	 * Expects the function fn to throw an error.
	 *
	 * @param fn The function to evaluate.
	 * @param error Validate error message using RegExp, custom error validation using predicate, instanceof using constructor or the Error message string.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static throws<T>(fn: () => any, error?: RegExp | ErrorValidatorPredicate<T> | ErrorValidatorMap | Constructor<Error> | string, messageOrError?: string | Error): void {

		if (typeof error === 'string') {
			return assert.throws(fn, { message: error }, messageOrError);
		}
		return assert.throws(fn, error || Error, messageOrError);
	}

	/**
	 * Asserts that the function fn does not throw an error.
	 *
	 * @param fn The function to evaluate.
	 * @param error Validate error message using RegExp, custom error validation using predicate or instanceof using constructor.
	 * @param messageOrError Optional custom text or error to report in the case of failure.
	 */
	public static doesNotThrow<T>(fn: () => any, error?: RegExp | ErrorValidatorPredicate<T>, messageOrError?: string | Error): void {

		const defaultErrorPredicate: ErrorValidatorPredicate<T> = (value) => Type.isInstanceOf(Error, value);
		return assert.doesNotThrow(fn, error || defaultErrorPredicate, messageOrError);
	}

	/**
	 * Expects the function fn to throw an error type.
	 *
	 * @param fn The function to evaluate.
	 * @param error The Error type to check for.
	 * @param errorMessage The error.msg to check for.
	 * @param message Optional custom text to report in the case of failure.
	 */
	public static throwsError(fn: () => any, error: Constructor<Error>, errorMessage: string, message?: string): void {

		return Assert.throws(fn, (err) => Type.isInstanceOf<Error>(error, err) && err.message === errorMessage, message);
	}

	/**
	 * Expects the function fn to not throw an error type.
	 *
	 * @param fn The function to evaluate.
	 * @param error The Error type to check for.
	 * @param errorMessage The error.msg to check for.
	 * @param message Optional custom text to report in the case of failure.
	 */
	public static doesNotThrowError(fn: () => any, error: Constructor<Error>, errorMessage: string, message?: string): void {

		return Assert.doesNotThrow(fn, (err) => Type.isInstanceOf<Error>(error, err) && err.message === errorMessage, message);
	}

	/**
	 * Expect the actual value to be an instance of the expected object.
	 *
	 * @param actual The actual value to evaluate.
	 * @param expected The expected value.
	 */
	public static instanceOf<T>(actual: T, expected: Constructor<T>): void {

		const result = Type.isInstanceOf(expected, actual);
		if (!result) {
			throw new AssertionError({
				actual,
				expected,
				operator: 'instance of',
				// eslint-disable-next-line @typescript-eslint/unbound-method
				stackStartFn: Assert.instanceOf,
			});
		}
	}

	private static getMessage<T>(errorOrMessageOrEqualityComparer?: string | Error | IEqualityComparer<T>): string | undefined {

		if (Type.isUndefined(errorOrMessageOrEqualityComparer)) {
			return undefined;
		}
		if (Type.isInstanceOf(Error, errorOrMessageOrEqualityComparer)) {
			return errorOrMessageOrEqualityComparer.message;
		}
		if (Type.isString(errorOrMessageOrEqualityComparer)) {
			return errorOrMessageOrEqualityComparer;
		}
		return undefined;
	}

	private static getEqualityComparer<T>(errorOrMessageOrEqualityComparer?: string | Error | IEqualityComparer<T>): IEqualityComparer<T> | undefined {

		if (Type.isUndefined(errorOrMessageOrEqualityComparer)) {
			return undefined;
		}
		if (Type.isInstanceOf(Error, errorOrMessageOrEqualityComparer)) {
			return undefined;
		}
		if (Type.isString(errorOrMessageOrEqualityComparer)) {
			return undefined;
		}
		return errorOrMessageOrEqualityComparer;
	}
}
