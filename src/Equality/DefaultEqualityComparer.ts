import { URL } from 'url';

import { IEqualityComparer } from './IEqualityComparer';
import { equals } from './IEquatable';
import { isEquatable } from './IsEquatable';
import { Type } from '../Type';
import { ValueEqualityComparer } from './ValueEqualityComparer';
import { TypeEqualityComparer } from './TypeEqualityComparer';
import { StructuralEqualityComparer } from './StructuralEqualityComparer';
import { IterableEqualityComparer } from './IterableEqualityComparer';

/**
 * Equality comparer that tests equality
 */
export class DefaultEqualityComparer implements IEqualityComparer<any> {

	private readonly _valueEqualityComparer: ValueEqualityComparer;
	private readonly _typeEqualityComparer: TypeEqualityComparer;
	private readonly _iterableEqualityComparer: IterableEqualityComparer<any>;
	private readonly _structuralEqualityComparer: StructuralEqualityComparer<any>;
	private readonly _checkClass: boolean;

	public constructor(checkClass = true, partial = false) {

		this._valueEqualityComparer = new ValueEqualityComparer();
		this._typeEqualityComparer = new TypeEqualityComparer();
		this._iterableEqualityComparer = new IterableEqualityComparer(this);
		this._structuralEqualityComparer = new StructuralEqualityComparer(this, partial);
		this._checkClass = checkClass;
	}

	public equals(a: unknown, b: unknown): boolean {

		if (Type.isNull(a) || Type.isNull(b)) {
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isUndefined(a) || Type.isUndefined(b)) {
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isPrimitive(a) || Type.isPrimitive(b)) {
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isFunction(a) || Type.isFunction(b)) {
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isAsyncFunction(a) || Type.isAsyncFunction(b)) {
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isGeneratorFunction(a) || Type.isGeneratorFunction(b)) {
			return this._valueEqualityComparer.equals(a, b);
		}
		// if (a instanceof Generator && b instanceof Generator) {
		// 	throw new Error('Not implemented');
		// }
		if (isEquatable(a)) {
			if (!isEquatable(b)) {
				return false;
			}
			return a[equals](b) || b[equals](a); // TODO: transitive equality?
		}
		if (this._checkClass && !this._typeEqualityComparer.equals(a, b)) {
			return false;
		}
		if (Type.isInstanceOf(URL, a)) {
			if (!Type.isInstanceOf(URL, b)) {
				return false;
			}
			return this._valueEqualityComparer.equals(a.toString(), b.toString());
		}
		if (Type.isInstanceOf(Date, a)) {
			if (!Type.isInstanceOf(Date, b)) {
				return false;
			}
			return this._valueEqualityComparer.equals(a.getTime(), b.getTime());
		}
		// if (a instanceof Buffer && b instanceof Buffer) {
		// 	return a.equals(b);
		// }
		if (Type.isInstanceOf(Error, a)) {
			if (!Type.isInstanceOf(Error, b)) {
				return false;
			}
			throw new Error('Not implemented');
		}
		// if (a instanceof Array && b instanceof Array) {
		// 	throw new Error('Not implemented');
		// }
		// if (a instanceof TypedArray && b instanceof TypedArray) {
		// 	throw new Error('Not implemented');
		// }
		// if (Type.isInstanceOf<Map<any, any>>(Map, a)) {
		// 	if (!Type.isInstanceOf(Map, b)) {
		// 		return false;
		// 	}
		// 	throw new Error('Not implemented');
		// }
		if (Type.isInstanceOf<WeakMap<any, any>>(WeakMap, a)) {
			if (!Type.isInstanceOf(WeakMap, b)) {
				return false;
			}
			throw new Error('Not implemented');
		}
		// if (Type.isInstanceOf<Set<any>>(Set, a)) {
		// 	if (!Type.isInstanceOf(Set, b)) {
		// 		return false;
		// 	}
		// 	throw new Error('Not implemented');
		// }
		if (Type.isInstanceOf<WeakSet<any>>(WeakSet, a)) {
			if (!Type.isInstanceOf(WeakSet, b)) {
				return false;
			}
			throw new Error('Not implemented');
		}
		if (Type.isInstanceOf<ArrayBuffer>(ArrayBuffer, a)) {
			if (!Type.isInstanceOf(ArrayBuffer, b)) {
				return false;
			}
			throw new Error('Not implemented');
		}
		if (Type.isInstanceOf<DataView>(DataView, a)) {
			if (!Type.isInstanceOf(DataView, b)) {
				return false;
			}
			throw new Error('Not implemented');
		}
		if (Type.isPromise(a)) {
			if (!Type.isPromise(b)) {
				return false;
			}
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isProxy(a)) {
			if (!Type.isProxy(b)) {
				return false;
			}
			throw new Error('Not implemented');
		}
		if (Type.isRegExp(a)) {
			if (!Type.isRegExp(b)) {
				return false;
			}
			return this._valueEqualityComparer.equals(a.toString(), b.toString());
		}
		if (Type.isSymbol(a)) {
			if (!Type.isSymbol(b)) {
				return false;
			}
			return this._valueEqualityComparer.equals(a, b);
		}
		if (Type.isIterable(a)) {
			if (!Type.isIterable(b)) {
				return false;
			}
			return this._iterableEqualityComparer.equals(a, b);
		}
		return this._structuralEqualityComparer.equals(a, b);
	}
}
