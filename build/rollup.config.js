import vue from 'rollup-plugin-vue';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';

const isMinify = process.env.BUILD_MODE === 'minify';

export default {
    input: 'src/index.js',
    output: {
        file: isMinify ? 'dist/js/menu-component.min.js' : 'dist/js/menu-component.js',
        format: 'umd',
        name: 'MenuComponent',
    },
    plugins: [
        commonjs(),
        vue({
            css: true,
        }),
        babel({
            runtimeHelpers: true,
            externalHelpers: false,
        }),
        (isMinify && terser())
    ],
};