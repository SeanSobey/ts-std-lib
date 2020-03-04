import { describe, it, beforeEach } from 'mocha';

import { Mock, MockBehavior, Times, It } from 'typemoq';
import { Optional, OptionalValueNotSetError } from './Optional';
import { IEquatable, equals, IEqualityComparer } from './Equality';
import { inspect } from './IInspectable';
import { Assert } from './Assert';
import { DefaultInspector } from './DefaultInspector';
import { IInspector } from './IInspector';

describe(Optional.name, () => {

	const assert = new Assert();

	class Custom implements IEquatable<Custom> {
		private readonly _value: number;
		public constructor(value?: number) {
			this._value = value || 0;
		}
		public [equals](other: Custom): boolean {
			return this._value === other._value;
		}
	}

	class CustomEqualityComparer implements IEqualityComparer<Custom> {
		public equals(a: Custom, b: Custom): boolean {
			return a[equals](b);
		}
	}

	describe('constructor', () => {

		describe('with no value,', () => {

			it('is defined', () => {
				const sut = new Optional<number>(undefined);
				assert.defined(sut);
			});
		});

		describe('with null value,', () => {

			it('is defined', () => {
				const sut = new Optional<number>(null);
				assert.defined(sut);
			});
		});

		describe('with primitive value,', () => {

			it('is defined', () => {
				const sut = new Optional<number>(1);
				assert.defined(sut);
			});
		});

		describe('with custom value,', () => {

			it('is defined', () => {
				const sut = new Optional<Custom>(new Custom());
				assert.defined(sut);
			});
		});
	});

	describe(equals.toString(), () => {

		describe('with other with no value,', () => {

			const other = new Optional<number>(undefined);

			describe('with no value,', () => {

				it('is true', () => {
					const sut = new Optional<number>(undefined);
					const actual = sut[equals](other);
					assert.true(actual);
				});
			});

			describe('with null value,', () => {

				it('is true', () => {
					const sut = new Optional<number>(null);
					const actual = sut[equals](other);
					assert.true(actual);
				});
			});

			describe('with primitive value,', () => {

				it('is false', () => {
					const sut = new Optional<number>(1);
					const actual = sut[equals](other);
					assert.false(actual);
				});
			});
		});

		describe('with other with null value,', () => {

			const other = new Optional<number>(null);

			describe('with no value,', () => {

				it('is true', () => {
					const sut = new Optional<number>(undefined);
					const actual = sut[equals](other);
					assert.true(actual);
				});
			});

			describe('with null value,', () => {

				it('is true', () => {
					const sut = new Optional<number>(null);
					const actual = sut[equals](other);
					assert.true(actual);
				});
			});

			describe('with primitive value,', () => {

				it('is false', () => {
					const sut = new Optional<number>(1);
					const actual = sut[equals](other);
					assert.false(actual);
				});
			});
		});

		describe('with other with primitive value,', () => {

			const other = new Optional<number>(1);

			describe('with no value,', () => {

				it('is false', () => {
					const sut = new Optional<number>(undefined);
					const actual = sut[equals](other);
					assert.false(actual);
				});
			});

			describe('with null value,', () => {

				it('is false', () => {
					const sut = new Optional<number>(null);
					const actual = sut[equals](other);
					assert.false(actual);
				});
			});

			describe('with primitive value,', () => {

				describe('with equal value,', () => {

					it('is true', () => {
						const sut = new Optional<number>(1);
						const actual = sut[equals](other);
						assert.true(actual);
					});
				});

				describe('with unequal value,', () => {

					it('is false', () => {
						const sut = new Optional<number>(2);
						const actual = sut[equals](other);
						assert.false(actual);
					});
				});
			});
		});

		describe('with other with custom value,', () => {

			const other = new Optional<Custom>(new Custom(1));

			describe('with no value,', () => {

				it('is false', () => {
					const sut = new Optional<Custom>(undefined);
					const actual = sut[equals](other);
					assert.false(actual);
				});
			});

			describe('with null value,', () => {

				it('is false', () => {
					const sut = new Optional<Custom>(null);
					const actual = sut[equals](other);
					assert.false(actual);
				});
			});

			describe('with custom value,', () => {

				describe('with equal value,', () => {

					it('is true', () => {
						const sut = new Optional<Custom>(new Custom(1), new CustomEqualityComparer());
						const actual = sut[equals](other);
						assert.true(actual);
					});
				});

				describe('with unequal value,', () => {

					it('is false', () => {
						const sut = new Optional<Custom>(new Custom(2), new CustomEqualityComparer());
						const actual = sut[equals](other);
						assert.false(actual);
					});
				});
			});
		});
	});

	describe(inspect.toString(), () => {

		describe('with no value,', () => {

			it('returns expected', () => {
				const sut = new Optional<number>();
				const actual = sut[inspect]();
				const expected = '<Optional> [empty]';
				assert.equal(actual, expected);
			});
		});

		describe('with null value,', () => {

			it('returns expected', () => {
				const sut = new Optional<number>(null);
				const actual = sut[inspect]();
				const expected = '<Optional> [empty]';
				assert.equal(actual, expected);
			});
		});

		describe('with primitive value,', () => {

			it('returns expected', () => {
				const sut = new Optional<number>(42);
				const actual = sut[inspect]();
				const expected = '<Optional> 42';
				assert.equal(actual, expected);
			});
		});

		describe('with custom value,', () => {

			describe('with no inspector', () => {

				const inspector = new DefaultInspector();

				it('returns expected', () => {
					const value = new Custom(1);
					const sut = new Optional<Custom>(value);
					const actual = sut[inspect]();
					const expected = '<Optional> ' + inspector.inspect(value);
					assert.equal(actual, expected);
				});
			});

			describe('with custom inspector', () => {

				const inspectorMock = Mock.ofType<IInspector<Custom>>();

				beforeEach(() => {
					inspectorMock.reset();
				});

				it('returns expected', () => {
					const inspectValue = 'some-value';
					inspectorMock.setup((mock) => mock.inspect(It.isAny(), It.isAny())).returns(() => inspectValue);
					const value = new Custom(1);
					const sut = new Optional<Custom>(value, undefined, inspectorMock.object);
					const actual = sut[inspect]();
					const expected = '<Optional> ' + inspectValue;
					assert.equal(actual, expected);
				});
			});
		});
	});

	describe(Optional.prototype.isPresent.name, () => {

		describe('with no value,', () => {

			it('is false', () => {
				const sut = new Optional<number>(undefined);
				const actual = sut.isPresent();
				assert.false(actual);
			});
		});

		describe('with null value,', () => {

			it('is false', () => {
				const sut = new Optional<number>(null);
				const actual = sut.isPresent();
				assert.false(actual);
			});
		});

		describe('with primitive value,', () => {

			it('is true', () => {
				const sut = new Optional<number>(1);
				const actual = sut.isPresent();
				assert.true(actual);
			});
		});

		describe('with custom value,', () => {

			it('is true', () => {
				const sut = new Optional<Custom>(new Custom());
				const actual = sut.isPresent();
				assert.true(actual);
			});
		});
	});

	describe(Optional.prototype.ifPresent.name, () => {

		const callbackNumberMock = Mock.ofType<(value: number) => void>(undefined, MockBehavior.Strict);
		const callbackCustomMock = Mock.ofType<(value: Custom) => void>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackNumberMock.reset();
			callbackCustomMock.reset();

			callbackNumberMock.setup((mock) => mock(It.isAny()));
			callbackCustomMock.setup((mock) => mock(It.isAny()));
		});

		describe('with no value,', () => {

			const value = undefined;

			it('does not invoke callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresent(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with null value,', () => {

			const value = null;

			it('does not invoke callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresent(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with primitive value,', () => {

			const value = 0;

			it('invokes callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresent(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.once());
			});
		});

		describe('with custom value,', () => {

			const value = new Custom();

			it('invokes callback', () => {
				const sut = new Optional(value);
				sut.ifPresent(callbackCustomMock.object);
				callbackCustomMock.verify((mock) => mock(It.isAnyObject(Custom)), Times.once());
			});
		});
	});

	describe(Optional.prototype.ifPresentOrElse.name, () => {

		const callbackNumberMock = Mock.ofType<(value: number) => void>(undefined, MockBehavior.Strict);
		const callbackCustomMock = Mock.ofType<(value: Custom) => void>(undefined, MockBehavior.Strict);
		const callbackEmptyMock = Mock.ofType<() => void>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackNumberMock.reset();
			callbackCustomMock.reset();
			callbackEmptyMock.reset();

			callbackNumberMock.setup((mock) => mock(It.isAny()));
			callbackCustomMock.setup((mock) => mock(It.isAny()));
			callbackEmptyMock.setup((mock) => mock());
		});

		describe('with no value,', () => {

			const value = undefined;

			it('does not invoke value callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresentOrElse(callbackNumberMock.object, callbackEmptyMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});

			it('does invoke empty callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresentOrElse(callbackNumberMock.object, callbackEmptyMock.object);
				callbackEmptyMock.verify((mock) => mock(), Times.once());
			});
		});

		describe('with null value,', () => {

			const value = null;

			it('does not invoke value callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresentOrElse(callbackNumberMock.object, callbackEmptyMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});

			it('does invoke empty callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresentOrElse(callbackNumberMock.object, callbackEmptyMock.object);
				callbackEmptyMock.verify((mock) => mock(), Times.once());
			});
		});

		describe('with primitive value,', () => {

			const value = 0;

			it('does invoke value callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresentOrElse(callbackNumberMock.object, callbackEmptyMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.once());
			});

			it('does not invoke empty callback', () => {
				const sut = new Optional<number>(value);
				sut.ifPresentOrElse(callbackNumberMock.object, callbackEmptyMock.object);
				callbackEmptyMock.verify((mock) => mock(), Times.never());
			});
		});

		describe('with custom value,', () => {

			const value = new Custom();

			it('does invoke value callback', () => {
				const sut = new Optional(value);
				sut.ifPresentOrElse(callbackCustomMock.object, callbackEmptyMock.object);
				callbackCustomMock.verify((mock) => mock(It.isAnyObject(Custom)), Times.once());
			});

			it('does not invoke empty callback', () => {
				const sut = new Optional(value);
				sut.ifPresentOrElse(callbackCustomMock.object, callbackEmptyMock.object);
				callbackEmptyMock.verify((mock) => mock(), Times.never());
			});
		});
	});

	describe(Optional.prototype.or.name, () => {

		const supplierNumberMock = Mock.ofType<() => Optional<number>>(undefined, MockBehavior.Strict);
		const supplierCustomMock = Mock.ofType<() => Optional<Custom>>(undefined, MockBehavior.Strict);
		const numberOptional = new Optional<number>(2);
		const customOptional = new Optional<Custom>(new Custom(3));

		beforeEach(() => {
			supplierNumberMock.reset();
			supplierCustomMock.reset();

			supplierNumberMock.setup((mock) => mock()).returns(() => numberOptional);
			supplierCustomMock.setup((mock) => mock()).returns(() => customOptional);
		});

		describe('with no value,', () => {

			const value = undefined;

			it('invokes supplier callback', () => {
				const sut = new Optional<number>(value);
				sut.or(supplierNumberMock.object);
				supplierNumberMock.verify((mock) => mock(), Times.once());
			});

			it('returns supplier Optional value', () => {
				const sut = new Optional<number>(value);
				const actual = sut.or(supplierNumberMock.object);
				const expected = numberOptional;
				assert.equal(actual, expected);
			});
		});

		describe('with null value,', () => {

			const value = null;

			it('invokes supplier callback', () => {
				const sut = new Optional<number>(value);
				sut.or(supplierNumberMock.object);
				supplierNumberMock.verify((mock) => mock(), Times.once());
			});

			it('returns supplier Optional value', () => {
				const sut = new Optional<number>(value);
				const actual = sut.or(supplierNumberMock.object);
				const expected = numberOptional;
				assert.equal(actual, expected);
			});
		});

		describe('with primitive value,', () => {

			const value = 0;

			it('does not invoke supplier callback', () => {
				const sut = new Optional<number>(value);
				sut.or(supplierNumberMock.object);
				supplierNumberMock.verify((mock) => mock(), Times.never());
			});

			it('returns Optional value', () => {
				const sut = new Optional<number>(value);
				const actual = sut.or(supplierNumberMock.object);
				const expected = sut;
				assert.equal(actual, expected);
			});
		});

		describe('with value,', () => {

			const value = new Custom(2);

			it('does not invoke supplier callback', () => {
				const sut = new Optional<Custom>(value);
				sut.or(supplierCustomMock.object);
				supplierCustomMock.verify((mock) => mock(), Times.never());
			});

			it('returns Optional value', () => {
				const sut = new Optional<Custom>(value);
				const actual = sut.or(supplierCustomMock.object);
				const expected = sut;
				assert.equal(actual, expected);
			});
		});
	});

	describe(Optional.prototype.orElse.name, () => {

		describe('with no value,', () => {

			const defaultValue = 2;

			it('is default value', () => {
				const sut = new Optional<number>(undefined);
				const actual = sut.orElse(defaultValue);
				const expected = defaultValue;
				assert.equal(actual, expected);
			});
		});

		describe('with null value,', () => {

			const defaultValue = 2;

			it('is default value', () => {
				const sut = new Optional<number>(null);
				const actual = sut.orElse(defaultValue);
				const expected = defaultValue;
				assert.equal(actual, expected);
			});
		});

		describe('with primitive value,', () => {

			const defaultValue = 2;

			it('is value', () => {
				const value = 1;
				const sut = new Optional<number>(value);
				const actual = sut.orElse(defaultValue);
				const expected = value;
				assert.equal(actual, expected);
			});
		});

		describe('with value,', () => {

			const defaultValue = new Custom(2);

			it('is value', () => {
				const value = new Custom(1);
				const sut = new Optional<Custom>(new Custom(1));
				const actual = sut.orElse(defaultValue);
				const expected = value;
				assert.equal(actual, expected);
			});
		});
	});

	describe(Optional.prototype.orElseGet.name, () => {

		const callbackNumberMock = Mock.ofType<() => number>(undefined, MockBehavior.Strict);
		const callbackCustomMock = Mock.ofType<() => Custom>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackNumberMock.reset();
			callbackCustomMock.reset();

			callbackNumberMock.setup((mock) => mock());
			callbackCustomMock.setup((mock) => mock());
		});

		describe('with no value,', () => {

			it('does invoke callback', () => {
				const sut = new Optional<number>(undefined);
				sut.orElseGet(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(), Times.once());
			});
		});

		describe('with null value,', () => {

			it('does invoke callback', () => {
				const sut = new Optional<number>(null);
				sut.orElseGet(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(), Times.once());
			});
		});

		describe('with primitive value,', () => {

			it('does not invoke callback', () => {
				const sut = new Optional<number>(1);
				sut.orElseGet(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(), Times.never());
			});
		});

		describe('with value,', () => {

			it('does not invoke callback', () => {
				const sut = new Optional<Custom>(new Custom());
				sut.orElseGet(callbackCustomMock.object);
				callbackCustomMock.verify((mock) => mock(), Times.never());
			});
		});
	});

	describe(Optional.prototype.orElseThrow.name, () => {

		const customError = new Error();
		const callbackMock = Mock.ofType<() => Error>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackMock.reset();

			callbackMock.setup((mock) => mock());
		});

		describe('with no value,', () => {

			it('throws error', () => {
				const sut = new Optional<number>(undefined);
				const exceptionSupplier = () => customError;
				assert.throws(() => sut.orElseThrow(exceptionSupplier), customError);
			});

			it('does invoke callback', () => {
				const sut = new Optional<number>(undefined);
				assert.throws(() => sut.orElseThrow(callbackMock.object), () => true);
				callbackMock.verify((mock) => mock(), Times.once());
			});
		});

		describe('with null value,', () => {

			it('throws error', () => {
				const sut = new Optional<number>(null);
				const exceptionSupplier = () => customError;
				assert.throws(() => sut.orElseThrow(exceptionSupplier), customError);
			});

			it('does invoke callback', () => {
				const sut = new Optional<number>(null);
				assert.throws(() => sut.orElseThrow(callbackMock.object), () => true);
				callbackMock.verify((mock) => mock(), Times.once());
			});
		});

		describe('with primitive value,', () => {

			it('does not invoke callback', () => {
				const sut = new Optional<number>(1);
				sut.orElseThrow(callbackMock.object);
				callbackMock.verify((mock) => mock(), Times.never());
			});
		});

		describe('with value,', () => {

			it('does not invoke callback', () => {
				const sut = new Optional<Custom>(new Custom());
				sut.orElseThrow(callbackMock.object);
				callbackMock.verify((mock) => mock(), Times.never());
			});
		});
	});

	describe(Optional.prototype.orUndefined.name, () => {

		describe('with no value,', () => {

			it('returns undefined', () => {
				const sut = new Optional<number>(undefined);
				const actual = sut.orUndefined();
				const expected = undefined;
				assert.equal(actual, expected);
			});
		});

		describe('with null value,', () => {

			it('returns undefined', () => {
				const sut = new Optional<number>(null);
				const actual = sut.orUndefined();
				const expected = undefined;
				assert.equal(actual, expected);
			});
		});

		describe('with primitive value,', () => {

			it('returns value', () => {
				const sut = new Optional<number>(1);
				const actual = sut.orUndefined();
				const expected = 1;
				assert.equal(actual, expected);
			});
		});

		describe('with value,', () => {

			it('returns value', () => {
				const sut = new Optional<Custom>(new Custom());
				const actual = sut.orUndefined();
				const expected = new Custom();
				assert.equal(actual, expected);
			});
		});
	});

	describe(Optional.prototype.orNull.name, () => {

		describe('with no value,', () => {

			it('returns undefined', () => {
				const sut = new Optional<number>(undefined);
				const actual = sut.orNull();
				const expected = null;
				assert.equal(actual, expected);
			});
		});

		describe('with null value,', () => {

			it('returns undefined', () => {
				const sut = new Optional<number>(null);
				const actual = sut.orNull();
				const expected = null;
				assert.equal(actual, expected);
			});
		});

		describe('with primitive value,', () => {

			it('returns value', () => {
				const sut = new Optional<number>(1);
				const actual = sut.orUndefined();
				const expected = 1;
				assert.equal(actual, expected);
			});
		});

		describe('with value,', () => {

			it('returns value', () => {
				const sut = new Optional<Custom>(new Custom());
				const actual = sut.orUndefined();
				const expected = new Custom();
				assert.equal(actual, expected);
			});
		});
	});

	describe(Optional.prototype.get.name, () => {

		describe('with no value,', () => {

			it('throws error', () => {
				const sut = new Optional<number>(undefined);
				assert.throws(() => sut.get(), OptionalValueNotSetError);
			});
		});

		describe('with null value,', () => {

			it('throws error', () => {
				const sut = new Optional<number>(null);
				assert.throws(() => sut.get(), OptionalValueNotSetError);
			});
		});

		describe('with primitive value,', () => {

			it('returns value', () => {
				const value = 1;
				const sut = new Optional<number>(value);
				const actual = sut.get();
				const expected = value;
				assert.equal(actual, expected);
			});
		});

		describe('with value,', () => {

			it('returns value', () => {
				const value = new Custom();
				const sut = new Optional<Custom>(value);
				const actual = sut.get();
				const expected = value;
				assert.equal(actual, expected);
			});
		});
	});

	describe(Optional.prototype.filter.name, () => {

		const callbackNumberMock = Mock.ofType<(value: number) => boolean>(undefined, MockBehavior.Strict);
		const callbackCustomMock = Mock.ofType<(value: Custom) => boolean>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackNumberMock.reset();
			callbackCustomMock.reset();

			callbackNumberMock.setup((mock) => mock(It.isAny()));
			callbackCustomMock.setup((mock) => mock(It.isAny()));
		});

		describe('with no value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<number>(undefined);
				const fn = (_value: number) => true;
				const actual = sut.filter(fn)[equals](new Optional());
				assert.true(actual);
			});

			it('does not call spy', () => {
				const sut = new Optional<number>(undefined);
				sut.filter(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with null value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<number>(null);
				const fn = (_value: number) => true;
				const actual = sut.filter(fn)[equals](new Optional());
				assert.true(actual);
			});

			it('does not call spy', () => {
				const sut = new Optional<number>(null);
				sut.filter(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with primitive value,', () => {

			it('does call spy', () => {
				const sut = new Optional<number>(1);
				sut.filter(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.once());
			});

			describe('when predicate returns true,', () => {

				const fn = (_value: number) => true;

				it('returns optional with value', () => {
					const sut = new Optional<number>(1);
					const actual = sut.filter(fn)[equals](new Optional<number>(1));
					assert.true(actual);
				});
			});

			describe('when predicate returns false,', () => {

				const fn = (_value: number) => false;

				it('returns empty optional', () => {
					const sut = new Optional<number>(1);
					const actual = sut.filter(fn)[equals](new Optional<number>());
					assert.true(actual);
				});
			});
		});

		describe('with value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<Custom>(new Custom());
				const fn = (_value: Custom) => 'some-string';
				const actual = sut.map(fn)[equals](new Optional('some-string'));
				assert.true(actual);
			});

			it('does call spy', () => {
				const sut = new Optional<Custom>(new Custom());
				sut.filter(callbackCustomMock.object);
				callbackCustomMock.verify((mock) => mock(It.isAnyObject(Custom)), Times.once());
			});

			describe('when predicate returns true,', () => {

				const fn = (_value: Custom) => true;

				it('returns optional with value', () => {
					const sut = new Optional<Custom>(new Custom(1), new CustomEqualityComparer());
					const actual = sut.filter(fn)[equals](new Optional<Custom>(new Custom(1)));
					assert.true(actual);
				});
			});

			describe('when predicate returns false,', () => {

				const fn = (_value: Custom) => false;

				it('returns empty optional', () => {
					const sut = new Optional<Custom>(new Custom(1));
					const actual = sut.filter(fn)[equals](new Optional<Custom>());
					assert.true(actual);
				});
			});
		});
	});

	describe(Optional.prototype.map.name, () => {

		const callbackNumberMock = Mock.ofType<(value: number) => string>(undefined, MockBehavior.Strict);
		const callbackCustomMock = Mock.ofType<(value: Custom) => string>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackNumberMock.reset();
			callbackCustomMock.reset();

			callbackNumberMock.setup((mock) => mock(It.isAny()));
			callbackCustomMock.setup((mock) => mock(It.isAny()));
		});

		describe('with no value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<number>(undefined);
				const fn = (_value: number) => 'some-string';
				const actual = sut.map(fn)[equals](new Optional());
				assert.true(actual);
			});

			it('does not call spy', () => {
				const sut = new Optional<number>(undefined);
				sut.map(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with null value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<number>(null);
				const fn = (_value: number) => 'some-string';
				const actual = sut.map(fn)[equals](new Optional());
				assert.true(actual);
			});

			it('does not call spy', () => {
				const sut = new Optional<number>(null);
				sut.map(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with primitive value,', () => {

			it('returns optional with maped value', () => {
				const sut = new Optional<number>(1);
				const fn = (_value: number) => 'some-string';
				const actual = sut.map(fn)[equals](new Optional('some-string'));
				assert.true(actual);
			});

			it('does call spy', () => {
				const sut = new Optional<number>(1);
				sut.map(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.once());
			});
		});

		describe('with value,', () => {

			it('returns optional with maped value', () => {
				const sut = new Optional<Custom>(new Custom());
				const fn = (_value: Custom) => 'some-string';
				const actual = sut.map(fn)[equals](new Optional('some-string'));
				assert.true(actual);
			});

			it('does call spy', () => {
				const sut = new Optional<Custom>(new Custom());
				sut.map(callbackCustomMock.object);
				callbackCustomMock.verify((mock) => mock(It.isAnyObject(Custom)), Times.once());
			});
		});
	});

	describe(Optional.prototype.chain.name, () => {

		const callbackNumberMock = Mock.ofType<(value: number) => Optional<string>>(undefined, MockBehavior.Strict);
		const callbackCustomMock = Mock.ofType<(value: Custom) => Optional<string>>(undefined, MockBehavior.Strict);

		beforeEach(() => {
			callbackNumberMock.reset();
			callbackCustomMock.reset();

			callbackNumberMock.setup((mock) => mock(It.isAny()));
			callbackCustomMock.setup((mock) => mock(It.isAny()));
		});

		describe('with no value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<number>(undefined);
				const fn = (_value: number) => new Optional<string>('some-string');
				const actual = sut.chain(fn)[equals](new Optional<string>());
				assert.true(actual);
			});

			it('does not call spy', () => {
				const sut = new Optional<number>(undefined);
				sut.chain(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with null value,', () => {

			it('returns empty optional', () => {
				const sut = new Optional<number>(null);
				const fn = (_value: number) => new Optional<string>('some-string');
				const actual = sut.chain(fn)[equals](new Optional());
				assert.true(actual);
			});

			it('does not call spy', () => {
				const sut = new Optional<number>(null);
				sut.chain(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.never());
			});
		});

		describe('with primitive value,', () => {

			it('returns optional with chained value', () => {
				const sut = new Optional<number>(1);
				const fn = (_value: number) => new Optional<string>('some-string');
				const actual = sut.chain(fn)[equals](new Optional<string>('some-string'));
				assert.true(actual);
			});

			it('returns optional with value', () => {
				const sut = new Optional<number>(1);
				const fn = (_value: number) => 'some-string';
				const actual = sut.chain(fn)[equals](new Optional<string>('some-string'));
				assert.true(actual);
			});

			it('does call spy', () => {
				const sut = new Optional<number>(1);
				sut.chain(callbackNumberMock.object);
				callbackNumberMock.verify((mock) => mock(It.isAnyNumber()), Times.once());
			});
		});

		describe('with value,', () => {

			it('returns optional with chained value', () => {
				const sut = new Optional<Custom>(new Custom());
				const fn = (_value: Custom) => new Optional<string>('some-string');
				const actual = sut.chain(fn)[equals](new Optional<string>('some-string'));
				assert.true(actual);
			});

			it('returns optional with value', () => {
				const sut = new Optional<Custom>(new Custom());
				const fn = (_value: Custom) => 'some-string';
				const actual = sut.chain(fn)[equals](new Optional<string>('some-string'));
				assert.true(actual);
			});

			it('does call spy', () => {
				const sut = new Optional<Custom>(new Custom());
				sut.chain(callbackCustomMock.object);
				callbackCustomMock.verify((mock) => mock(It.isAnyObject(Custom)), Times.once());
			});
		});
	});
});
