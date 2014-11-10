/*
The MIT License (MIT)

Copyright (c) 2014 Jonathan Giroux (Bloutiouf)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/**
 * Tetris Random Number Generator
 *
 * Generate random number where least recently popped numbers have higher
 * chances of popping out.
 *
 * Actually work with any kind of object, not only with numbers.
 *
 * The name comes from the game Tetris, where the probability of appearance of
 * pieces follow more or less this distribution. 
 *
 * @constructor
 * @param {number} decrease Reduction of probability for each item, in ]0, 1]
 *     (1 means history plays no role, so it's not useful).
 * @param {?number} random Underlying RNG in [0, 1[ (default is Math.random).
 */
function TetrisRNG(decrease, random) {
	this.decrease = decrease;
	this._random = random || Math.random;
	this.items = [];
}

/**
 * Add an item that later can be returned by `random`. It may be a number or any
 * other object. Returns the number of items.
 * 
 * The more recently an item has been added, the least recently chosen it is
 * supposed to be, therefore the more chances it has to be returned by a next
 * call to `random`. Call `shuffle` if it's not the case, for instance when
 * initializing the RNG.
 *
 * @param {Object} item
 * @param {?number} n probability factor, for instance if you want that a given
 *     item has twice chances to pop out, set n to 2 (default is 1).
 */
TetrisRNG.prototype.add = function(item, n) {
	return this.items.unshift([item, n || 1]);
};

/**
 * Remove all items.
 */
TetrisRNG.prototype.clear = function() {
	this.items = [];
};

/**
 * Remove item.
 * @param {Object} item
 * @return {boolean} true if item was found (and removed), false otherwise.
 */
TetrisRNG.prototype.remove = function(item) {
	for (var i = 0, n = this.items.length; i < n; ++i)
		if (this.items[i][0] === item) {
			this.items.splice(i, 1);
			return true;
		}
	return false;
};

/**
 * Return a random item.
 */
TetrisRNG.prototype.random = function() {
	var roulette = [];
	var ratio = 1;
	var total = 0;
	for (var i = 0, n = this.items.length; i < n; ++i) {
		total += this.items[i][1] * ratio;
		ratio *= this.decrease;
		roulette.push([this.items[i][0], total]);
	}
	
	var r = this._random() * total;
	for (var i = 0; i < n; ++i) {
		if (roulette[i][1] > r) {
			this.items.push.apply(this.items, this.items.splice(i, 1));
			return roulette[i][0];
		}
	}
};

/**
 * Shuffle items in the LRU history.
 */
TetrisRNG.prototype.shuffle = function() {
	for (var i = this.items.length - 1; i > 0; --i) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = this.items[i];
		this.items[i] = this.items[j];
		this.items[j] = temp;
	}
};
