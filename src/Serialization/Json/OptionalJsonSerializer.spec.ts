import { describe, it } from 'mocha';

import { OptionalJsonSerializer } from './OptionalJsonSerializer';
import { Optional } from '../../Optional';
import { Assert } from '../../Assert';
import { DateJsonSerializer } from './DateJsonSerializer';
import { JsonSerializable, jsonProperty } from '../../Serialization/Json/JsonSerializable';

describe(OptionalJsonSerializer.name, () => {

	class TestClass {

	}

	class TestJsonSerializable extends JsonSerializable {

		@jsonProperty()
		public readonly testProp: number = 42;
	}

	const number = 1;
	const boolean = false;
	const string = 'some-text';
	const object = {};
	const date = new Date(1);
	const symbol = Symbol();
	// const moment = momentUtc('2018-03-04');
	const clazz = new TestClass();
	const jsonable = new TestJsonSerializable();

	const assert = new Assert();

	describe(OptionalJsonSerializer.prototype.serialize.name, () => {

		it('works with null', () => {
			const obj = new Optional<null>(null);
			const sut = new OptionalJsonSerializer<null>();
			const actual = sut.serialize(obj);
			const expected = null;
			assert.equal(actual, expected);
		});

		it('works with number', () => {
			const obj = new Optional<number>(number);
			const sut = new OptionalJsonSerializer<number>();
			const actual = sut.serialize(obj);
			const expected = number;
			assert.equal(actual, expected);
		});

		it('works with boolean', () => {
			const obj = new Optional<boolean>(boolean);
			const sut = new OptionalJsonSerializer<boolean>();
			const actual = sut.serialize(obj);
			const expected = boolean;
			assert.equal(actual, expected);
		});

		it('works with string', () => {
			const obj = new Optional<string>(string);
			const sut = new OptionalJsonSerializer<string>();
			const actual = sut.serialize(obj);
			const expected = string;
			assert.equal(actual, expected);
		});

		it('works with object', () => {
			const obj = new Optional<{}>(object);
			const sut = new OptionalJsonSerializer<{}>();
			const actual = sut.serialize(obj);
			const expected = object;
			assert.equal(actual, expected);
		});

		it('works with date', () => {
			const obj = new Optional<Date>(date);
			const sut = new OptionalJsonSerializer<Date>();
			const actual = sut.serialize(obj);
			const expected = date;
			assert.equal(actual, expected);
		});

		it('throws with symbol', () => {
			const obj = new Optional<symbol>(symbol);
			const sut = new OptionalJsonSerializer<symbol>();
			assert.throws(() => sut.serialize(obj), Error, 'Cannot serialize symbols');
		});

		it('throws with class', () => {
			const obj = new Optional<TestClass>(clazz);
			const sut = new OptionalJsonSerializer<TestClass>();
			assert.throws(() => sut.serialize(obj), Error, 'Cannot serialize TestClass {}');
		});

		it('works with JsonSerializable', () => {
			const obj = new Optional<TestJsonSerializable>(jsonable);
			const sut = new OptionalJsonSerializer<TestJsonSerializable>();
			const actual = sut.serialize(obj);
			const expected = { testProp: 42 };
			assert.structuralEqual(actual, expected);
		});

		it('works with custom serializer', () => {
			const obj = new Optional(date);
			const sut = new OptionalJsonSerializer(new DateJsonSerializer());
			const actual = sut.serialize(obj);
			const expected = date.toJSON();
			assert.equal(actual, expected);
		});
	});

	describe(OptionalJsonSerializer.prototype.deserialize.name, () => {

		it('works with null', () => {
			const sut = new OptionalJsonSerializer<null>();
			const actual = sut.deserialize(null);
			const expected = new Optional<null>();
			assert.equal(actual, expected);
		});

		it('works with number', () => {
			const sut = new OptionalJsonSerializer<number>();
			const actual = sut.deserialize(number);
			const expected = new Optional<number>(number);
			assert.equal(actual, expected);
		});

		it('works with boolean', () => {
			const sut = new OptionalJsonSerializer<boolean>();
			const actual = sut.deserialize(boolean);
			const expected = new Optional<boolean>(boolean);
			assert.equal(actual, expected);
		});

		it('works with string', () => {
			const sut = new OptionalJsonSerializer<string>();
			const actual = sut.deserialize(string);
			const expected = new Optional<string>(string);
			assert.equal(actual, expected);
		});

		it('works with object', () => {
			const sut = new OptionalJsonSerializer<{}>();
			const actual = sut.deserialize(object);
			const expected = new Optional(object);
			assert.equal(actual, expected);
		});

		it('works with date', () => {
			const sut = new OptionalJsonSerializer<Date>();
			const actual = sut.deserialize(date);
			const expected = new Optional(date);
			assert.equal(actual, expected);
		});

		it('works with JsonSerializable', () => {
			const sut = new OptionalJsonSerializer<TestJsonSerializable>();
			const actual = sut.deserialize(jsonable);
			const expected = new Optional(jsonable);
			assert.equal(actual, expected);
		});

		it('works with custom serializer', () => {
			const json = date.toJSON();
			const sut = new OptionalJsonSerializer(new DateJsonSerializer());
			const actual = sut.deserialize(json);
			const expected = new Optional(date);
			assert.equal(actual, expected);
		});
	});
});
