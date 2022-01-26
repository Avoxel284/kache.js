// kache.js - Avoxel284
// A really simple module used to cache items for code optimization

const fs = require("fs");

const _debug = false; // Toggle debug
const _doubleOnExternal = true; // Create an external JSON file with the exposed cache?
const _kachepath = ".kache/kache.json"; // If so, where to store this file?

/* ------------------------------------------------------------------------------------------------------------ */

if (_doubleOnExternal)
	fs.writeFile(_kachepath, "{}", (e) => {
		if (e) console.log(e);
	});

/**
 * Exposed cache
 */
exports.cache = {};

/**
 * Get statistics about your kache
 */
exports.stats = () => {
	return {
		/** Kache external JSON file size in bytes */
		KACHE_FILE_SIZE: _doubleOnExternal ? fs.stat(_kachepath).size : 0,
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
		fs.writeFile(_kachepath, JSON.stringify(exports.cache), (e) => {
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

// Shorthands
exports.s = exports.store;
exports.r = exports.retrieve;
