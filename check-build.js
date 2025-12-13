// Script to check if build directory exists after build
const fs = require('fs');
const path = require('path');

const possiblePaths = [
  path.join(__dirname, 'frontend/build'),
  path.join(process.cwd(), 'frontend/build'),
  path.join(process.cwd(), 'build'),
];

console.log('Checking for build directory...');
console.log('Current working directory:', process.cwd());
console.log('__dirname:', __dirname);

let found = false;
for (const buildPath of possiblePaths) {
  console.log(`\nChecking: ${buildPath}`);
  if (fs.existsSync(buildPath)) {
    console.log('✅ EXISTS');
    if (fs.existsSync(path.join(buildPath, 'index.html'))) {
      console.log('✅ index.html found');
      found = true;
      break;
    } else {
      console.log('❌ index.html NOT found');
    }
  } else {
    console.log('❌ NOT FOUND');
  }
}

if (!found) {
  console.log('\n❌ Build directory not found!');
  process.exit(1);
} else {
  console.log('\n✅ Build directory found!');
  process.exit(0);
}



