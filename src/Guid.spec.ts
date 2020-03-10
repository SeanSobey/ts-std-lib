import { describe, it } from 'mocha';
import { random as randomFaker } from 'faker';

import { Guid } from './Guid';
import { equals } from './Equality';
import { inspect } from './IInspectable';
import { Assert } from './Assert';

describe(Guid.name, () => {

	const assert = new Assert();
	const guid = randomFaker.uuid();

	describe('constructor', () => {

		describe('with no guid string', () => {

			it('is defined', () => {
				const sut = new Guid();
				assert.defined(sut);
			});
		});

		describe('with invalid guid string', () => {

			it('throws error', () => {
				assert.throws(() => new Guid('42'), Error, 'Invalid guid');
			});
		});

		describe('with valid guid string', () => {

			it('is defined', () => {
				const sut = new Guid(guid);
				assert.defined(sut);
			});
		});
	});

	describe(Guid.fromJSON.name, () => {

		it('deserializes', () => {

			const json = guid;
			const expected = new Guid(guid);
			const actual = Guid.fromJSON<Guid>(json);
			assert.equal(actual, expected);
		});
	});

	describe(Guid.prototype.toJSON.name, () => {

		it('serializes', () => {

			const sut = new Guid(guid);
			const actual = JSON.stringify(sut, undefined, 2);
			const expected = JSON.stringify({
				guid,
			}, undefined, 2);
			assert.equal(actual, expected);
		});
	});

	describe(Guid.prototype.valueOf.name, () => {

		it('returns guid as string', () => {

			const sut = new Guid(guid);
			const actual = sut.valueOf();
			const expected = guid;
			assert.equal(actual, expected);
		});
	});

	describe(equals.toString(), () => {

		describe('with no guid string', () => {

			describe('with no guid string', () => {

				it('returns true for same guid', () => {
					const sut = new Guid();
					const actual = sut[equals](sut);
					assert.true(actual);
				});

				it('returns false for different guid', () => {
					const sut = new Guid();
					const actual = sut[equals](new Guid());
					assert.false(actual);
				});
			});
		});

		describe('with valid guid string', () => {

			it('returns true for same guid', () => {
				const sut = new Guid(guid);
				const actual = sut[equals](new Guid(guid));
				assert.true(actual);
			});

			it('returns false for different guid', () => {
				const sut = new Guid(guid);
				const actual = sut[equals](new Guid());
				assert.false(actual);
			});
		});
	});

	describe(inspect.toString(), () => {

		it('returns expected', () => {

			const sut = new Guid(guid);
			const actual = sut[inspect]();
			const expected = '<Guid> ' + guid;
			assert.equal(actual, expected);
		});
	});
});
