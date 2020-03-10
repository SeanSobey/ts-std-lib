import { InspectOptions } from 'util';
import { v4 as uuidv4 } from 'uuid';

import { IValue } from './IValue';
import { IEquatable, equals } from './Equality';
import { IInspectable, inspect } from './IInspectable';
import { JsonSerializable, jsonProperty } from './Serialization/Json/JsonSerializable';

/**
 * A globally unique user identifer implementation
 * @see https://www.npmjs.com/package/uuid
 */
export class Guid extends JsonSerializable implements IValue<string>, IEquatable<Guid>, IInspectable {

	@jsonProperty('guid')
	private readonly _guid: string;

	public constructor(guid?: string) {

		super();
		if (guid && !this.isValid(guid)) {
			throw new Error('Invalid guid');
		}
		this._guid = guid || uuidv4();
	}

	public valueOf(): string {

		return this._guid;
	}

	public [equals](other: Guid): boolean {

		return this._guid === other._guid;
	}

	public [inspect](_options?: InspectOptions): string {

		return `<${Guid.name}> ${this._guid}`;
	}

	private isValid(guid: string): boolean {

		return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guid);
	}
}
