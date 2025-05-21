#! /usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get the target app from command line argument
const targetApp = process.argv[2];
const envFile = process.argv[3];

if (!targetApp) {
	console.error(
		'❌ Please specify the target app (e.g., tenant-portal, landlord-portal, admin-portal)',
	);
	process.exit(1);
}
// Define the apps directory path
const appsDir = path.resolve(__dirname, '../apps');
// Load environment variables
if (envFile) {
	require('dotenv').config({ path: envFile });
} else {
	// Load environment variables from the app's .env file
	const appEnvPath = path.resolve(appsDir, targetApp, '.env');
	if (fs.existsSync(appEnvPath)) {
		require('dotenv').config({ path: appEnvPath });
	} else{
        require('dotenv').config();
    }
}

// read package.json
const pkgPath = path.resolve(appsDir, targetApp, 'package.json');

// Check if the package.json exists
if (!fs.existsSync(pkgPath)) {
	console.error(`❌ Package.json not found for app: ${targetApp}`);
	console.error(`Expected path: ${pkgPath}`);
	process.exit(1);
}
try {
	// read package.json
	const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

	// compute new version string: YYYY.MM.DD.build
	const now = new Date();
	const datePart = now.toISOString().slice(0, 10).replace(/-/g, '.');

	const buildNum = process.env.BUILD_NUMBER || '0';
	pkg.version = `${datePart}.${buildNum}`;

	// write it back to package.json
	fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
	console.log(`📦 Updated version for ${targetApp} to: ${pkg.version}`);
} catch (error) {
	console.error(`❌ Error updating version for ${targetApp}:`, error.message);
	process.exit(1);
}
