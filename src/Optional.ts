import { InspectOptions } from 'util';

import { IEquatable, equals } from './Equality';
import { IFilterable } from './IFilterable';
import { IMappable } from './IMappable';
import { IChainable } from './IChainable';
import { Nullable } from './Nullable';
import { Undefinable } from './Undefinable';
import { IEqualityComparer, DefaultEqualityComparer } from './Equality';
import { IInspectable, inspect } from './IInspectable';
import { IInspector } from './IInspector';
import { DefaultInspector } from './DefaultInspector';
import { Type } from './Type';

export class OptionalValueNotSetError extends Error {

	public constructor() {

		super('Value is null');
	}
}

/**
 * An object to wrap a nullable in an interface to avoid null exeptions.
 *
 * @see https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html
 * @see http://www.baeldung.com/java-optional
 */
export class Optional<T> implements IEquatable<Optional<T>>, IFilterable<T>, IMappable<T>, IChainable<T>, IInspectable {

	private readonly _value: Nullable<T>;
	private readonly _equalityComparer: Nullable<IEqualityComparer<T>>;
	private readonly _inspector: Nullable<IInspector<T>>;

	// tslint:disable:unified-signatures

	/**
	 * Creates an empty instance of Optional. No value is present for this Optional.
	 * @param equalityComparer An optional equality comparer for the value.
	 * @param inspector An optional inspector for the value.
	 */
	public constructor(value?: undefined, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>);
	/**
	 * Creates an instance of Optional describing the specified value, if defined, otherwise returns an empty Optional.
	 * @param value A possibly null value.
	 * @param equalityComparer An optional equality comparer for the value.
	 * @param inspector An optional inspector for the value.
	 */
	public constructor(value: Undefinable<T>, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>);
	/**
	 * Creates an instance of Optional with the specified present non-null and defined value.
	 * @param value A non-nullable value.
	 * @param equalityComparer An optional equality comparer for the value.
	 * @param inspector An optional inspector for the value.
	 */
	public constructor(value: T, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>);
	/**
	 * Creates an instance of Optional describing the specified value, if non-null, otherwise returns an empty Optional.
	 * @param value A possibly null value.
	 * @param equalityComparer An optional equality comparer for the value.
	 * @param inspector An optional inspector for the value.
	 */
	public constructor(value: Nullable<T>, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>);
	public constructor(value: Undefinable<Nullable<T>>, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>);
	public constructor(value?: Nullable<T>, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>) {

		this._value = value === undefined ? null : value;
		this._equalityComparer = equalityComparer || null;
		this._inspector = inspector || null;
	}

	// tslint:enable:unified-signatures

	public [equals](other: Optional<T>): boolean {

		if (!this.isValuePresent(this._value)) {
			return !other.isPresent();
		}
		if (!other.isPresent()) {
			return false;
		}
		const valueEqualityComparer = this._equalityComparer || other._equalityComparer || new DefaultEqualityComparer();
		return valueEqualityComparer.equals(this._value, other.get());
	}

	public [inspect](options?: InspectOptions): string {

		if (!this.isValuePresent(this._value)) {
			return `<${Optional.name}> [empty]`;
		}
		const inspector = this._inspector || new DefaultInspector();
		return `<${Optional.name}> ${inspector.inspect(this._value, options)}`;
	}

	/**
	 * Check if the value is null.
	 *
	 * @returns {boolean} True if there is a value present, otherwise false.
	 */
	public isPresent(): boolean {

		return this.isValuePresent(this._value);
	}

	/**
	 * If a value is present, invoke the specified callback with the value, otherwise do nothing.
	 *
	 * @param {(value: T) => void} callback The callback to invoke.
	 */
	public ifPresent(callback: (value: T) => void): void {

		if (this.isValuePresent(this._value)) {
			callback(this._value);
		}
	}

	/**
	 * If a value is present, performs the given callback with the value, otherwise performs the given empty-based callback.
	 *
	 * @param {(value: T) => void} callback The callback to be performed, if a value is present.
	 * @param {() => void} emptyCallback The callback to be performed, if no value is present.
	 */
	public ifPresentOrElse(callback: (value: T) => void, emptyCallback: () => void): void {

		if (this.isValuePresent(this._value)) {
			return callback(this._value);
		}
		return emptyCallback();
	}

