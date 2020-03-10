import { InspectOptions } from 'util';

/**
 * For inspecting objects during debugging
 */
export interface IInspector<T> {
	inspect(object: T, options?: InspectOptions): string;
}
