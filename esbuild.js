const { build } = require('esbuild');
const glob = require('glob');
const path = require('path');
const esBuildPluginTsc = require('esbuild-plugin-tsc');
const tsconfig = path.join(__dirname, './tsconfig.json');

const entryPoints = glob.sync('src/**/main.ts');

build({
  entryPoints: entryPoints,
  outdir: './dist',
  platform: 'node',
  bundle: true,
  minify: true,
  plugins: [
    esBuildPluginTsc({
      force: true,
      tsconfigPath: tsconfig
    })
  ],
  external: [
    'class-transformer',
    '@nestjs/websockets/socket-module',
    '@nestjs/microservices',
    'class-validator'
  ]
})
  .then(() => {
    console.log('Build succeeded!');
  })
  .catch(() => {
    console.error('Build failed!');
  });
