import { inspect as inspectUtil, InspectOptions } from 'util';

import { IInspector } from './IInspector';

/**
 * An standard implementation for inspecting native objects during debugging
 */
export class DefaultInspector<T> implements IInspector<T> {

	/**
	 *
	 * @param object
	 * @param options
	 */
	public inspect(object: T, options: InspectOptions = inspectUtil.defaultOptions): string {

		return inspectUtil(object, options);
	}
}
