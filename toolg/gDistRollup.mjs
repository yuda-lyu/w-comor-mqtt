import rollupFiles from 'w-package-tools/src/rollupFiles.mjs'
import getFiles from 'w-package-tools/src/getFiles.mjs'


let fdSrc = './src'
let fdTar = './dist'


rollupFiles({
    fns: getFiles(fdSrc),
    fdSrc,
    fdTar,
    nameDistType: 'kebabCase',
    globals: {
        'aedes': 'aedes',
        'aedes-server-factory': 'aedes-server-factory',
        'net': 'net',
        'mqtt': 'mqtt',
    },
    external: [
        'aedes',
        'aedes-server-factory',
        'net',
        'mqtt',
    ],
})

