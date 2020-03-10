## Classes

<dl>
<dt><a href="#DefaultEqualityComparer">DefaultEqualityComparer</a></dt>
<dd><p>Equality comparer that tests equality</p>
</dd>
<dt><a href="#IterableEqualityComparer">IterableEqualityComparer</a></dt>
<dd><p>Equality comparer that tests equality using sequential equality (same elements in same position) for Iterables. Is not recursive.</p>
</dd>
<dt><a href="#PredicateEqualityComparer">PredicateEqualityComparer</a></dt>
<dd><p>Equality comparer that tests equality using a given predicate function.</p>
</dd>
<dt><a href="#StructuralEqualityComparer">StructuralEqualityComparer</a></dt>
<dd><p>Equality comparer that tests equality in the properties and symbols (not functions) of objects.</p>
</dd>
<dt><a href="#TypeEqualityComparer">TypeEqualityComparer</a></dt>
<dd><p>Equality comparer that tests equality using runtime types.</p>
</dd>
<dt><a href="#ValueEqualityComparer">ValueEqualityComparer</a></dt>
<dd><p>Equality comparer that tests equality using <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value_equality">same-value equality</a>.</p>
</dd>
<dt><a href="#Optional">Optional</a></dt>
<dd><p>An object to wrap a nullable in an interface to avoid null exeptions.</p>
</dd>
</dl>

<a name="DefaultEqualityComparer"></a>

## DefaultEqualityComparer
Equality comparer that tests equality

**Kind**: global class  
<a name="IterableEqualityComparer"></a>

## IterableEqualityComparer
Equality comparer that tests equality using sequential equality (same elements in same position) for Iterables. Is not recursive.

**Kind**: global class  
<a name="PredicateEqualityComparer"></a>

## PredicateEqualityComparer
Equality comparer that tests equality using a given predicate function.

**Kind**: global class  
<a name="StructuralEqualityComparer"></a>

## StructuralEqualityComparer
Equality comparer that tests equality in the properties and symbols (not functions) of objects.

**Kind**: global class  
<a name="TypeEqualityComparer"></a>

## TypeEqualityComparer
Equality comparer that tests equality using runtime types.

**Kind**: global class  
<a name="ValueEqualityComparer"></a>

## ValueEqualityComparer
Equality comparer that tests equality using [same-value equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Same-value_equality).

**Kind**: global class  
<a name="Optional"></a>

## Optional
An object to wrap a nullable in an interface to avoid null exeptions.

**Kind**: global class  
**See**

- https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html
- http://www.baeldung.com/java-optional


* [Optional](#Optional)
    * [.isPresent()](#Optional+isPresent) ⇒
    * [.ifPresent(callback)](#Optional+ifPresent)
    * [.ifPresentOrElse(callback, emptyCallback)](#Optional+ifPresentOrElse)
    * [.or(supplier)](#Optional+or) ⇒
    * [.orElse(defaultValue)](#Optional+orElse) ⇒
    * [.orElseGet(callback)](#Optional+orElseGet) ⇒
    * [.orElseThrow(exceptionSupplier)](#Optional+orElseThrow) ⇒
    * [.orUndefined()](#Optional+orUndefined) ⇒ <code>Undefinable.&lt;T&gt;</code>
    * [.orNull()](#Optional+orNull) ⇒ <code>Undefinable.&lt;T&gt;</code>
    * [.get()](#Optional+get) ⇒ <code>T</code>

<a name="Optional+isPresent"></a>

### optional.isPresent() ⇒
Check if the value is null.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
**Returns**: True if there is a value present, otherwise false.  
<a name="Optional+ifPresent"></a>

### optional.ifPresent(callback)
If a value is present, invoke the specified callback with the value, otherwise do nothing.

**Kind**: instance method of [<code>Optional</code>](#Optional)  

| Param | Description |
| --- | --- |
| callback | The callback to invoke. |

<a name="Optional+ifPresentOrElse"></a>

### optional.ifPresentOrElse(callback, emptyCallback)
If a value is present, performs the given callback with the value, otherwise performs the given empty-based callback.

**Kind**: instance method of [<code>Optional</code>](#Optional)  

| Param | Description |
| --- | --- |
| callback | The callback to be performed, if a value is present. |
| emptyCallback | The callback to be performed, if no value is present. |

<a name="Optional+or"></a>

### optional.or(supplier) ⇒
If a value is present, returns an Optional describing the value, otherwise returns an Optional produced by the supplying function.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
**Returns**: An Optional describing the value of this Optional, if a value is present, otherwise an Optional produced by the supplying function.  

| Param | Description |
| --- | --- |
| supplier | The supplying function that produces an Optional to be returned. |

<a name="Optional+orElse"></a>

### optional.orElse(defaultValue) ⇒
The methods orElse and orElseGet are generally preferable to this method, as they return a substitute value if the value is absent, instead of throwing an exception.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
**Returns**: The value if present, otherwise return the default.  

| Param | Description |
| --- | --- |
| defaultValue | The default value to return. |

<a name="Optional+orElseGet"></a>

### optional.orElseGet(callback) ⇒
Return the value if not null or a default via a callback, to allow for lazy loading.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
**Returns**: The value if present, otherwise return the default.  

| Param | Description |
| --- | --- |
| callback | The callback to invoke to get the default value to return. |

<a name="Optional+orElseThrow"></a>

### optional.orElseThrow(exceptionSupplier) ⇒
Return the contained value, if present, otherwise throw an exception to be created by the provided supplier.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
**Returns**: The value if present.  

| Param | Description |
| --- | --- |
| exceptionSupplier | The callback to invoke to get the error to throw. |

<a name="Optional+orUndefined"></a>

### optional.orUndefined() ⇒ <code>Undefinable.&lt;T&gt;</code>
Return the contained value, if present, otherwise return 'undefined'.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
<a name="Optional+orNull"></a>

### optional.orNull() ⇒ <code>Undefinable.&lt;T&gt;</code>
Return the contained value, if present, otherwise return 'null'.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
<a name="Optional+get"></a>

### optional.get() ⇒ <code>T</code>
If a value is present in this Optional, returns the value, otherwise throws NoSuchElementException.

**Kind**: instance method of [<code>Optional</code>](#Optional)  
**Returns**: <code>T</code> - The value if present.  
