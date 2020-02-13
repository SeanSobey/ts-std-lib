import { describe, it } from 'mocha';

import { StructuralEqualityComparer } from './StructuralEqualityComparer';
import { ValueEqualityComparer } from './ValueEqualityComparer';
import { Assert } from '../Assert';

describe(StructuralEqualityComparer.name, () => {

	function createSUT(partial: boolean): StructuralEqualityComparer<object> {

		const equalityComparer = new ValueEqualityComparer();
		return new StructuralEqualityComparer(equalityComparer, partial);
	}

	describe('constructor', () => {

		it('is defined', () => {
			const sut = createSUT(true);
			Assert.defined(sut);
		});
	});

	describe('with not partial', () => {

		const partial = false;

		describe(StructuralEqualityComparer.prototype.equals.name, () => {

			describe('with structurally equal objects', () => {

				const a = {
					abc: 42,
					def: 'hello',
				};
				const b = {
					abc: 42,
					def: 'hello',
				};

				it('returns expected true', () => {
					const sut = createSUT(partial);
					const actual = sut.equals(a, b);
					Assert.true(actual);
				});
			});

			describe('with structurally subset (a < b) equal object', () => {

				const a = {
					abc: 42,
				};
				const b = {
					abc: 42,
					def: 'hello',
				};

				it('returns false', () => {
					const sut = createSUT(partial);
					const actual = sut.equals(a, b);
					Assert.false(actual);
				});
			});

			describe('with structurally subset (b < a) equal object', () => {

				const a = {
					abc: 42,
					def: 'hello',
				};
				const b = {
					abc: 42,
				};

				it('returns false', () => {
					const sut = createSUT(partial);
					const actual = sut.equals(a, b);
					Assert.false(actual);
				});
			});

			describe('with structurally different objects (keys)', () => {

				const a = {
					abc: 42,
					fed: 'hello',
				};
				const b = {
					abc: 42,
					def: 'hello',
				};

				it('returns false', () => {
					const sut = createSUT(partial);
					const actual = sut.equals(a, b);
					Assert.false(actual);
				});
			});

			describe('with structurally different objects (values)', () => {

				const a = {
					abc: 42,
					def: 'hello',
				};
				const b = {
					abc: 42,
					def: 'olleh',
				};

				it('returns false', () => {
					const sut = createSUT(partial);
					const actual = sut.equals(a, b);
					Assert.false(actual);
				});
			});
		});
	});

	describe('with partial', () => {

		const partial = true;

		describe('with structurally equal objects', () => {

			const a = {
				abc: 42,
				def: 'hello',
			};
			const b = {
				abc: 42,
				def: 'hello',
			};

			it('returns true', () => {
				const sut = createSUT(partial);
				const actual = sut.equals(a, b);
				Assert.true(actual);
			});
		});

		describe('with structurally subset (a < b) equal object', () => {

			const a = {
				abc: 42,
			};
			const b = {
				abc: 42,
				def: 'hello',
			};

			it('returns true', () => {
				const sut = createSUT(partial);
				const actual = sut.equals(a, b);
				Assert.true(actual);
			});
		});

		describe('with structurally subset (b < a) equal object', () => {

			const a = {
				abc: 42,
				def: 'hello',
			};
			const b = {
				abc: 42,
			};

			it('returns false', () => {
				const sut = createSUT(partial);
				const actual = sut.equals(a, b);
				Assert.false(actual);
			});
		});

		describe('with structurally different objects (keys)', () => {

			const a = {
				abc: 42,
				fed: 'hello',
			};
			const b = {
				abc: 42,
				def: 'hello',
			};

			it('returns false', () => {
				const sut = createSUT(partial);
				const actual = sut.equals(a, b);
				Assert.false(actual);
			});
		});

		describe('with structurally different objects (values)', () => {

			const a = {
				abc: 42,
				def: 'hello',
			};
			const b = {
				abc: 42,
				def: 'olleh',
			};

			it('returns false', () => {
				const sut = createSUT(partial);
				const actual = sut.equals(a, b);
				Assert.false(actual);
			});
		});
	});
});
