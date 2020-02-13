import { InspectOptions } from 'util';

//inspectUtil.custom

// https://nodejs.org/api/util.html#util_util_inspect_custom
export const inspect = Symbol.for('nodejs.util.inspect.custom');

/**
 * Implement a custom inspect method
 */
export interface IInspectable {
	[inspect](options?: InspectOptions): string | object;
}
