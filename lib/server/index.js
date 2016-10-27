import os from 'os'
import throng from 'throng'
import cluster from 'cluster'

import 'babel-polyfill'

import App from './app'

var key, local
const cpus = os.cpus().length

try {
    local = require(`${process.cwd()}/local.json`)
    for (key in local) {
        process.env[key] = local[key]
    }
} catch (err) {
    console.log('Local env not found.')
}

if (cluster.isMaster) {
    console.log(`CPUS:${cpus}`)
}

const IS_DEV = process.env.NODE_ENV === 'development'
const IS_PROD = process.env.NODE_ENV === 'production'
const MAX_CPUS = process.env.MAX_CPUS || 'max'

function count() {
    const value = MAX_CPUS === 'max' ? cpus : parseInt(MAX_CPUS) || cpus
    return IS_DEV ? 1 : Math.max(1, Math.min(value, cpus))
}

function run() {
    App.start()
}

throng({
    workers: count(),
    lifetime: Infinity
}, run)
