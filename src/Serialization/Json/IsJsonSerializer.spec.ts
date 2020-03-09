import { describe, it } from 'mocha';

import { jsonSerializer } from './IJsonSerializer';
import { isJsonSerializer } from './IsJsonSerializer';
import { Assert } from '../../Assert';

describe(isJsonSerializer.name, () => {

	const assert = new Assert();

	describe('given null', () => {

		const object = null;

		it('should return false', () => {

			const actual = isJsonSerializer(object);
			assert.false(actual);
		});
	});

	describe('given not object', () => {

		const object = false;

		it('should return false', () => {

			const actual = isJsonSerializer(object);
			assert.false(actual);
		});
	});

	describe('given object without serialize property', () => {

		const object = {};

		it('should return false', () => {

			const actual = isJsonSerializer(object);
			assert.false(actual);
		});
	});

	describe('given object without deserialize property', () => {

		const object = {
			serialize: () => undefined,
		};

		it('should return false', () => {

			const actual = isJsonSerializer(object);
			assert.false(actual);
		});
	});

	describe('given object with serialize property as not a function', () => {

		const object = {
			serialize: () => ({}),
		};

		it('should return false', () => {

			const actual = isJsonSerializer(object);
			assert.false(actual);
		});
	});

	describe('given object without jsonSerializer symbol', () => {

		const object = {
			serialize: () => ({}),
			deserialize: () => ({}),
		};

		it('should return false', () => {

			const actual = isJsonSerializer(object);
			assert.false(actual);
		});
	});

	describe('given object with serialize and deserialize properties as a function and jsonSerializer symbol', () => {

		const object = {
			[jsonSerializer]: true,
			serialize: () => ({}),
			deserialize: () => ({}),
		};

		it('should return true', () => {

			const actual = isJsonSerializer(object);
			assert.true(actual);
		});
	});
});
