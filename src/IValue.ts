import { Primitive } from './Primitive';

export interface IValue<T extends Primitive | object> {
	valueOf(): T;
}
