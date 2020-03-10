## Classes

<dl>
<dt><a href="#AssertionError">AssertionError</a></dt>
<dd><p>Custom assertion error</p>
</dd>
<dt><a href="#Assert">Assert</a></dt>
<dd><p>Assertion class designed for unit testing</p>
</dd>
<dt><a href="#DefaultInspector">DefaultInspector</a></dt>
<dd><p>An standard implementation for inspecting native objects during debugging</p>
</dd>
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
<dt><a href="#Guid">Guid</a></dt>
<dd><p>A globally unique user identifer implementation</p>
</dd>
<dt><a href="#OptionalValueNotSetError">OptionalValueNotSetError</a></dt>
<dd><p>Error for the optional values not set</p>
</dd>
<dt><a href="#Optional">Optional</a></dt>
<dd><p>An object to wrap a nullable in an interface to avoid null exeptions.</p>
</dd>
<dt><a href="#BufferJsonSerializer">BufferJsonSerializer</a></dt>
<dd><p>Json serializer for the native Buffer class</p>
</dd>
<dt><a href="#DateJsonSerializer">DateJsonSerializer</a></dt>
<dd><p>Json serializer for the native Date class</p>
</dd>
<dt><a href="#JsonConverter">JsonConverter</a></dt>
<dd><p>Json converter to interchange JSON and objects using a serializer</p>
</dd>
<dt><a href="#JsonSerializable">JsonSerializable</a></dt>
<dd><p>A base type to use for objects that can then be serialized to/from json using decorators</p>
</dd>
<dt><a href="#DefaultSerializer">DefaultSerializer</a></dt>
<dd><p>A default implementation of IJsonSerializer</p>
</dd>
<dt><a href="#MapJsonSerializer">MapJsonSerializer</a></dt>
<dd><p>Json serializer for the native Map class</p>
</dd>
<dt><a href="#SetJsonSerializer">SetJsonSerializer</a></dt>
<dd><p>Json serializer for the native Set class</p>
</dd>
<dt><a href="#URLJsonSerializer">URLJsonSerializer</a></dt>
<dd><p>Json serializer for the node URL class</p>
</dd>
<dt><a href="#Type">Type</a></dt>
<dd><p>For runtime type operations</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#equalTo">equalTo(a, b, equalityComparer)</a></dt>
<dd><p>A better <code>===</code> operator function</p>
</dd>
<dt><a href="#isEquatable">isEquatable(object)</a></dt>
<dd><p>Checks if an object implements equatable</p>
</dd>
<dt><a href="#isJsonSerializable">isJsonSerializable()</a></dt>
<dd><p>Checks if an object is json serializable</p>
</dd>
<dt><a href="#isJsonSerializer">isJsonSerializer()</a></dt>
<dd><p>Checks if an object is a json serializer</p>
</dd>
</dl>

<a name="AssertionError"></a>

## AssertionError
Custom assertion error

**Kind**: global class  
<a name="Assert"></a>

## Assert
Assertion class designed for unit testing

**Kind**: global class  

