#!/usr/bin/env node

/**
 * reflect-yourself installer for npm/npx
 * Installs the skill to ~/.cursor/skills/ for global availability
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const DEST_DIR = path.join(os.homedir(), '.cursor', 'skills-cursor', 'reflect-yourself');
const QUEUE_FILE = path.join(os.homedir(), '.cursor', 'reflect-queue.json');

// Get the package root (parent of bin/)
const PKG_ROOT = path.join(__dirname, '..');

console.log('');
console.log('reflect-yourself installer');
console.log('==========================');
console.log('');

// Create destination directories
const dirs = [
    DEST_DIR,
    path.join(DEST_DIR, 'commands'),
    path.join(DEST_DIR, 'rules')
];

dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// Files to copy
const files = [
    { src: 'SKILL.md', dest: 'SKILL.md' },
    { src: 'commands/reflect-yourself.md', dest: 'commands/reflect-yourself.md' },
    { src: 'commands/reflect-yourself-skills.md', dest: 'commands/reflect-yourself-skills.md' },
    { src: 'commands/reflect-yourself-queue.md', dest: 'commands/reflect-yourself-queue.md' },
    { src: 'commands/reflect-yourself-skip.md', dest: 'commands/reflect-yourself-skip.md' },
    { src: 'rules/session-reflect.mdc', dest: 'rules/session-reflect.mdc' }
];

console.log('Installing files...');

files.forEach(file => {
    const srcPath = path.join(PKG_ROOT, file.src);
    const destPath = path.join(DEST_DIR, file.dest);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  ✓ ${file.dest}`);
    } else {
        console.error(`  ✗ ${file.src} not found`);
    }
});

// Create empty queue file if it doesn't exist
if (!fs.existsSync(QUEUE_FILE)) {
    fs.writeFileSync(QUEUE_FILE, JSON.stringify({ version: 1, learnings: [] }, null, 2));
    console.log(`  ✓ Created queue file`);
}

console.log('');
console.log(`Installed to ${DEST_DIR}`);
console.log('');
console.log('The skill is now available in ALL your Cursor projects.');
console.log('');
console.log('Commands:');
console.log('  /reflect-yourself        - Capture learnings from session');
console.log('  /reflect-yourself-skills - Discover skill patterns');
console.log('  /reflect-yourself-queue  - View pending learnings');
console.log('  /reflect-yourself-skip   - Clear the queue');
console.log('');
console.log('Run /reflect-yourself at the end of your sessions!');
console.log('');
