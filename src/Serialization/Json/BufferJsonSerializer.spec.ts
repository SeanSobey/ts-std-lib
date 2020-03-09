import { describe, it } from 'mocha';
import { Assert } from '../../Assert';
import { UnexpectedJsonError } from './UnexpectedJsonError';

import { BufferJsonSerializer } from './BufferJsonSerializer';

describe(BufferJsonSerializer.name, () => {

	const assert = new Assert();
	const exampleBufferString = 'abc';
	const exampleBuffer = {
		data: [
			97,
			98,
			99
		],
		type: 'Buffer'
	};

	function createSUT(): BufferJsonSerializer {

		return new BufferJsonSerializer();
	}

	describe('constructor', () => {

		it('is defined', () => {

			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(BufferJsonSerializer.prototype.serialize.name, () => {

		describe('given example buffer string', () => {

			it('returns example buffer', () => {

				const sut = createSUT();
				const object = Buffer.from(exampleBufferString);
				const actual = sut.serialize(object);
				const expected = exampleBuffer;
				assert.equal(actual, expected);
			});
		});
	});

	describe(BufferJsonSerializer.prototype.deserialize.name, () => {

		describe('given not an object', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json = 1;
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given an array', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json: ReadonlyArray<number> = [];
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given a JsonSerializable', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json = new Date();
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given a buffer json object', () => {

			describe('with type not string', () => {

				it(`throws ${UnexpectedJsonError.name}`, () => {

					const sut = createSUT();
					const json = Object.assign({}, exampleBuffer, { type: 42 });
					assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
				});
			});

			describe('with type not Buffer', () => {

				it(`throws ${UnexpectedJsonError.name}`, () => {

					const sut = createSUT();
					const json = Object.assign({}, exampleBuffer, { type: 'Butter' });
					assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
				});
			});

			describe('with data not array', () => {

				const sut = createSUT();
				const json = Object.assign({}, exampleBuffer, { data: 42 });
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		it('returns example buffer', () => {

			const sut = createSUT();
			const json = exampleBuffer;
			const actual = sut.deserialize(json);
			const expected = Buffer.from(exampleBufferString)
			assert.equal(actual, expected);
		});
	});
});
