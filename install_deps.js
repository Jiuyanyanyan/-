const fs = require('fs');
const path = require('path');
const https = require('https');
const { spawnSync } = require('child_process');

const deps = [
  { name: 'react', version: '18.2.0' },
  { name: 'react-dom', version: '18.2.0' },
  { name: 'next', version: '14.2.1' },
  { name: 'typescript', version: '5.4.5' },
  { name: 'tailwindcss', version: '3.4.1' },
  { name: 'postcss', version: '8.4.35' },
  { name: 'autoprefixer', version: '10.4.18' },
  { name: 'styled-jsx', version: '5.1.1' },
  { name: 'react-is', version: '18.2.0' },
];

const scopeDeps = [
  { scope: '@next', name: 'env', version: '14.2.1' },
  { scope: '@next', name: 'swc-win32-x64-msvc', version: '14.2.1' },
  { scope: '@swc', name: 'helpers', version: '0.5.1' },
];

const typeDeps = [
  { name: 'react', version: '18.2.74' },
  { name: 'react-dom', version: '18.2.24' },
  { name: 'node', version: '20.12.7' },
];

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', reject);
    }).on('error', reject);
  });
}

async function installDep(dep) {
  const { name, version } = dep;
  console.log(`Installing ${name}@${version}...`);
  
  const depDir = path.join(__dirname, 'node_modules', name);
  if (fs.existsSync(depDir)) {
    fs.rmSync(depDir, { recursive: true, force: true });
  }
  fs.mkdirSync(depDir, { recursive: true });
  
  const tgzPath = path.join(depDir, `${name}-${version}.tgz`);
  const url = `https://registry.npmjs.org/${name}/-/${name}-${version}.tgz`;
  
  await downloadFile(url, tgzPath);
  
  const result = spawnSync('tar', ['-xzf', tgzPath], { cwd: depDir });
  if (result.error) {
    throw result.error;
  }
  
  fs.unlinkSync(tgzPath);
  
  const packageDir = path.join(depDir, 'package');
  if (fs.existsSync(packageDir)) {
    const items = fs.readdirSync(packageDir);
    for (const item of items) {
      const src = path.join(packageDir, item);
      const dest = path.join(depDir, item);
      if (fs.existsSync(dest)) {
        if (fs.lstatSync(dest).isDirectory()) {
          fs.rmSync(dest, { recursive: true, force: true });
        } else {
          fs.unlinkSync(dest);
        }
      }
      try {
        fs.renameSync(src, dest);
      } catch {
        if (fs.lstatSync(src).isDirectory()) {
          copyDir(src, dest);
        } else {
          fs.copyFileSync(src, dest);
        }
        fs.rmSync(src, { recursive: true, force: true });
      }
    }
    fs.rmdirSync(packageDir, { recursive: true });
  }
  
  console.log(`Installed ${name}@${version}`);
}

async function installScopeDep(dep) {
  const { scope, name, version } = dep;
  console.log(`Installing ${scope}/${name}@${version}...`);
  
  const depDir = path.join(__dirname, 'node_modules', scope, name);
  if (fs.existsSync(depDir)) {
    fs.rmSync(depDir, { recursive: true, force: true });
  }
  fs.mkdirSync(depDir, { recursive: true });
  
  const tgzPath = path.join(depDir, `${name}-${version}.tgz`);
  const url = `https://registry.npmjs.org/${scope}/${name}/-/${name}-${version}.tgz`;
  
  await downloadFile(url, tgzPath);
  
  const result = spawnSync('tar', ['-xzf', tgzPath], { cwd: depDir });
  if (result.error) {
    throw result.error;
  }
  
  fs.unlinkSync(tgzPath);
  
  const packageDir = path.join(depDir, 'package');
  if (fs.existsSync(packageDir)) {
    const items = fs.readdirSync(packageDir);
    for (const item of items) {
      const src = path.join(packageDir, item);
      const dest = path.join(depDir, item);
      if (fs.existsSync(dest)) {
        if (fs.lstatSync(dest).isDirectory()) {
          fs.rmSync(dest, { recursive: true, force: true });
        } else {
          fs.unlinkSync(dest);
        }
      }
      try {
        fs.renameSync(src, dest);
      } catch {
        if (fs.lstatSync(src).isDirectory()) {
          copyDir(src, dest);
        } else {
          fs.copyFileSync(src, dest);
        }
        fs.rmSync(src, { recursive: true, force: true });
      }
    }
    fs.rmdirSync(packageDir, { recursive: true });
  }
  
  console.log(`Installed ${scope}/${name}@${version}`);
}

async function installTypeDep(dep) {
  const { name, version } = dep;
  console.log(`Installing @types/${name}@${version}...`);
  
  const depDir = path.join(__dirname, 'node_modules', '@types', name);
  if (fs.existsSync(depDir)) {
    fs.rmSync(depDir, { recursive: true, force: true });
  }
  fs.mkdirSync(depDir, { recursive: true });
  
  const tgzPath = path.join(depDir, `${name}-${version}.tgz`);
  const url = `https://registry.npmjs.org/@types/${name}/-/${name}-${version}.tgz`;
  
  await downloadFile(url, tgzPath);
  
  const result = spawnSync('tar', ['-xzf', tgzPath], { cwd: depDir });
  if (result.error) {
    throw result.error;
  }
  
  fs.unlinkSync(tgzPath);
  
  const packageDir = path.join(depDir, 'package');
  if (fs.existsSync(packageDir)) {
    const items = fs.readdirSync(packageDir);
    for (const item of items) {
      const src = path.join(packageDir, item);
      const dest = path.join(depDir, item);
      if (fs.existsSync(dest)) {
        if (fs.lstatSync(dest).isDirectory()) {
          fs.rmSync(dest, { recursive: true, force: true });
        } else {
          fs.unlinkSync(dest);
        }
      }
      try {
        fs.renameSync(src, dest);
      } catch {
        if (fs.lstatSync(src).isDirectory()) {
          copyDir(src, dest);
        } else {
          fs.copyFileSync(src, dest);
        }
        fs.rmSync(src, { recursive: true, force: true });
      }
    }
    fs.rmdirSync(packageDir, { recursive: true });
  }
  
  console.log(`Installed @types/${name}@${version}`);
}

async function main() {
  try {
    const nodeModulesDir = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(nodeModulesDir)) {
      fs.mkdirSync(nodeModulesDir);
    }
    
    for (const dep of deps) {
      await installDep(dep);
    }
    
    for (const dep of scopeDeps) {
      await installScopeDep(dep);
    }
    
    for (const dep of typeDeps) {
      await installTypeDep(dep);
    }
    
    console.log('\nAll dependencies installed successfully!');
  } catch (error) {
    console.error('Error installing dependencies:', error);
    process.exit(1);
  }
}

main();
