// tslint:disable: ban-types

// https://stackoverflow.com/questions/36886082/abstract-constructor-type-in-typescript

/**
 * A non-instantiable class
 */
export type AbstractConstructor<T> = Function & { readonly prototype: T };

/**
 * an instantiable class
 */
export type Constructor<T> = (new (...args: ReadonlyArray<any>) => T);
