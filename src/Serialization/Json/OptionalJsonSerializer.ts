import { Optional } from '../../Optional';
import { IEqualityComparer } from '../../Equality';
import { IInspector } from '../../IInspector';
import { IJsonSerializer, jsonSerializer } from './IJsonSerializer';
import { Json } from './Json';
import { isJsonSerializer } from './IsJsonSerializer';
import { DefaultSerializer, JsonSerializableConstructor } from './JsonSerializable';
import { Type } from '../../Type';

export class OptionalJsonSerializer<T> implements IJsonSerializer<Optional<T>> {

	public readonly [jsonSerializer] = true;
	private readonly _serializer: IJsonSerializer<T>;
	private readonly _equalityComparer: Optional<IEqualityComparer<T>>;
	private readonly _inspector: Optional<IInspector<T>>;

	public constructor(typeSerializer?: IJsonSerializer<T> | JsonSerializableConstructor, equalityComparer?: IEqualityComparer<T>, inspector?: IInspector<T>) {

		this._serializer = isJsonSerializer(typeSerializer)
			? typeSerializer
			: new DefaultSerializer(typeSerializer);  // TODO: Require a mandatory serializer for non-primatives?
		this._equalityComparer = new Optional(equalityComparer);
		this._inspector = new Optional(inspector);
	}

	public serialize(object: Optional<T>): Json {

		if (!object.isPresent()) {
			return null;
		}
		const value = object.get();
		return this._serializer.serialize(value);
	}

	public deserialize(json: Json): Optional<T> {

		if (Type.isNull(json) || Type.isUndefined(json)) {
			return new Optional<T>(null, this._equalityComparer.orUndefined(), this._inspector.orUndefined());
		}
		const value = this._serializer.deserialize(json);
		return new Optional<T>(value, this._equalityComparer.orUndefined(), this._inspector.orUndefined());
	}
}
