Tetris Random Number Generator
==============================

Generate random number where least recently popped numbers have higher chances of popping out.

Actually work with any kind of object, not only with numbers.

The name comes from the game Tetris, where the probability of appearance of pieces follow more or less this distribution. 

Usage
-----

### new TetrisRNG(decrease [, random])
	
`decrease`: reduction of probability for each item, in ]0, 1] (1 means history plays no role, so it's not useful). 

`random`: underlying RNG in [0, 1[ (default is `Math.random`).

### .add(item [, n])

Add an item that later can be returned by `random`. It may be a number or any other object. Returns the number of items.

`n`: probability factor, for instance if you want that a given item has twice chances to pop out, set n to 2 (default is 1).

The more recently an item has been added, the least recently chosen it is supposed to be, therefore the more chances it has to be returned by a next call to `random`. Call `shuffle` if it's not the case, for instance when initializing the RNG.

### .clear()

Remove all items.

### .remove(item)

Remove `item`. Returns `true` if item was found (and removed), `false` otherwise.

### .random()

Return a random item.

### .shuffle()

Shuffle items in the LRU history.

License
-------

Copyright (c) 2014 Jonathan Giroux (Bloutiouf)

Licensed under [MIT License](http://opensource.org/licenses/MIT).