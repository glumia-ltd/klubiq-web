#! /usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

const apps = ['tenant-portal', 'landlord-portal', 'admin-portal'];
const scriptPath = path.resolve(__dirname, 'generate-version.js');

apps.forEach(app => {
  try {
    console.log(`\n🔄 Updating version for ${app}...`);
    execSync(`node ${scriptPath} ${app}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Failed to update ${app}:`, error.message);
  }
});