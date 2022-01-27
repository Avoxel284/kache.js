// kache.js - Avoxel284
// A really simple module used to cache items for code optimization

require("dotenv").config();

const fs = require("fs");
const path = require("path");

const _debug = false;
let _kacheFilePath = process.env["KACHE_PATH"];

if (_kacheFilePath != null) {
	_kacheFilePath = path.join(process.cwd(), _kacheFilePath);
	if (_debug) console.log(`Creating kache directory: ${_kacheFilePath}`);
	fs.mkdir(_kacheFilePath, { recursive: true }, () => {});
	_kacheFilePath = path.join(_kacheFilePath, "kache.json");
	fs.writeFileSync(_kacheFilePath, "{}");
}

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
		FILE_SIZE: _kacheFilePath ? fs.statSync(_kacheFilePath).size : 0,
		/** Amount of items stored */
		ITEMS_STORED: Object.keys(exports.cache).length,
	};
};

/**
 * Stores an item in the cache
 *
 * @param {String} key Key to index the cache
 * @param {any} value Value to enter in cache
 */
exports.store = (key, value) => {
	key = key.toString();
	if (!exports.cache[key] && _debug) console.log("kache.js // Overwriting value");
	exports.cache[key] = value;
	if (_kacheFilePath) fs.writeFileSync(_kacheFilePath, JSON.stringify(exports.cache));
	return value;
};

/**
 * Retrieves an item from the cache
 *
 * @example
 * ```
 * let foo = kache.r(bar) || getfoo(bar)
 * ```
 *
 * @param {String} key Key to index the cache
 */
exports.retrieve = (key) => {
	if (_debug) console.log(`kache.js // Retrieving value with key: ${key}`, exports.cache[key]);
	return exports.cache[key];
};

/**
 * An function that basically just makes your code shorter and life easier.
 *
 * @async Asynchronous function due the the nature that some retriever functions may be asynchronous
 * @param {String} key Key to store the retrieved stuff under
 * @param {Function} retrieverFunc The retriever function that returns a value. Can be async or not, I'll wait.
 * @param {any} args Arguments to be passed to the retriver function (if any)
 */
exports.allInOne = async (key, retrieverFunc, ...args) => {
	// The retriever function will be run when calling this function.
	// Therefore, retrieverFunc will be any values returned.
	key = key.toString();
	if (exports.cache[key]) return exports.cache[key];
	try {
		const value = await retrieverFunc(...args);
		if (_debug) console.log("kache.js // Using retriever function");
		console.log(key, value);
		exports.store(key, value);
		return value;
	} catch (e) {
		console.error(e);
		return null;
	}
};

// Shorthands
exports.s = exports.store;
exports.r = exports.retrieve;
exports.a = exports.allInOne;
