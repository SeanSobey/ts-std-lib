import { describe, it } from 'mocha';
import { URL } from 'url';
import { Assert } from '../../Assert';

import { URLJsonSerializer } from './URLJsonSerializer';
import { UnexpectedJsonError } from './UnexpectedJsonError';

describe(URLJsonSerializer.name, () => {

	const assert = new Assert();
	const exampleURL = 'http://example.com';

	function createSUT(): URLJsonSerializer {

		return new URLJsonSerializer();
	}

	describe('constructor', () => {

		it('is defined', () => {

			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(URLJsonSerializer.prototype.serialize.name, () => {

		describe('given example url URL', () => {

			it('returns example url', () => {

				const sut = createSUT();
				const object = new URL(exampleURL);
				const actual = sut.serialize(object);
				const expected = new URL(exampleURL);
				assert.equal(actual, expected);
			});
		});
	});

	describe(URLJsonSerializer.prototype.deserialize.name, () => {

		describe('given not a string', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json = {};
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given example url string', () => {

			it('returns example url', () => {

				const sut = createSUT();
				const json = exampleURL;
				const actual = sut.deserialize(json);
				const expected = new URL(exampleURL);
				assert.equal(actual, expected);
			});
		});
	});
});
