var test = require('tape');

test('arrow function', function(t){
    t.plan(1);

    var foo = x => x+5;

    t.equal(foo(1), 6);
});

test('arrow function with object-literal', function(t){
    t.plan(1);

    /*
        Fails because it parses the curlys as the fn body..
    */

    var x = 10,
        foo = x => {x},
        expected = {x};

    t.notDeepEqual(foo(x), expected);
});

test('arrow function with object-literal and curley body', function(t){
    t.plan(1);

    /*
        Still fails because when you use curlys you lose implicit return.
    */

    var x = 10,
        foo = x => {{x}},
        expected = {x};

    t.notDeepEqual(foo(x), expected);
});

test('arrow function with object-literal and curley body and return', function(t){
    t.plan(1);

    var x = 10,
        foo = x => {return {x}},
        expected = {x};

    t.deepEqual(foo(x), expected);
});