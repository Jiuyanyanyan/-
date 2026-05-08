const fs = require('fs');
const path = require('path');
const https = require('https');
const zlib = require('zlib');

const pkg = require('./package.json');
const dependencies = { ...pkg.dependencies, ...pkg.devDependencies };

console.log('Installing dependencies...');

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

function extractTarball(tarballPath, destDir) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(tarballPath)
      .pipe(zlib.createUnzip())
      .on('data', (chunk) => {
      })
      .on('end', () => {
        resolve();
      })
      .on('error', reject);
  });
}

async function install() {
  const nodeModulesDir = path.join(__dirname, 'node_modules');
  if (!fs.existsSync(nodeModulesDir)) {
    fs.mkdirSync(nodeModulesDir, { recursive: true });
  }

  const depsList = [
    { name: 'react', version: '18.2.0' },
    { name: 'react-dom', version: '18.2.0' },
    { name: 'next', version: '14.2.1' },
    { name: 'typescript', version: '5.4.5' },
    { name: 'tailwindcss', version: '3.4.1' },
    { name: 'postcss', version: '8.4.35' },
    { name: 'autoprefixer', version: '10.4.18' },
    { name: '@types/react', version: '18.2.74' },
    { name: '@types/react-dom', version: '18.2.24' },
    { name: '@types/node', version: '20.12.7' },
    { name: 'eslint', version: '8.57.0' },
    { name: 'eslint-config-next', version: '14.2.1' },
  ];

  for (const dep of depsList) {
    console.log('Installing ' + dep.name + '@' + dep.version + '...');
    try {
      const tarballUrl = 'https://registry.npmjs.org/' + dep.name + '/-/' + dep.name + '-' + dep.version + '.tgz';
      const tempDir = path.join(__dirname, 'temp_' + dep.name);
      const tarballPath = path.join(tempDir, dep.name + '.tgz');
      const destDir = path.join(nodeModulesDir, dep.name);

      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      await downloadFile(tarballUrl, tarballPath);

      const cp = require('child_process');
      if (process.platform === 'win32') {
        cp.execSync('powershell -Command "Expand-Archive -Path ' + tarballPath + ' -DestinationPath ' + tempDir + '"');
      }

      const packageDir = path.join(tempDir, 'package');
      if (fs.existsSync(packageDir)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        copyDir(packageDir, destDir);
      }

      fs.rmSync(tempDir, { recursive: true, force: true });
      console.log('Installed ' + dep.name);
    } catch (err) {
      console.error('Failed to install ' + dep.name + ':', err.message);
    }
  }
  console.log('Installation complete!');
}

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const files = fs.readdirSync(src);
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

install();
