import path from 'path';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';

const projectRootDir = path.resolve('.');
const customResolver = resolve({
  extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss'],
});

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'esm',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      plugins: [terser()],
    },
    {
      file: 'dist/index.min.js',
      format: 'cjs',
      plugins: [terser()],
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
      babelHelpers: 'bundled',
    }),
    alias({
      entries: [
        {
          find: '@',
          replacement: path.resolve(projectRootDir, 'src'),
        }
      ],
      customResolver,
    }),
    resolve(),
  ],
};
