/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const config = require('../../config');

// This swaps us to the test database for running test.
// TODO: Fix up configuration between different environments. Maybe use the config npm package.

config.database = {
	user: process.env.OED_DB_TEST_USER || process.env.OED_DB_USER,
	database: process.env.OED_DB_TEST_DATABASE,
	password: process.env.OED_DB_TEST_PASSWORD || process.env.OED_DB_PASSWORD,
	host: process.env.OED_DB_TEST_HOST || process.env.OED_DB_HOST,
	port: process.env.OED_DB_TEST_PORT || process.env.OED_DB_PORT
};

const { db, createSchema } = require('../../models/database');

async function recreateDB() {
	await db.none('DROP TABLE IF EXISTS readings');
	await db.none('DROP TABLE IF EXISTS meters');
	await db.none('DROP TABLE IF EXISTS users');
	await db.none('DROP TABLE IF EXISTS preferences');
	await db.none('DROP TYPE IF EXISTS meter_type');
	await db.none('DROP TYPE IF EXISTS graph_type');
	await db.none('DROP FUNCTION IF EXISTS compressed_readings(INTEGER[], TIMESTAMP, TIMESTAMP, INTEGER);');
	await db.none('DROP FUNCTION IF EXISTS barchart_readings(INTEGER[], INTERVAL, TIMESTAMP, TIMESTAMP);');
	await createSchema();
}

module.exports.recreateDB = recreateDB;
