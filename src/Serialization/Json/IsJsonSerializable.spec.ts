import { describe, it } from 'mocha';

import { isJsonSerializable } from './IsJsonSerializable';
import { Assert } from '../../Assert';

describe(isJsonSerializable.name, () => {

	const assert = new Assert();

	describe('given null', () => {

		const object = null;

		it('should return false', () => {

			const actual = isJsonSerializable(object);
			assert.false(actual);
		});
	});

	describe('given not object', () => {

		const object = false;

		it('should return false', () => {

			const actual = isJsonSerializable(object);
			assert.false(actual);
		});
	});

	describe('given object without toJSON property', () => {

		const object = {};

		it('should return false', () => {

			const actual = isJsonSerializable(object);
			assert.false(actual);
		});
	});

	describe('given object with toJSON property as not a function', () => {

		const object = {
			toJSON: {},
		};

		it('should return false', () => {

			const actual = isJsonSerializable(object);
			assert.false(actual);
		});
	});

	describe('given object with toJSON property as a function', () => {

		const object = {
			toJSON: () => undefined,
		};

		it('should return true', () => {

			const actual = isJsonSerializable(object);
			assert.true(actual);
		});
	});
});
