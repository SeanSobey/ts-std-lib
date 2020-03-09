import { describe, it } from 'mocha';
import { Assert } from '../../Assert';
import { UnexpectedJsonError } from './UnexpectedJsonError';

import { SetJsonSerializer } from './SetJsonSerializer';

describe(SetJsonSerializer.name, () => {

	const assert = new Assert();
	const exampleMap: ReadonlyArray<number> = [1, 2, 3, 4, 5];

	function createSUT(): SetJsonSerializer<number> {

		return new SetJsonSerializer();
	}

	describe('constructor', () => {

		it('is defined', () => {

			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(SetJsonSerializer.prototype.serialize.name, () => {

		describe('given example set', () => {

			it('returns example array', () => {

				const sut = createSUT();
				const object = new Set(exampleMap);
				const actual = sut.serialize(object);
				const expected = exampleMap;
				assert.equal(actual, expected);
			});
		});
	});

	describe(SetJsonSerializer.prototype.deserialize.name, () => {

		describe('given not an array', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json = {};
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given example array', () => {

			it('returns example set', () => {

				const sut = createSUT();
				const json = exampleMap;
				const actual = sut.deserialize(json);
				const expected = new Set(exampleMap);
				assert.equal(actual, expected);
			});
		});
	});
});
