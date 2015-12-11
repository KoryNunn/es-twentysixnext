var test = require('tape');

test('literal', function(t){
    t.plan(1);

    function foo(){}

    var x = {foo};

    t.deepEqual(x, {foo: foo});
});

test('literal get', function(t){
    t.plan(1);

    function get(){}

    var x = {get}; // throws in node v4/5

    t.deepEqual(x, {get: get});
});