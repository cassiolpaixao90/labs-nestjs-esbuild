const { build } = require('esbuild');
const { esbuildDecorators } = require('@anatine/esbuild-decorators');

const isLocal = process.env.NODE_ENV === 'development';

(async () => {
  await build({
    platform: 'node',
    target: 'node14',
    bundle: true,
    sourcemap: isLocal ? true : false,
    external: [
      '@nestjs/microservices',
      '@nestjs/platform-express',
      'cache-manager',
      'class-validator',
      'class-transformer',
      '@nestjs/websockets/socket-module'
    ],
    plugins: [await esbuildDecorators({ tsconfig: './tsconfig.json' })],
    entryPoints: ['./src/main.ts'],
    outfile: './dist/server.js',
    format: 'cjs',
    tsconfig: './tsconfig.json'
  });
})();
