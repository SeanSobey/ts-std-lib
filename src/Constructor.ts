// tslint:disable: ban-types

// https://stackoverflow.com/questions/36886082/abstract-constructor-type-in-typescript
export type AbstractConstructor<T> = Function & { readonly prototype: T };

export type Constructor<T> = (new (...args: ReadonlyArray<any>) => T);
