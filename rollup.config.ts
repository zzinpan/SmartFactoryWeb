// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/SmartFactory.ts',
    output: {
        file: 'dist/SmartFactory.js',
        format: 'umd',
        name: 'SmartFactory'
    },
    plugins: [typescript()]
};