import { InspectOptions } from 'util';

export interface IInspector<T> {
	inspect(object: T, options?: InspectOptions): string;
}
