import { describe, it } from 'mocha';

import { Assert } from '../../Assert';
import { JsonConverter } from './JsonConverter';
import { JsonSerializable, jsonProperty } from './JsonSerializable';
import { IEquatable, equals } from '../../Equality';

describe(JsonConverter.name, () => {

	const assert = new Assert();
	const exampleValueString = 'example-value';
	const exampleValueJson = `{"value":"${exampleValueString}"}`;

	class ExampleJsonSerializable extends JsonSerializable implements IEquatable<ExampleJsonSerializable> {

		@jsonProperty('value')
		private readonly _value: string;

		public constructor(value: string) {
			super();
			this._value = value;
		}

		public [equals](other: ExampleJsonSerializable): boolean {
			return this._value === other._value;
		}
	}

	function createSUT<T extends JsonSerializable>(): JsonConverter<T> {

		return new JsonConverter();
	}

	describe('constructor', () => {

		it('is defined', () => {

			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(JsonConverter.prototype.parse.name, () => {

		describe('given example serializable and invalid json', () => {

			it('throws error', () => {

				const sut = createSUT();
				assert.throws(() => sut.parse(ExampleJsonSerializable, '{ "value" }'), SyntaxError);
			});
		});

		describe('given example serializable and valid json', () => {

			it('returns instance', () => {

				const sut = createSUT();
				const actual = sut.parse(ExampleJsonSerializable, exampleValueJson);
				const expected = new ExampleJsonSerializable(exampleValueString);
				assert.equal(actual, expected);
			});
		});
	});

	describe(JsonConverter.prototype.stringify.name, () => {

		describe('given example instance', () => {

			it('returns valid json', () => {

				const sut = createSUT();
				const actual = sut.stringify(new ExampleJsonSerializable(exampleValueString));
				const expected = exampleValueJson;
				assert.equal(actual, expected);
			});
		});
	});
});
