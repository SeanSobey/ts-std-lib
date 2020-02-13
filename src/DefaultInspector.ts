import { inspect as inspectUtil, InspectOptions } from 'util';

import { IInspector } from './IInspector';

export class DefaultInspector<T> implements IInspector<T> {

	public inspect(object: T, options: InspectOptions = inspectUtil.defaultOptions): string {

		return inspectUtil(object, options);
	}
}
