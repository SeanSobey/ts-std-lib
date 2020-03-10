import { describe, it } from 'mocha';
// import { Moment, utc as momentUtc } from 'moment';

// import { IJsonSerializer } from './IJsonSerializer';
// import { Json } from './Json';
import { JsonSerializable, jsonProperty, jsonParameter, DefaultSerializer } from './JsonSerializable';
import { Assert } from '../../Assert';
import { Guid } from '../../Guid';
import { IEqualityComparer, equalTo } from '../../Equality';
// import { MomentEqualityComparer } from '../../../Moment';
import { IEquatable, equals } from '../../Equality';

describe(JsonSerializable.name, () => {

	const assert = new Assert();

	// class TestMomentSerializer implements IJsonSerializer<Moment> {

	// 	public serialize(object: Moment): Json {

	// 		return object.toJSON();
	// 	}

	// 	public deserialize(json: Json): Moment {

	// 		return momentUtc(json as string);
	// 	}
	// }

	interface ITestJsonSerializable {
		readonly prop: number;
		readonly customNameProp: number;
		readonly ignoreProp: number;
		//readonly momentProp: Moment;
		readonly guidProp: Guid;
		readonly noParamProp: string;
		readonly [1]: boolean;
	}

	class ITestJsonSerializableEqualityComparer implements IEqualityComparer<ITestJsonSerializable> {

		public equals(a: ITestJsonSerializable, b: ITestJsonSerializable): boolean {

			if (!equalTo(a.prop, b.prop)) {
				return false;
			}
			if (!equalTo(a.customNameProp, b.customNameProp)) {
				return false;
			}
			if (!equalTo(a.ignoreProp, b.ignoreProp)) {
				return false;
			}
			// if (!equalTo(a.momentProp, b.momentProp, new MomentEqualityComparer())) {
			// 	return false;
			// }
			if (!equalTo(a.guidProp, b.guidProp)) {
				return false;
			}
			if (!equalTo(a.noParamProp, b.noParamProp)) {
				return false;
			}
			if (!equalTo(a[1], b[1])) {
				return false;
			}
			return true;
		}
	}

	class ConstructorTestJsonSerializable extends JsonSerializable implements ITestJsonSerializable {

		@jsonProperty()
		public readonly prop: number = 42;
		@jsonProperty('Prop')
		public readonly customNameProp: number = 43;
		public readonly ignoreProp: number = 44;
		// @jsonProperty(new TestMomentSerializer())
		// public readonly momentProp: Moment = momentUtc('2018-03-16');
		@jsonProperty(Guid)
		public readonly guidProp: Guid = new Guid('aabe843a-4f30-4978-b25a-3db846aeb8f2');
		@jsonProperty()
		public readonly noParamProp: string = 'fortyTwo';
		@jsonProperty()
		public readonly [1]: boolean = true;

		public constructor(
			/*A comment*/
			@jsonParameter() prop?: number,
			@jsonParameter('Prop') customNameProp?: number,
			ignoreProp?: number,
			// @jsonParameter(undefined, new TestMomentSerializer()) momentProp?: Moment,
		) {
			super();
			this.prop = prop !== undefined ? prop : 42;
			this.customNameProp = customNameProp !== undefined ? customNameProp : 43;
			this.ignoreProp = ignoreProp !== undefined ? ignoreProp : 44;
			// this.momentProp = momentProp !== undefined ? momentProp : momentUtc('2018-03-16');
		}
	}

	class NoConstructorTestJsonSerializable extends JsonSerializable implements ITestJsonSerializable {

		@jsonProperty()
		public readonly prop: number = 42;
		@jsonProperty('Prop')
		public readonly customNameProp: number = 43;
		public readonly ignoreProp: number = 44;
		// @jsonProperty(new TestMomentSerializer())
		// public readonly momentProp: Moment = momentUtc('2018-03-16');
		@jsonProperty(Guid)
		public readonly guidProp: Guid = new Guid('aabe843a-4f30-4978-b25a-3db846aeb8f2');
		@jsonProperty()
		public readonly noParamProp: string = 'fortyTwo';
		@jsonProperty()
		public readonly [1]: boolean = true;
	}

	class AnySerializable extends JsonSerializable implements IEquatable<AnySerializable> {

		@jsonProperty()
		public readonly anyPropOne: any;
		@jsonProperty()
		public readonly anyPropTwo: any;

		public constructor(anyPropOne: any, anyPropTwo: any) {

			super();
			this.anyPropOne = anyPropOne;
			this.anyPropTwo = anyPropTwo;
		}

		public [equals](other: AnySerializable): boolean {

			return this.anyPropOne === other.anyPropOne && this.anyPropTwo === other.anyPropTwo;
		}
	}

	class FirstChildJsonSerializable extends JsonSerializable implements IEquatable<FirstChildJsonSerializable> {

		@jsonProperty()
		public readonly firstChildProp: number;

		public constructor(firstChildProp: number) {

			super();
			this.firstChildProp = firstChildProp !== undefined ? firstChildProp : 42;
		}

		public [equals](other: FirstChildJsonSerializable): boolean {

			return this.firstChildProp === other.firstChildProp;
		}
	}

	class SecondChildJsonSerializable extends FirstChildJsonSerializable implements IEquatable<SecondChildJsonSerializable> {

		@jsonProperty()
		public readonly secondChildProp: number;

		public constructor(firstChildProp: number, secondChildProp: number) {

			super(firstChildProp);
			this.secondChildProp = secondChildProp !== undefined ? secondChildProp : 43;
		}

		public [equals](other: SecondChildJsonSerializable): boolean {

			return this.secondChildProp === other.secondChildProp && super[equals](other);
		}
	}

	describe(JsonSerializable.fromJSON.name, () => {

		describe('given class', () => {

			describe('with null json', () => {

				it('should set null', () => {

					const json = null;
					const actual = AnySerializable.fromJSON<AnySerializable>(json);
					const expected = new AnySerializable(null, null);
					assert.equal(actual, expected);
				});
			});

			describe('with undefined json', () => {

				it('should set undefined', () => {

					const json = undefined;
					const actual = AnySerializable.fromJSON<AnySerializable>(json);
					const expected = new AnySerializable(undefined, undefined);
					assert.equal(actual, expected);
				});
			});

			describe('with number json', () => {

				it('should set number', () => {

					const json = 1;
					const actual = AnySerializable.fromJSON<AnySerializable>(json);
					const expected = new AnySerializable(1, 1);
					assert.equal(actual, expected);
				});
			});

			describe('with boolean json', () => {

				it('should boolean number', () => {

					const json = true;
					const actual = AnySerializable.fromJSON<AnySerializable>(json);
					const expected = new AnySerializable(true, true);
					assert.equal(actual, expected);
				});
			});

			describe('with string json', () => {

				it('should set number', () => {

					const json = 'aabe843a-4f30-4978-b25a-3db846aeb8f2';
					const actual = AnySerializable.fromJSON<AnySerializable>(json);
					const expected = new AnySerializable('aabe843a-4f30-4978-b25a-3db846aeb8f2', 'aabe843a-4f30-4978-b25a-3db846aeb8f2');
					assert.equal(actual, expected);
				});
			});
		});

		describe('given derived class', () => {

			it('should set parent properties too', () => {

				const json = 44;
				const actual = SecondChildJsonSerializable.fromJSON<SecondChildJsonSerializable>(json);
				const expected = new SecondChildJsonSerializable(44, 44);
				assert.equal(actual, expected);
			});
		});

		describe('given class with json constructor parameters', () => {

			// it('should create instance from string json', () => {

			// 	const json = JSON.stringify({
			// 		prop: 42,
			// 		Prop: 43,
			// 		noParamProp: 'fortyTwo',
			// 		// momentProp: '2018-03-16T00:00:00.000Z',
			// 		guidProp: {
			// 			guid: 'aabe843a-4f30-4978-b25a-3db846aeb8f2'
			// 		},
			// 		1: true
			// 	}, undefined, 2);
			// 	const actual: ITestJsonSerializable = ConstructorTestJsonSerializable.fromJSON<ConstructorTestJsonSerializable>(json);
			// 	const expected: ITestJsonSerializable = {
			// 		prop: 42,
			// 		customNameProp: 43,
			// 		ignoreProp: 44,
			// 		// momentProp: momentUtc('2018-03-16'),
			// 		guidProp: new Guid('aabe843a-4f30-4978-b25a-3db846aeb8f2'),
			// 		noParamProp: 'fortyTwo',
			// 		1: true,
			// 	};
			// 	assert.equal(actual, expected, new ITestJsonSerializableEqualityComparer());
			// 	assert.instanceOf(actual, ConstructorTestJsonSerializable);
			// });

			it('should create instance from object json', () => {

				const json = {
					prop: 42,
					Prop: 43,
					noParamProp: 'fortyTwo',
					momentProp: '2018-03-16T00:00:00.000Z',
					guidProp: {
						guid: 'aabe843a-4f30-4978-b25a-3db846aeb8f2'
					},
					1: true,
				};
				const actual: ITestJsonSerializable = ConstructorTestJsonSerializable.fromJSON<ConstructorTestJsonSerializable>(json);
				const expected: ITestJsonSerializable = {
					prop: 42,
					customNameProp: 43,
					ignoreProp: 44,
					// momentProp: momentUtc('2018-03-16'),
					guidProp: new Guid('aabe843a-4f30-4978-b25a-3db846aeb8f2'),
					noParamProp: 'fortyTwo',
					1: true,
				};
				assert.equal(actual, expected, new ITestJsonSerializableEqualityComparer());
				assert.instanceOf(actual, ConstructorTestJsonSerializable);
			});
		});

		describe('given class without json constructor parameters', () => {

			// it('should create instance from string json', () => {

			// 	const json = JSON.stringify({
			// 		prop: 42,
			// 		Prop: 43,
			// 		noParamProp: 'fortyTwo',
			// 		momentProp: '2018-03-16T00:00:00.000Z',
			// 		guidProp: {
			// 			guid: 'aabe843a-4f30-4978-b25a-3db846aeb8f2'
			// 		},
			// 		1: true
			// 	}, undefined, 2);
			// 	const actual: ITestJsonSerializable = NoConstructorTestJsonSerializable.fromJSON<NoConstructorTestJsonSerializable>(json);
			// 	const expected: ITestJsonSerializable = {
			// 		prop: 42,
			// 		customNameProp: 43,
			// 		ignoreProp: 44,
			// 		momentProp: momentUtc('2018-03-16'),
			// 		guidProp: new Guid('aabe843a-4f30-4978-b25a-3db846aeb8f2'),
			// 		noParamProp: 'fortyTwo',
			// 		1: true,
			// 	};
			// 	Assert.equal(actual, expected, new ITestJsonSerializableEqualityComparer());
			// 	Assert.instanceOf(actual, NoConstructorTestJsonSerializable);
			// });

			it('should create instance from object json', () => {

				const json = {
					prop: 42,
					Prop: 43,
					noParamProp: 'fortyTwo',
					momentProp: '2018-03-16T00:00:00.000Z',
					guidProp: {
						guid: 'aabe843a-4f30-4978-b25a-3db846aeb8f2'
					},
					1: true,
				};
				const actual: ITestJsonSerializable = NoConstructorTestJsonSerializable.fromJSON<NoConstructorTestJsonSerializable>(json);
				const expected: ITestJsonSerializable = {
					prop: 42,
					customNameProp: 43,
					ignoreProp: 44,
					// momentProp: momentUtc('2018-03-16'),
					guidProp: new Guid('aabe843a-4f30-4978-b25a-3db846aeb8f2'),
					noParamProp: 'fortyTwo',
					1: true,
				};
				assert.equal(actual, expected, new ITestJsonSerializableEqualityComparer());
				assert.instanceOf(actual, NoConstructorTestJsonSerializable);
			});
		});
	});

	describe(JsonSerializable.prototype.toJSON.name, () => {

		describe('given class with json constructor parameters', () => {

			it('should create json from instance', () => {

				const sut = new ConstructorTestJsonSerializable();
				const actual = JSON.stringify(sut, undefined, 2);
				const expected = JSON.stringify({
					prop: 42,
					Prop: 43,
					// momentProp: '2018-03-16T00:00:00.000Z',
					guidProp: {
						guid: 'aabe843a-4f30-4978-b25a-3db846aeb8f2'
					},
					noParamProp: 'fortyTwo',
					1: true,
				}, undefined, 2);
				assert.equal(actual, expected);
			});
		});

		describe('given class without json constructor parameters', () => {

			it('should create instance from json', () => {

				const sut = new NoConstructorTestJsonSerializable();
				const actual = JSON.stringify(sut, undefined, 2);
				const expected = JSON.stringify({
					prop: 42,
					Prop: 43,
					// momentProp: '2018-03-16T00:00:00.000Z',
					guidProp: {
						guid: 'aabe843a-4f30-4978-b25a-3db846aeb8f2'
					},
					noParamProp: 'fortyTwo',
					1: true,
				}, undefined, 2);
				assert.equal(actual, expected);
			});
		});
	});
});

describe(DefaultSerializer.name, () => {

	const assert = new Assert();

	describe(DefaultSerializer.prototype.serialize.name, () => {

		it('works with null', () => {
			const json = null;
			const sut = new DefaultSerializer();
			const actual = sut.serialize(json);
			const expected = null;
			assert.equal(actual, expected);
		});

	});

	describe(DefaultSerializer.prototype.deserialize.name, () => {

	});
});
