class HashMap {
	constructor(initialCapacity = 8) {
		this.length = 0;
		this._slots = [];
		this._capacity = initialCapacity;
		this._deleted = 0;
	}

	get(key) {
		const index = this._findSlot(key);
		if (this._slots[index] === undefined) {
			throw new Error('Key error');
		}
		return this._slots[index].value;
	}

	set(key, value) {
		const loadRatio = (this.length + this._deleted + 1) / this._capacity;
		if (loadRatio > HashMap.MAX_LOAD_RATIO) {
			this._resize(this._capacity * HashMap.SIZE_RATIO);
		}

		const index = this._findSlot(key);

		if (this._slots[index]) {
			this._slots[index].next = {
				key,
				value,
				deleted: false
			};
		}
		this._slots[index] = {
			key,
			value,
			deleted: false
		};
		this.length++;
	}

	remove(key) {
		const index = this._findSlot(key);
		const slot = this._slots[index];
		if (slot === undefined) {
			throw new Error('Key error');
		}
		slot.deleted = true;
		this.length--;
		this._deleted++;
	}

	_findSlot(key) {
		const hash = HashMap._hashString(key);
		const start = hash % this._capacity;

		for (let i = start; i < start + this._capacity; i++) {
			const index = i % this._capacity;
			const slot = this._slots[index];
			if (slot === undefined || (slot.key == key && !slot.deleted)) {
				return index;
			}
		}
	}

	_resize(size) {
		const oldSlots = this._slots;
		this._capacity = size;
		// Reset the length - it will get rebuilt as you add the items back
		this.length = 0;
		this._deleted = 0;
		this._slots = [];

		for (const slot of oldSlots) {
			if (slot !== undefined && !slot.deleted) {
				this.set(slot.key, slot.value);
			}
		}
	}

	static _hashString(string) {
		let hash = 5381;
		for (let i = 0; i < string.length; i++) {
			hash = (hash << 5) + hash + string.charCodeAt(i);
			hash = hash & hash;
		}
		return hash >>> 0;
	}
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function checkPali(string) {
	let count = 1;
	const palindrome = new Map();
	for (let i = 0; i < string.length; i++) {
		if (palindrome.has(string[i], string[i])) {
			count++;
		} else {
			palindrome.set(string[i], string[i]);
			count--;
		}
	}
	if (count < 0) {
		return false;
	}
	return true;
}

const input = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

function anagrams(array) {
	const anagram = new Map();
	for (i = 0; i < array.length; i++) {
		let sum = 0;
		for (j = 0; j < array[i].length; j++) {
			sum += array[i].charCodeAt(j);
		}
		if (anagram.has(sum)) {
			anagram.set(sum, [array[i], ...anagram.get(sum)]);
		} else {
			anagram.set(sum, [array[i]]);
			console.log(anagram);
		}
		sum = 0;
	}
	return anagram;
}

console.log(anagrams(input));

function main() {
	const lotr = new Map();
	lotr.set('Hobbit', 'Bilbo');
	lotr.set('Hobbit', 'Frodo');
	lotr.set('Wizard', 'Gandolf');
	lotr.set('Human', 'Aragon');
	lotr.set('Elf', 'Legolas');
	lotr.set('Maiar', 'The Necromancer');
	lotr.set('Maiar', 'Sauron');
	lotr.set('RingBearer', 'Gollum');
	lotr.set('LadyofLight', 'Galadriel');
	lotr.set('HalfElven', 'Arwen');
	lotr.set('Ent', 'Treebeard');
	// console.log(lotr.get('Maiar'))

	const palindrome = new HashMap();
	palindrome.set('acecarr', 'racecar');
	palindrome.set('north', '?');

	console.log(palindrome);
}

// main();
// console.log(checkPali('acecarr'))
// console.log(checkPali('north'))
