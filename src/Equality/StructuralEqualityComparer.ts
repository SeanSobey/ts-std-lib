import { IEqualityComparer } from './IEqualityComparer';

/**
 * Equality comparer that tests equality in the properties and symbols (not functions) of objects.
 */
export class StructuralEqualityComparer<T extends object> implements IEqualityComparer<T> {

	public constructor(
		private readonly _equalityComparer: IEqualityComparer<T>,
		private readonly _partial: boolean = false,
	) { }

	public equals(a: T, b: T): boolean {

		const aProperties = this.getObjectProperties(a);
		const bProperties = this.getObjectProperties(b);
		if (this._partial && aProperties.some(aProperty => !bProperties.includes(aProperty))) {
			return false;
		}
		if (!this._partial && aProperties.length !== bProperties.length) {
			return false;
		}
		for (const property of aProperties) {
			if (!(property in b)) {
				if (this._partial) {
					continue;
				}
				return false;
			}
			const aValue = (a as any)[property];
			const bValue = (b as any)[property];

			if (!this._equalityComparer.equals(aValue, bValue)) {
				return false;
			}
		}
		return true;
	}

	private getObjectProperties(object: object): ReadonlyArray<PropertyKey> {

		const properties = new Set<PropertyKey>();
		function add(propertyKey: PropertyKey): void {
			// Skip methods
			if (typeof (object as any)[propertyKey] === 'function') {
				return;
			}
			properties.add(propertyKey);
		}
		// Add properties
		for (const propertyName of Object.getOwnPropertyNames(object)) {
			add(propertyName);
		}
		// Add symbols
		for (const propertySymbol of Object.getOwnPropertySymbols(object)) {
			add(propertySymbol);
		}
		const prototype = Object.getPrototypeOf(object);
		if (
			prototype !== null
			&& !Object.is(prototype, Object.prototype)
		) {
			for (const prototypeProperty of this.getObjectProperties(prototype)) {
				if (Object.is(prototype[prototypeProperty], object.constructor)) {
					continue;
				}
				add(prototypeProperty);
			}
		}
		return Array.from(properties);
	}
}