	/**
	 * If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the supplying function.
	 *
	 * @param {() => IOptional<T>} supplier The supplying function that produces an Optional to be returned.
	 * @returns {IOptional<T>} An Optional describing the value of this Optional, if a value is present, otherwise an Optional produced by the supplying function.
	 */
	public or(supplier: () => Optional<T>): Optional<T> {

		if (this.isValuePresent(this._value)) {
			return this;
		}
		return supplier();
	}

	/**
	 * Return the value if not null or a default.
	 *
	 * @param {T} defaultValue The default value to return.
	 * @returns {T} The value if present, otherwise return the default.
	 * @description The methods orElse and orElseGet are generally preferable to this method, as they return a substitute value if the value is absent, instead of throwing an exception.
	 */
	public orElse(supplier: T): T {

		if (this.isValuePresent(this._value)) {
			return this._value;
		}
		return supplier;
	}

	/**
	 * Return the value if not null or a default via a callback, to allow for lazy loading.
	 *
	 * @param {() => T} callback The callback to invoke to get the default value to return.
	 * @returns {T} The value if present, otherwise return the default.
	 */
	public orElseGet(callback: () => T): T {

		if (this.isValuePresent(this._value)) {
			return this._value;
		}
		return callback();
	}

	/**
	 * Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.
	 *
	 * @param {() => Error} exceptionSupplier The callback to invoke to get the error to throw.
	 * @returns {T} The value if present.
	 */
	public orElseThrow(exceptionSupplier: () => Error): T {

		if (this.isValuePresent(this._value)) {
			return this._value;
		}
		throw exceptionSupplier();
	}

	/**
	 * Return the contained value, if present, otherwise return 'undefined'.
	 *
	 * @returns {Undefinable<T>}
	 */
	public orUndefined(): Undefinable<T> {

		if (this.isValuePresent(this._value)) {
			return this._value;
		}
		return undefined;
	}

	/**
	 * Return the contained value, if present, otherwise return 'null'.
	 *
	 * @returns {Undefinable<T>}
	 */
	public orNull(): Nullable<T> {

		if (this.isValuePresent(this._value)) {
			return this._value;
		}
		return null;
	}

	/**
	 * If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.
	 *
	 * @returns {T} The value if present.
	 */
	public get(): T {

		if (this.isValuePresent(this._value)) {
			return this._value;
		}
		throw new OptionalValueNotSetError();
	}

	public filter<S extends T>(predicate: (value: T) => value is S): Optional<S>;
	public filter(predicate: (value: T) => boolean): Optional<T>;
	public filter(predicate: (value: T) => value is T): Optional<T> {

		if (this.isValuePresent(this._value)) {
			if (predicate(this._value)) {
				return this;
			}
			return new Optional(undefined, this._equalityComparer || undefined);
		}
		return new Optional(undefined, this._equalityComparer || undefined);
	}

	public map<U>(callbackfn: (value: T) => U, equalityComparer?: IEqualityComparer<U>): Optional<U> {

		if (this.isValuePresent(this._value)) {
			const value = callbackfn(this._value);
			return new Optional(value, equalityComparer);
		}
		return new Optional(undefined, equalityComparer);
	}

	public chain<U>(callbackfn: (value: T) => Optional<U>, equalityComparer?: IEqualityComparer<U>): Optional<U>;
	// tslint:disable-next-line:unified-signatures
	public chain<U>(callbackfn: (value: T) => U, equalityComparer?: IEqualityComparer<U>): Optional<U>;
	public chain<U>(callbackfn: (value: T) => Optional<U> | U, equalityComparer?: IEqualityComparer<U>): Optional<U> {

		if (this.isValuePresent(this._value)) {
			const value = callbackfn(this._value);
			if (Type.isInstanceOf(Optional, value)) {
				return value;
			}
			return new Optional(value, equalityComparer);
		}
		return new Optional(undefined, equalityComparer);
	}

	private isValuePresent(value: Nullable<T>): value is T {

		return value !== null;
	}
}
