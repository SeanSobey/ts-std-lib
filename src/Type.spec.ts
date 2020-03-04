import { describe, it } from 'mocha';

import { Assert } from './Assert';
import { Type } from './Type';
import { AbstractConstructor } from './Constructor';

class Example {}

describe(Type.name, () => {

	const assert = new Assert();

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
});
