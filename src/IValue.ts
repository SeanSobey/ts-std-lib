import { Primitive } from './Primitive';

/**
 * An object that represents a value and that value can be obtained
 */
export interface IValue<T extends Primitive | object> {
	valueOf(): T;
}
