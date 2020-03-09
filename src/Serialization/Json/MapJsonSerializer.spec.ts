import { describe, it } from 'mocha';
import { Assert } from '../../Assert';
import { UnexpectedJsonError } from './UnexpectedJsonError';

import { MapJsonSerializer } from './MapJsonSerializer';

describe(MapJsonSerializer.name, () => {

	const assert = new Assert();
	const exampleMap: ReadonlyArray<[number, string]> = [
		[1, 'one'],
		[2, 'two'],
		[3, 'three']
	];

	function createSUT(): MapJsonSerializer<number, string> {

		return new MapJsonSerializer();
	}

	describe('constructor', () => {

		it('is defined', () => {

			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(MapJsonSerializer.prototype.serialize.name, () => {

		describe('given example map', () => {

			it('returns example array', () => {

				const sut = createSUT();
				const object = new Map(exampleMap);
				const actual = sut.serialize(object);
				const expected = exampleMap;
				assert.equal(actual, expected);
			});
		});
	});

	describe(MapJsonSerializer.prototype.deserialize.name, () => {

		describe('given not an array', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json = {};
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given example array', () => {

			it('returns example map', () => {

				const sut = createSUT();
				const json = exampleMap;
				const actual = sut.deserialize(json);
				const expected = new Map(exampleMap);
				assert.equal(actual, expected);
			});
		});
	});
});
