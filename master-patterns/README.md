# Master Patterns

This is a collection of ideas for controlling your DOM-ready code on a mid-scale front-end site.

It uses the Garber-Irish DOM pattern, but here are my own patterns it includes so far:

## 1) jQuery Selector caching

Everyone hates uncached DOM selectors. Whilst the Garber-Irish solution is great for separation (and not having to check the length of a DOM selector all the time), it doesn't provide any global access to your jQuery DOM arrays.

It's quite likely that you'll want to share access to them from method to method. For example, run some global code using common#init; then perhaps access it again for the gallery.

So here's a simple idea. Add two new properties and one new method to your `SITE` object:

+ `selector_cache` -- An object to hold any previously cached selectors. (Probably should be "private", but doesn't really matter because SITE isn't designed to be accessed.)
+ `selectors` - a configuration object, holding your reference name against your class hook. I think this is great because it abstracts your primary class names and gives access them in a universal location.
+ `get` - a method that you essentially replace your $.fn selector calls with.

*(... I'm looking to take this idea further, by wrapping it with its likely jQuery plugins, as well as getter/setter methods for container objects or inner selectors.)*

## 2) Automatic Object-to-plugin bridging

By default, I like to use the Object-to-Plugin pattern here http://pastie.org/517177, which makes use of John Resig's Simple Inheritance library. 

But I've decided to make this less legwork on the bridge side, and have creating a quick loop to map any components inside of the `App.Components` namespace automatically to jQuery plugins (converting it to lowerCamelCase first). 

## 3) Inherited components > plugins

There's plenty to utilise on plugins once you start to inherit them. For example, take a look at the `options` object I created on the base Component. We can set-up useful default values which can ensure convention throughout your whole app.
