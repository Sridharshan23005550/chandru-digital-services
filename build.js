const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(command, cwd) {
    console.log(`\n🚀 Running: ${command} in ${cwd || 'root'}`);
    try {
        execSync(command, { stdio: 'inherit', cwd });
    } catch (error) {
        console.error(`\n❌ Error executing ${command}:`, error.message);
        process.exit(1);
    }
}

const rootDir = process.cwd();
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');

console.log('🛠️ Starting Full-Stack Build Process...');

// 1. Install root dependencies (like concurrently)
run('npm install', rootDir);

// 2. Install backend dependencies
if (fs.existsSync(backendDir)) {
    run('npm install', backendDir);
}

// 3. Install frontend dependencies and build
if (fs.existsSync(frontendDir)) {
    run('npm install', frontendDir);
    run('npm run build', frontendDir);

    // Verify build output
    const distPath = path.join(frontendDir, 'dist');
    const buildPath = path.join(frontendDir, 'build');

    if (fs.existsSync(path.join(distPath, 'index.html'))) {
        console.log('\n✅ Frontend build successful (dist folder)');
    } else if (fs.existsSync(path.join(buildPath, 'index.html'))) {
        console.log('\n✅ Frontend build successful (build folder)');
    } else {
        console.error('\n❌ Frontend build failed: No index.html found in dist or build folders.');
        process.exit(1);
    }
} else {
    console.error('\n❌ Frontend directory not found!');
    process.exit(1);
}

console.log('\n✨ Build process completed successfully!');
