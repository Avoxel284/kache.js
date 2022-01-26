// kache.js - Avoxel284
// A really simple module used to cache items for code optimization

const fs = require("fs");

const _debug = false; // Toggle debug
const _doubleOnExternal = true; // Create an external JSON file with the exposed cache?
const _kachePath = ".kache/kache.json"; // If so, where to store this file?

/* ------------------------------------------------------------------------------------------------------------ */

if (_doubleOnExternal)
	fs.writeFile(_kachePath, "{}", (e) => {
		if (e) console.log(e);
	});

/**
 * Direct access to the exposed cache
 */
exports.cache = {};

/**
 * Get statistics about your kache
 */
exports.stats = () => {
	return {
		/** Kache external JSON file size in bytes */
		KACHE_FILE_SIZE: _doubleOnExternal ? fs.stat(_kachePath).size : 0,
		/** Amount of items stored */
		KACHE_ITEMS_STORED: Object.keys(exports.cache).length,
	};
};

/**
 * Stores an item in the cache
 *
 * @param k Key to index the cache
 * @param v Value to enter in cache
 */
exports.store = (k, v) => {
	if (!exports.cache[k] && _debug) console.log("kache.js // Overwriting value");
	exports.cache[k] = v;

	if (_doubleOnExternal)
		fs.writeFile(_kachePath, JSON.stringify(exports.cache), (e) => {
			if (e) console.log(e);
		});
};

/**
 * Retrieves an item from the cache
 *
 * @param k Key to index the cache
 * @returns Value found
 * @example
 * ```
 * let foo = kache.r(bar) || getfoo(bar)
 * ```
 */
exports.retrieve = (k) => {
	if (_debug) console.log(`kache.js // Retrieving value with key: ${k}`, exports.cache[k]);
	return exports.cache[k];
};

/**
 * A function that basically just makes your code shorter and life easier.
 *
 * @param {Function} retrieverFunc The retriever function that returns a value. Can be async or not, I'll wait.
 * @param {String} key Key to store the retrieved stuff under
 */
exports.allInOne = async (retrieverFunc, key) => {
	if (exports.cache[key]) return exports.cache[key];
	try {
		let value = await retrieverFunc;
		exports.cache[key] = value;
		return value;
	} catch (e) {
		console.error(e);
		return null;
	}
};

// Shorthands
exports.s = exports.store;
exports.r = exports.retrieve;
exports.a = exports.allInOne();
