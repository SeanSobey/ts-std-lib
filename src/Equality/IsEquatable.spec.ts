import { describe, it } from 'mocha';

import { equals } from './IEquatable';
import { isEquatable } from './IsEquatable';
import { Assert } from '../Assert';

const assert = new Assert();

describe(isEquatable.name, () => {

	describe('given null', () => {

		const object = null;

		it('should return false', () => {

			const actual = isEquatable(object);
			assert.false(actual);
		});
	});

	describe('given not object', () => {

		const object = false;

		it('should return false', () => {

			const actual = isEquatable(object);
			assert.false(actual);
		});
	});

	describe('given object without equals property', () => {

		const object = {};

		it('should return false', () => {

			const actual = isEquatable(object);
			assert.false(actual);
		});
	});

	describe('given object with equals property as not a function', () => {

		const object = {
			[equals]: {},
		};

		it('should return false', () => {

			const actual = isEquatable(object);
			assert.false(actual);
		});
	});

	describe('given object with equals property as a function', () => {

		const object = {
			[equals]: () => undefined,
		};

		it('should return true', () => {

			const actual = isEquatable(object);
			assert.true(actual);
		});
	});
});
