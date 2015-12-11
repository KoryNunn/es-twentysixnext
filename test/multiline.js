var test = require('tape');

test('multiline spacing with nice formatting', function(t){
    t.plan(1);

    var multilineString =
        `Hello
        world, Isn't this just the best?

        I can see why this is a useful feature..`


    var normalString = [
            "Hello",
            "world, Isn't this just the best?",
            "",
            "I can see why this is a useful feature.."
        ].join('\n');

    t.notEqual(multilineString, normalString);

});


test('multiline spacing with terrible formatting', function(t){
    t.plan(1);

    var multilineString =
        `Hello
world, Isn't this just the best?

I can see why this is a useful feature..`


    var normalString = [
            "Hello",
            "world, Isn't this just the best?",
            "",
            "I can see why this is a useful feature.."
        ].join('\n');

    t.equal(multilineString, normalString);

});

var template = (string, scope) => string.replace(/\$\{(.+?)\}/g, (match, key) => scope[key]);

test('multiline cant even template', function(t){
    t.plan(1);

    var notRealyATemplate = `Hello ${world}`,
        aTemplate = "Hello ${world}";

    var world = 'World';

    var expected = template(aTemplate, {world});

    var actual = notRealyATemplate; // uhh.. screwed! Can't template, because it's already resolved!

    t.notEqual(actual, expected);

});