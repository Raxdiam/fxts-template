import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/client/client.ts',
    output: {
      file: 'build/client.js',
      format: 'cjs',
    },
    plugins: [typescript({tsconfig: 'src/client/tsconfig.json'})],
  },
  {
    input: 'src/server/server.ts',
    output: {
      file: 'build/server.js',
      format: 'cjs',
    },
    plugins: [typescript({tsconfig: 'src/server/tsconfig.json'})],
  },
];
