import { describe, it } from 'mocha';

import { Assert } from './Assert';
import { Type } from './Type';
import { AbstractConstructor } from './Constructor';

describe(Type.name, () => {

	const assert = new Assert();

	class Example {}

	class ExampleIterable implements Iterable<undefined> {
		public *[Symbol.iterator](): Iterator<undefined> {
			yield;
		}
	}

	class ExampleAsyncIterable implements AsyncIterable<undefined> {
		public async *[Symbol.asyncIterator](): AsyncIterator<undefined> {
			await Promise.resolve();
			yield;
		}
	}

	describe(Type.isInstanceOf.name, () => {

		describe('given constructor and same instance', () => {

			const scenarios: ReadonlyArray<[ AbstractConstructor<any>, any ]> = [
				[Object, {}],
				[Array, []],
				[Function, () => {}],
				[Function, function() {}],
				[Example, new Example()],
			];

			scenarios.forEach(([constructor, instance]) => {

				describe(constructor.name, () => {

					it('returns true', () => {
						const actual = Type.isInstanceOf(constructor, instance);
						assert.true(actual);
					});
				});
			});
		});
	});

	describe(Type.isNull.name, () => {

		[
			['null', null, true],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isNull(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isUndefined.name, () => {

		[
			['null', null, false],
			['undefined', undefined, true],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isUndefined(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isBoolean.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, true],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isBoolean(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isNumber.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, true],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isNumber(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isBigInt.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), true],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isBigInt(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isString.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', true],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isString(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isFunction.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, true],
			['generator function', function*() {}, true],
			['async function', async function() {}, true],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isFunction(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isSymbol.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), true],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isSymbol(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isGeneratorFunction.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, true],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isGeneratorFunction(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isAsyncFunction.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, true],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isAsyncFunction(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isPromise.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
			['promise', new Promise(() => {}), true],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isPromise(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isProxy.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
			['proxy', new Proxy({}, {}), true],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isProxy(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isRegExp.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, true],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isRegExp(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isIterable.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], true],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
			['iterable', new ExampleIterable(), true],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isIterable(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isAsyncIterable.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
			['async iterable', new ExampleAsyncIterable(), true],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isAsyncIterable(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isArray.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], true],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isArray(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isArrayLike.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], true],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isArrayLike(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isObject.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, true],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), true],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isObject(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isClass.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, false],
			['bigint', BigInt(1), false],
			['boolean', true, false],
			['string', 'text', false],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), false],
			['class', new Example(), true],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isClass(value);
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Type.isPrimitive.name, () => {

		[
			['null', null, false],
			['undefined', undefined, false],
			['number', 1, true],
			['bigint', BigInt(1), true],
			['boolean', true, true],
			['string', 'text', true],
			['regex', /./, false],
			['object', {}, false],
			['array', [], false],
			['function', () => {}, false],
			['generator function', function*() {}, false],
			['async function', async function() {}, false],
			['symbol', Symbol(), true],
			['class', new Example(), false],
		].forEach(([name, value, expected]) => {

			describe(`given ${name}`, () => {

				it(`returns ${expected}`, () => {
					const actual = Type.isPrimitive(value);
					assert.equal(actual, expected);
				});
			});
		});
	});
});
