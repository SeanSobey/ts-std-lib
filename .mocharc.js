//@ts-check
'use strict';

// https://mochajs.org/#command-line-usage

/**@type {import('mocha').MochaOptions}*/
module.exports = {
	allowUncaught: false,
	bail: false,
	require: [
		'source-map-support/register',
	],
	timeout: 50000,
};
