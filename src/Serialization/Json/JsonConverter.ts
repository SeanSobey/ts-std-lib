import { EOL } from 'os';

import { JsonSerializable, JsonSerializableConstructor } from './JsonSerializable';
import { Reviver, Replacer } from './Json';
import { Type } from '../../Type';

export class JsonConverter<T extends JsonSerializable> {

	public constructor(
		private readonly _reviver?: Reviver<T>,
		private readonly _replacer?: Replacer<T>,
	) { }

	public parse(serializable: JsonSerializableConstructor, jsonString: string): T {

		try {
			const json = JSON.parse(jsonString, this._reviver);
			return serializable.fromJSON<T>(json);
		} catch (error) {
			if (Type.isInstanceOf(SyntaxError, error)) {
				throw new SyntaxError(`${error.message}${EOL}JSON: "${jsonString}"`);
			}
			throw error;
		}
	}

	public stringify(serializable: T): string {

		const json = serializable.toJSON();
		return JSON.stringify(json, this._replacer);
	}
}
