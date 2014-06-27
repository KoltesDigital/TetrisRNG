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

function TetrisRNG(decrease, random) {
	this.decrease = decrease;
	this._random = random || Math.random;
	this.items = [];
}

TetrisRNG.prototype.add = function(item, n) {
		return this.items.unshift([item, n || 1]);
};

TetrisRNG.prototype.clear = function() {
	this.items = [];
};

TetrisRNG.prototype.remove = function(item) {
	for (var i = 0, n = this.items.length; i < n; ++i)
		if (this.items[i][0] === item) {
			this.items.splice(i, 1);
			return true;
		}
	return false;
};

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

TetrisRNG.prototype.shuffle = function() {
	for (var i = this.items.length - 1; i > 0; --i) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = this.items[i];
		this.items[i] = this.items[j];
		this.items[j] = temp;
	}
};