* [Assert](#Assert)
    * [.defined(value, messageOrError)](#Assert+defined)
    * [.undefined(value, messageOrError)](#Assert+undefined)
    * [.true(value, messageOrError)](#Assert+true)
    * [.truthy(value, messageOrError)](#Assert+truthy)
    * [.false(value, messageOrError)](#Assert+false)
    * [.falsy(value, messageOrError)](#Assert+falsy)
    * [.fail(actual, expected, messageOrError, operator)](#Assert+fail)
    * [.valueEqual(actual, expected, messageOrError)](#Assert+valueEqual)
    * [.notValueEqual(actual, expected, messageOrError)](#Assert+notValueEqual)
    * [.structuralEqual(actual, expected, messageOrError)](#Assert+structuralEqual)
    * [.notStructuralEqual(actual, expected, messageOrError)](#Assert+notStructuralEqual)
    * [.partialStructuralEqual(actual, expected, messageOrError)](#Assert+partialStructuralEqual)
    * [.notPartialStructuralEqual(actual, expected, messageOrError)](#Assert+notPartialStructuralEqual)
    * [.rejects(asyncFn, error, messageOrError)](#Assert+rejects)
    * [.doesNotReject(asyncFn, error, messageOrError)](#Assert+doesNotReject)
    * [.rejectsError(asyncFn, error, errorMessage, message)](#Assert+rejectsError)
    * [.doesNotRejectError(asyncFn, error, errorMessage, message)](#Assert+doesNotRejectError)
    * [.throws(fn, error, messageOrError)](#Assert+throws)
    * [.doesNotThrow(fn, error, messageOrError)](#Assert+doesNotThrow)
    * [.throwsError(fn, error, errorMessage, message)](#Assert+throwsError)
    * [.doesNotThrowError(fn, error, errorMessage, message)](#Assert+doesNotThrowError)
    * [.instanceOf(actual, expected)](#Assert+instanceOf)

<a name="Assert+defined"></a>

### assert.defined(value, messageOrError)
Tests if value is not undefined.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| value | The value to test. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+undefined"></a>

### assert.undefined(value, messageOrError)
Tests if value is undefined.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| value | The value to test. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+true"></a>

### assert.true(value, messageOrError)
Tests if value is true.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| value | The value to test. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+truthy"></a>

### assert.truthy(value, messageOrError)
Tests if value is truthy.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| value | The value to test. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+false"></a>

### assert.false(value, messageOrError)
Tests if value is false.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| value | The value to test. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+falsy"></a>

### assert.falsy(value, messageOrError)
Tests if value is falsy.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| value | The value to test. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+fail"></a>

### assert.fail(actual, expected, messageOrError, operator)
Throws an AssertionError with the provided error message or a default error message.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |
| operator |  |

<a name="Assert+valueEqual"></a>

### assert.valueEqual(actual, expected, messageOrError)
Tests equality between the actual and expected parameters using value equality.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+notValueEqual"></a>

### assert.notValueEqual(actual, expected, messageOrError)
Tests inequality between the actual and expected parameters using value equality.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+structuralEqual"></a>

### assert.structuralEqual(actual, expected, messageOrError)
Tests equality between the actual and expected parameters using structural equality.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+notStructuralEqual"></a>

### assert.notStructuralEqual(actual, expected, messageOrError)
Tests inequality between the actual and expected parameters using structural equality.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+partialStructuralEqual"></a>

### assert.partialStructuralEqual(actual, expected, messageOrError)
Tests partial equality between the actual and expected parameters using structural equality.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+notPartialStructuralEqual"></a>

### assert.notPartialStructuralEqual(actual, expected, messageOrError)
Tests partial inequality between the actual and expected parameters using structural equality.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+rejects"></a>

### assert.rejects(asyncFn, error, messageOrError)
Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is rejected.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| asyncFn | If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.rejects() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped. |
| error | Validate error message using RegExp, custom error validation using predicate, instanceof using constructor or the Error message string. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+doesNotReject"></a>

### assert.doesNotReject(asyncFn, error, messageOrError)
Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is not rejected.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| asyncFn | If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.doesNotReject() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped. |
| error | Validate error message using RegExp, custom error validation using predicate, instanceof using constructor or the Error message string. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+rejectsError"></a>

### assert.rejectsError(asyncFn, error, errorMessage, message)
Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is rejected.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| asyncFn | If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.rejects() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped. |
| error | The error constructor to check for. |
| errorMessage | The error.msg to check for. |
| message |  |

<a name="Assert+doesNotRejectError"></a>

### assert.doesNotRejectError(asyncFn, error, errorMessage, message)
Awaits the asyncFn promise or, if asyncFn is a function, immediately calls the function and awaits the returned promise to complete. It will then check that the promise is not rejected.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| asyncFn | If asyncFn is a function and it throws an error synchronously, it will return a rejected Promise with that error. If the function does not return a promise, assert.doesNotReject() will return a rejected Promise with an ERR_INVALID_RETURN_VALUE error. In both cases the error handler is skipped. |
| error | The error constructor to check for. |
| errorMessage | The error.msg to check for. |
| message |  |

<a name="Assert+throws"></a>

### assert.throws(fn, error, messageOrError)
Expects the function fn to throw an error.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| fn | The function to evaluate. |
| error | Validate error message using RegExp, custom error validation using predicate, instanceof using constructor or the Error message string. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+doesNotThrow"></a>

### assert.doesNotThrow(fn, error, messageOrError)
Asserts that the function fn does not throw an error.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| fn | The function to evaluate. |
| error | Validate error message using RegExp, custom error validation using predicate or instanceof using constructor. |
| messageOrError | Optional custom text or error to report in the case of failure. |

<a name="Assert+throwsError"></a>

### assert.throwsError(fn, error, errorMessage, message)
Expects the function fn to throw an error type.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| fn | The function to evaluate. |
| error | The Error type to check for. |
| errorMessage | The error.msg to check for. |
| message | Optional custom text to report in the case of failure. |

<a name="Assert+doesNotThrowError"></a>

### assert.doesNotThrowError(fn, error, errorMessage, message)
Expects the function fn to not throw an error type.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| fn | The function to evaluate. |
| error | The Error type to check for. |
| errorMessage | The error.msg to check for. |
| message | Optional custom text to report in the case of failure. |

<a name="Assert+instanceOf"></a>

### assert.instanceOf(actual, expected)
Expect the actual value to be an instance of the expected object.

**Kind**: instance method of [<code>Assert</code>](#Assert)  

| Param | Description |
| --- | --- |
| actual | The actual value to evaluate. |
| expected | The expected value. |

<a name="DefaultInspector"></a>

## DefaultInspector
An standard implementation for inspecting native objects during debugging

**Kind**: global class  
<a name="DefaultInspector+inspect"></a>

### defaultInspector.inspect(object, options)
**Kind**: instance method of [<code>DefaultInspector</code>](#DefaultInspector)  

| Param |
| --- |
| object | 
| options | 

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
<a name="Guid"></a>

## Guid
A globally unique user identifer implementation

**Kind**: global class  
**See**: https://www.npmjs.com/package/uuid  
<a name="OptionalValueNotSetError"></a>

## OptionalValueNotSetError
Error for the optional values not set

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
<a name="BufferJsonSerializer"></a>

## BufferJsonSerializer
Json serializer for the native Buffer class

**Kind**: global class  
<a name="DateJsonSerializer"></a>

## DateJsonSerializer
Json serializer for the native Date class

**Kind**: global class  
<a name="JsonConverter"></a>

## JsonConverter
Json converter to interchange JSON and objects using a serializer

**Kind**: global class  
<a name="JsonSerializable"></a>

## JsonSerializable
A base type to use for objects that can then be serialized to/from json using decorators

**Kind**: global class  
<a name="DefaultSerializer"></a>

## DefaultSerializer
A default implementation of IJsonSerializer

**Kind**: global class  
<a name="MapJsonSerializer"></a>

## MapJsonSerializer
Json serializer for the native Map class

**Kind**: global class  
<a name="SetJsonSerializer"></a>

## SetJsonSerializer
Json serializer for the native Set class

**Kind**: global class  
<a name="URLJsonSerializer"></a>

## URLJsonSerializer
Json serializer for the node URL class

**Kind**: global class  
<a name="Type"></a>

## Type
For runtime type operations

**Kind**: global class  
<a name="Type.of"></a>

### Type.of(object)
Improved `typeof object` function, accounts for null and arrays.

**Kind**: static method of [<code>Type</code>](#Type)  

| Param | Description |
| --- | --- |
| object | The object to test. |

<a name="equalTo"></a>

## equalTo(a, b, equalityComparer)
A better `===` operator function

**Kind**: global function  

| Param | Description |
| --- | --- |
| a | First object |
| b | Second object |
| equalityComparer | Optional equality comparer |

<a name="isEquatable"></a>

## isEquatable(object)
Checks if an object implements equatable

**Kind**: global function  

| Param | Description |
| --- | --- |
| object | the object to check |

<a name="isJsonSerializable"></a>

## isJsonSerializable()
Checks if an object is json serializable

**Kind**: global function  
<a name="isJsonSerializer"></a>

## isJsonSerializer()
Checks if an object is a json serializer

**Kind**: global function  
