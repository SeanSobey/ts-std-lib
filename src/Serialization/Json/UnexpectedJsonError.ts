import { Json } from './Json';
import { DefaultInspector } from '../../DefaultInspector';

export class UnexpectedJsonError extends Error {

	public constructor(json: Json) {

		const defaultInspector = new DefaultInspector<Json>();
		super(`Unexpected json ${defaultInspector.inspect(json)}`);
	}
}
