# es-twentynextsixbabel

Warning: contains both facts and opinions about es-whateverthefuck.

Many things taken from here: https://github.com/lukehoban/es6features

# arrows

## What

Shorthand functions, implicit returns^

```
[1, 2, 3].map(x => x * 2) // -> [2, 4, 6]
```

Also doesn't bind scope...

## Why

People don't like hitting lots of keys.
People don't like thinking about `this`

## The good

Great for little throw-away-style expressions.
Great in functional style code eg:

```
var names = arrayOfPeople.map(person => person.name);
```

## The bad.

There are many forms:

No braces:
```
x => x + 1
```

some braces:
```
(x, y) => x + y
```

some other braces:
```
x => { x+= 20; return x.toString(); }
```

tuns-o-braces:
```
(x, y) => { x += y; return x.toString(); }
```

## The Ugly

### So many versions

^: Implicit returns, unless you use curly braces, obviously.
```
var doThing1 = x => x;

doThing1(10); // -> 10

var doThing2 = x => {x};

doThing2(10); // -> undefined

var doThing3 = (x) => {x};

doThing3(10); // -> undefined

var doThing4 = (x) => x;

doThing4(10); // -> 10

var doThing5 = (x) => {return x};

doThing5(10); // -> 10

var doThing5 = x => return x; // -> Uncaught SyntaxError: Unexpected token return
```

### Plays well with other es-sinex15 features

Say I have a value, and I want to turn that into an object like so:
```
{
    x: x
}
```

You can do this in es-sinex15 like so:

```
{x} // -> {x: x}
```

Cool! let's throw in some arrow functions:

```
[1, 2, 3].map(x => {x}) // -> [undefined, undefined, undefined]
```

Awesome. Wrap it in another layer of braces then..

```
[1, 2, 3].map(x => {{x}}) // -> [undefined, undefined, undefined]
```

Oh right, no implicit returns anymore..

```
[1, 2, 3].map(x => {return {x}}) // -> [{x: 1}, {x: 2}, {x: 3}]
```

Nice..

# classes

I can't. No. Just don't.

# enhanced object literals

## What

Allows you to construct objects a bit nicer:

```
var x = 10;

var obj = {x};

obj // -> {x: 10};
```

Also now supports computed properties:

```
var value = 'World',
    obj = {
        ['hello' + value]: value
    };

obj // -> {helloWorld: 'World'}
```

## The good

Being able to make objects without repeating yourself is quite handy,
and being able to create computed properties without using `[someKey]` is pretty good too.

```
function createPerson(firstName, surname, age){
    return {firstName, surname, age};
}
```

## The Bad

Functionally, there is nothing bad about these features

## The ugly

WHY DID THEY USE SQUARE BRACES FOR COMPUTED PROPERTIES!?

If only there was an existing way to say 'Do this first', OH WAIT!

Also get's a little confusing when you mix'n'match:

```
{x: 'majigger', y, z}
```

```
// Calculate 5 + 6 first.
var x = (5 + 6) * 10;
```

Wouldn't that have been nicer?

```
{
    // CALCULATE THIS: THEN ASSIGN THIS!
    ('hello' + value): value
}
```

# template strings

## What

Exactly what you'd expect. Template values into a string.

Oh but also just jam multiline support together with it because.


```
var myString = `Hello world,
Hey look multiline! Also, lets pull ${anything} from scope`;

```

## The good

Umm.. I guess multiline is cool? oh but wait..

## The bad

Why do template strings even exist?
Let's write a function that implements template strings,
with the added bonus of the string not pulling random crap from scope:

```
function template(string, scope){
    return string.replace(/\{(.+?)\}/g, (match, key) => key in scope ? scope[key], match);
}

var world = 'planet';

template('Hello {world}', {world}) // -> 'Hello planet'
```

Wow I can see why that's a language feature..

Also, you can't put the template in a variable and use it later, since it immediately evaluates.

Also, using your own function means that you can decide what your token syntax is.

## The ugly

How do you do multiline when you're in a non-whitespace-sensitive language? Badly! :D

```
var greeting = `Hello!
    How are you today?`

greeting // -> "Hello!\n    How are you today?"
```

Yeah so if you're in a block, just mess everything up:

```
function foo(){

    function bar(){
        return `my
cool
multi
line
string`;
    }

}
```

Nice...........

# destructuring

Assign values to variables out of objects using pattern matching.

```
function tellAge(person){
    var {firstName, age} = person;

    return template('Hi {firstName}, you are {age}');
}

tellAge({
    firstName: 'Jill',
    age: 60
});
// -> 'Hi Jill, you are 60'
```

## The good

Everything. This is a good feature.

## The Bad

Can't see any issues

## The ugly

Its power may lead to mess, since you can do deep matching (which is also cool)

```
var {foo: {bar: {baz: {x: x}}}} = obj;
```

# default + rest + spread

## What

Defaults:

```
function foo(x=10){
    return x;
}

foo(5) // -> 5
foo() // -> 10
```

Rest:

```
function foo(a, b, c...){
    return a + b + c.join(' ');
}

foo('a', 'b', 'c', 'd', 'e', 'f') // -> 'abcdef'
```

Spread:

```
function add(a, b){
    return a + b;
}

add(1, 2) // -> 3

var values = [3, 4];
add(...values) // -> 7
```

