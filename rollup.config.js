import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import css from "rollup-plugin-import-css";
import svg from 'rollup-plugin-svg'
import image from '@rollup/plugin-image';

export default [
  {
    external: ['styled-components'],
    globals: { 'styled-components': 'styled' },
    input: './src/index.js',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.es.js',
        format: 'es',
        exports: 'named',
      }
    ],
    plugins: [
      babel({
        exclude: 'node_modules/**',
        presets: ['@babel/preset-react']
      }),
      external(),
      resolve(),
      // terser(),
      svg(),
      css(),
      image()
    ]
  }
];