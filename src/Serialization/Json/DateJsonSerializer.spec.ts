import { describe, it } from 'mocha';
import { Assert } from '../../Assert';
import { UnexpectedJsonError } from './UnexpectedJsonError';

import { DateJsonSerializer } from './DateJsonSerializer';

describe(DateJsonSerializer.name, () => {

	const assert = new Assert();
	const exampleDate = '2020-03-09T14:25:41.947Z';

	function createSUT(): DateJsonSerializer {

		return new DateJsonSerializer();
	}

	describe('constructor', () => {

		it('is defined', () => {

			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(DateJsonSerializer.prototype.serialize.name, () => {

		describe('given example date string', () => {

			it('returns example date', () => {

				const sut = createSUT();
				const object = new Date(exampleDate);
				const actual = sut.serialize(object);
				const expected = exampleDate;
				assert.equal(actual, expected);
			});
		});
	});

	describe(DateJsonSerializer.prototype.deserialize.name, () => {

		describe('given not a string', () => {

			it(`throws ${UnexpectedJsonError.name}`, () => {

				const sut = createSUT();
				const json = {};
				assert.throws(() => sut.deserialize(json), UnexpectedJsonError);
			});
		});

		describe('given example date string', () => {

			it('returns example date', () => {

				const sut = createSUT();
				const json = exampleDate;
				const actual = sut.deserialize(json);
				const expected = new Date(exampleDate);
				assert.equal(actual, expected);
			});
		});
	});
});
