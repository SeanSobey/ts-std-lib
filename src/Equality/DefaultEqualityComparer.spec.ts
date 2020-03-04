import { describe, it } from 'mocha';

import { DefaultEqualityComparer } from './DefaultEqualityComparer';
import { IEquatable, equals } from './IEquatable';
import { Assert } from '../Assert';

// SameValue -> ValueEqualityComparer
// Structural -> StructuralEqualityComparer
// Sequence -> IterableEqualityComparer
// Type -> TypeEqualityComparer

// undefined				SameValue
// null						SameValue

// Boolean					SameValue
// Number					SameValue
// String					SameValue
// Symbol					SameValue
// Function					SameValue
// Object					Structural
// Error

// Math
// Date						Custom
// RegExp					Custom
// Array					Sequence
// TypedArray				Sequence
// Map						Custom
// Set						Custom
// WeakMap					Custom
// WeakSet					Custom
// ArrayBuffer
// DataView
// JSON
// Promise					Custom?
// Generator
// GeneratorFunction
// AsyncFunction
// Reflect
// Proxy
// Intl

// arguments

// Buffer					Sequence

describe(DefaultEqualityComparer.name, () => {

	const assert = new Assert();

	function createSUT(): DefaultEqualityComparer {

		return new DefaultEqualityComparer();
	}

	describe('constructor', () => {

		it('is defined', () => {
			const sut = createSUT();
			assert.defined(sut);
		});
	});

	describe(DefaultEqualityComparer.prototype.equals.name, () => {

		const fn = (): undefined => undefined;
		const promise = Promise.resolve('foo');

		describe('given equatable', () => {

			class TestEquatable implements IEquatable<any> {

				public calls: Array<any> = [];

				public [equals](other: any): boolean {

					this.calls.push(other);
					return true;
				}
			}

			it('calls a equals with b', () => {
				const a = new TestEquatable();
				const b = new TestEquatable();
				const sut = createSUT();
				sut.equals(a, b);
				assert.equal(a.calls[0], b);
			});

			it('returns true', () => {
				const a = new TestEquatable();
				const b = new TestEquatable();
				const sut = createSUT();
				const actual = sut.equals(a, b);
				assert.true(actual);
			});
		});

		interface TestCaseData {
			readonly description: string;
			readonly a: unknown;
			readonly b: unknown;
			readonly expected: boolean;
		}

		([
			{
				description: 'given equal numbers',
				a: 1,
				b: 1,
				expected: true
			},
			{
				description: 'given not equal numbers',
				a: 1,
				b: 2,
				expected: false
			},
			{
				description: 'given not strings',
				a: 'abc',
				b: 'abc',
				expected: true
			},
			{
				description: 'given not equal strings',
				a: 'abc',
				b: 'xyz',
				expected: false
			},
			{
				description: 'given nulls',
				a: null,
				b: null,
				expected: true
			},
			{
				description: 'given undefineds',
				a: undefined,
				b: undefined,
				expected: true
			},
			{
				description: 'given empty string and undefined',
				a: '',
				b: undefined,
				expected: false
			},
			{
				description: 'given empty string and null',
				a: '',
				b: null,
				expected: false
			},
			{
				description: 'given null and empty string',
				a: null,
				b: '',
				expected: false
			},
			{
				description: 'given undefined and empty string',
				a: undefined,
				b: '',
				expected: false
			},
			{
				description: 'given equal booleans',
				a: true,
				b: true,
				expected: true
			},
			{
				description: 'given not equal booleans',
				a: true,
				b: false,
				expected: false
			},
			{
				description: 'given empty objects',
				a: {},
				b: {},
				expected: true
			},
			{
				description: 'given empty array and empty object',
				a: [],
				b: {},
				expected: false
			},
			{
				description: 'given empty object and empty array',
				a: {},
				b: [],
				expected: false
			},
			{
				description: 'given equal objects (same properties "order")',
				a: { a: 1, b: '2', },
				b: { a: 1, b: '2', },
				expected: true
			},
			{
				description: 'given equal objects (different properties "order")',
				a: { a: 1, b: '2', },
				b: { b: '2', a: 1, },
				expected: true
			},
			{
				description: 'given not equal objects (extra property)',
				a: { a: 1, b: '2', },
				b: { b: '2', a: 1, c: [], },
				expected: false
			},
			{
				description: 'given not equal objects (different properties)',
				a: { a: 1, b: '2', c: 3, },
				b: { b: '2', a: 1, d: 3, },
				expected: false
			},
			{
				description: 'given equal objects (same sub-properties)',
				a: { a: [{ b: 'c' }] },
				b: { a: [{ b: 'c' }] },
				expected: true
			},
			{
				description: 'given not equal objects (different sub-property value)',
				a: { a: [{ b: 'c' }] },
				b: { a: [{ b: 'd' }] },
				expected: false
			},
			{
				description: 'given not equal objects (different sub-property)',
				a: { a: [{ b: 'c' }] },
				b: { a: [{ c: 'c' }] },
				expected: false
			},
			{
				description: 'given object a with extra undefined properties',
				a: {},
				b: { a: undefined },
				expected: false
			},
			{
				description: 'given object b with extra undefined properties',
				a: { a: undefined },
				b: {},
				expected: false
			},
			{
				description: 'given objects undefined properties',
				a: { a: undefined },
				b: { a: undefined },
				expected: true
			},
			{
				description: 'given different objects undefined properties',
				a: { a: undefined },
				b: { b: undefined },
				expected: false
			},
			{
				description: 'given two empty arrays',
				a: [],
				b: [],
				expected: true
			},
			{
				description: 'given equal arrays',
				a: [1, 2, 3],
				b: [1, 2, 3],
				expected: true
			},
			{
				description: 'given not equal arrays (different item)',
				a: [1, 2, 3],
				b: [1, 2, 4],
				expected: false
			},
			{
				description: 'given not equal arrays (different length)',
				a: [1, 2, 3],
				b: [1, 2],
				expected: false
			},
			{
				description: 'given equal arrays of objects',
				a: [{ a: 'a' }, { b: 'b' }],
				b: [{ a: 'a' }, { b: 'b' }],
				expected: true
			},
			{
				description: 'given not equal arrays of objects',
				a: [{ a: 'a' }, { b: 'b' }],
				b: [{ a: 'a' }, { b: 'c' }],
				expected: false
			},
			{
				description: 'given equal date objects',
				a: new Date('2017-06-16T21:36:48.362Z'),
				b: new Date('2017-06-16T21:36:48.362Z'),
				expected: true
			},
			{
				description: 'given not equal date objects',
				a: new Date('2017-06-16T21:36:48.362Z'),
				b: new Date('2017-01-01T00:00:00.000Z'),
				expected: false
			},
			{
				description: 'given date and string',
				a: new Date('2017-06-16T21:36:48.362Z'),
				b: '2017-01-01T00:00:00.000Z',
				expected: false
			},
			{
				description: 'given invalid dates',
				a: new Date('foo'),
				b: new Date('bar'),
				expected: true
			},
			{
				description: 'given equal RegExp objects',
				a: /foo/,
				b: /foo/,
				expected: true
			},
			{
				description: 'given not equal RegExp objects (different pattern)',
				a: /foo/,
				b: /bar/,
				expected: false
			},
			{
				description: 'given not equal RegExp objects (different flags)',
				a: /foo/g,
				b: /foo/i,
				expected: false
			},
			{
				description: 'given equal RegExp objects (different flags "order")',
				a: new RegExp('foo', 'gi'),
				b: new RegExp('foo', 'ig'),
				expected: true
			},
			{
				description: 'given RegExp and string are not equal',
				a: /foo/,
				b: 'foo',
				expected: false
			},
			{
				description: 'given equal Map objects',
				a: new Map([['foo', 'bar']]),
				b: new Map([['foo', 'bar']]),
				expected: true
			},
			{
				description: 'given not equal Map objects (different value)',
				a: new Map([['foo', 'bar']]),
				b: new Map([['foo', 'baz']]),
				expected: false
			},
			{
				description: 'given not equal Map objects (different key)',
				a: new Map([['foo', 'bar']]),
				b: new Map([['baz', 'bar']]),
				expected: false
			},
			{
				description: 'given not equal Map objects (same keys / values, different pairings)',
				a: new Map([['foo', 'bar']]),
				b: new Map([['bar', 'foo']]),
				expected: false
			},
			{
				description: 'given equal nested Map objects',
				a: new Map([['foo', new Map([['foo', 'bar']])]]),
				b: new Map([['foo', new Map([['foo', 'bar']])]]),
				expected: true
			},
			{
				description: 'given Map and Set are not equal',
				a: new Map([['foo', 'bar']]),
				b: new Set(['bar']),
				expected: false
			},
			{
				description: 'given equal Set objects',
				a: new Set(['foo']),
				b: new Set(['foo']),
				expected: true
			},
			{
				description: 'given not equal Set objects (different value)',
				a: new Set(['foo']),
				b: new Set(['bar']),
				expected: false
			},
			{
				description: 'given equal Set objects with nested objects',
				a: new Set([{ foo: 'bar' }]),
				b: new Set([{ foo: 'bar' }]),
				expected: true
			},
			{
				description: 'given Set and array',
				a: new Set(['foo']),
				b: ['foo'],
				expected: false
			},
			{
				description: 'given same promises',
				a: promise,
				b: promise,
				expected: true
			},
			{
				description: 'given different promises',
				a: promise,
				b: Promise.resolve('foo'),
				expected: false
			},
			{
				description: 'given equal complex objects',
				a: {
					prop1: 'value1',
					prop2: fn,
					prop3: null,
					prop4: {
						subProp1: 'sub value1',
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [
								1,
								2,
								{
									prop: 2,
									prop2: 1,
								},
								4,
								5,
							],
						},
					},
					prop5: 1000,
					prop6: new Date(2016, 2, 10),
					prop7: /foo/,
				},
				b: {
					prop1: 'value1',
					prop2: fn,
					prop3: null,
					prop4: {
						subProp1: 'sub value1',
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [
								1,
								2,
								{
									prop: 2,
									prop2: 1,
								},
								4,
								5,
							],
						},
					},
					prop5: 1000,
					prop6: new Date(2016, 2, 10),
					prop7: /foo/,
				},
				expected: true
			},
			{
				description: 'given not equal complex objects',
				a: {
					prop1: 'value1',
					prop2: fn,
					prop3: null,
					prop4: {
						subProp1: 'sub value1',
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [
								1,
								2,
								{
									prop: 2,
									prop2: 1,
								},
								4,
								5,
							],
						},
					},
					prop5: 1000,
					prop6: new Date(2016, 2, 10),
					prop7: /foo/,
				},
				b: {
					prop1: 'value1',
					prop2: fn,
					prop3: null,
					prop4: {
						subProp1: 'sub value1',
						subProp2: {
							subSubProp1: 'sub sub value1',
							subSubProp2: [
								1,
								2,
								{
									prop: 2,
									prop2: 1,
								},
								4,
								6,
							],
						},
					},
					prop5: 1000,
					prop6: new Date(2016, 2, 10),
					prop7: /foo/,
				},
				expected: false
			},
		] as ReadonlyArray<TestCaseData>).forEach((testCaseData) => {

			describe(testCaseData.description, () => {

				it('returns ' + testCaseData.expected, () => {
					const sut = createSUT();
					const actual = sut.equals(testCaseData.a, testCaseData.b);
					assert.equal(actual, testCaseData.expected);
				});
			});
		});
	});
});