## The good

Again, this stuff is excelent. These are features that you can't trivially implement with plain javascript.

## The ugly

Can't think of anything.

# let + const

UUuuuuguhhh.

`let`: block scoped `var`
`const` `let` but you can't assing to it twice.

## The good

Um.. I guess if you aren't used to lexical scoping..?

## The bad

let is just var but block-scoped. Rather than spending 20s to learn how JS works, let's add syntax.

## The ugly

Attempting to assign a value to a const after declaration silently fails,
but returns the value you attempted to assign.

```
const x = 10; // -> 10

x = 20; // -> 20

x; // -> 10
```

Declairing a const without immediately assigning a value results in `undefined` as expected,
which is effectivly totally pointless.

```
const x; -> undefined, forever. Pointless.
```

# iterators + for..of

## What
Allows for custom implementation of iterators.

I haven't looked too far into these, but they look ok so far.

# The good, bad, ugly

Sorry, I'm lazy, you'll have to find out for yourself :)

# generators

## What

Used in languages that don't have first-class functions to return a different value each time the function is called.

## The good

???

## The bad

This is just pointless sugar. You can implement the functionality of generators trivially in ES3.

Stolen directly from https://github.com/lukehoban/es6features

Fibonacci with generators:

```
var fibonacci = {
  [Symbol.iterator]: function*() {
    var pre = 0, cur = 1;
    for (;;) {
      var temp = pre;
      pre = cur;
      cur += temp;
      yield cur;
    }
  }
}
```

The same shit without generators:

```
var fibonacci = function(){
  [Symbol.iterator]() {
    let pre = 0, cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur }
      }
    }
  }
}
```

Same length, same functionality, why bother.

## The ugly

They exist.

# unicode

There is new unicode support. Seems fine, I'm lazy, ¯\\_(ツ)_/¯

# modules

## What

Like `require()` but hard-baked into the language, and using `import` and `export` instead.

someModule.js
```
export function foo(){
    return 'bar';
}
```

anotherModule.js
```
import foo from 'someModule.js';

foo() // -> 'bar';
```

## The good

???

## The bad

It's the same as require but with quirks. You can do all the destructiong with, supprise, destructuring.

## The ugly

Nothing super bad that I know of.

# module loaders

Kinda ties in with the above stuff, allows you to screw with the module cache.
I'm going to ¯\\_(ツ)_/¯ this one too.

# map + set + weakmap + weakset

## What

Map: `key: value` where `key` can be any value at all, including objects/functions.
Set: Distinct list of any value. Can be itterated over.
WeakMap: `key: value` where `key` must be an instance of an object (or function). References are weakly held.
WeakSet: Distinct list of references. Cannot be itterated over, only checked if it contains a value.

Too much to go into in this talk.

## The good

These are great additions to JS, they cannot be implemented in ES3, and are non-trivial to implement in ES5, and polyfills are slow.

Weak(map/set) are especially excelent, and open up a whole range of options that were previously impossible/impractical.

## The bad

Nothing really, safari doesn't implement iterators correctly? Not really a fault of the spec.

## The ugly

Nothing.

# proxies

## What

Literally proxy an object, and have control over what gets done to it:

```
var obj = {};

var proxy = new Proxy(obj, {
        get: function(target, propertyName){
            return propertyName in obj ? obj[propertyName] : 'Never set!';
        },
        set: function(target, propertyName, value){
            obj[propertyName] = value;
        }
    });
```

Opens up the ability to create some nice apis:

```
var crel = new Proxy(actualCrel, {
    get: function(target, propertyName){
        return target.bind(target, propertyName);
    }
})

crel('div', {class: 'foo'}); // -> <div class="foo"></div>
crel.div({class: 'foo'}); // -> <div class="foo"></div>
```

# symbols

## What

like magical private strings that allow access to a property if you have the symbol

```
var mySymbol = Symbol('arbitraryString');

var obj = {};

obj[mySymbol] = 'foo';

// Can only be accessed if you have the instance of the symbol
obj[mySymbol]; // -> 'foo'


// Creating a new symbol with the same string will not work
obj[Symbol('arbitraryString')]; // -> undefined
```

## The good

I'm not sure if these are really that useful. Maybe? You can do pretty much the same thing with WeakMap's and objects.

Symbols are a little neater I guess

## The bad

They are mostly sugar, but do add some legitimacy around privitized properties.

## The ugly

Nothing really.

# subclassable built-ins

## What

You can now create constructors with Array/Date/Element prototypes

## The good

This is an actual feature. This was previosuly hard/impossible to do properly.

## The bad

Seems mostly good.

## The ugly

There is a `@@create` property. It exists for a reason, but it's just ugly.

# promises

## What

Just callbacks but with crap around them to make sure you have no idea where an error came from.

## The good

I honestly have never come across any situation where promises have looked like a good solution.

## The bad.

** BEGIN RANT **

## The ugly

** CONTINUE RANT **

# math + number + string + array + object APIs

## What

There are new Math.x functions, like EPSILON, acosh, imul, hypot, isInteger, etc..

## The good

All looks good to me!

# binary and octal literals

## They exist now:

```
0b111110111 === 503 // true
0o767 === 503 // true
```

# tail calls

## What

They work in certian situations now without adding stack.

They seem fine.