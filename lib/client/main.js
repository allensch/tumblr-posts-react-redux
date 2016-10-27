import Routes from './routes'

var pageY = 0,
    resizeTimeout = 0,
    scrollEndTimeout = 0,
    unauthorizedTimeout = 0,
    active = null,
    mapLoaded = false,
    rendered = false

if (typeof window !== 'undefined') {

    // Setup window globals
    window['$'] = window['jQuery'] = require('jquery')
    // window.isMobile = require('ismobilejs')
    window.scrollCallbacks = []
    window.resizeCallbacks = []
    window.scrollToEnd = handleScrollToEnd
    window.addResizeCallback = addResizeCallback
    window.addScrollCallback = addScrollCallback
    window.removeResizeCallback = removeResizeCallback
    window.removeScrollCallback = removeScrollCallback
    // setup App
    window.onload = setupRoutes
    // handle resize
    window.onresize = handleResize
    // handle scroll
    window.onscroll = handleScroll
    // for scrolling
    pageY = window.pageYOffset
}

function setupRoutes() {
    Routes.setup('app')
    rendered = true
}

function handleResize() {
    function resize() {
        var i, l = window.resizeCallbacks.length
        for (i = 0; i < l; i++) {
            setTimeout(window.resizeCallbacks[i], i + 1)
        }
    }
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(resize, 250)
}

function handleScrollToEnd(delay = 1) {
    clearTimeout(scrollEndTimeout)
    scrollEndTimeout = setTimeout(function() {
        const y = Math.max(0, getContentHeight() - window.innerHeight)
        if (y > 0) {
            TweenLite.to(window, .15, { scrollTo: { y: y }, ease: Power2.easeOut })
        }
    }, delay)
}

function getContentHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
}

function handleScroll() {
    var i, len = scrollCallbacks.length, height = getContentHeight()
    const percent = ( window.pageYOffset / (height - window.innerHeight) ) * 100
    const direction = window.pageYOffset > pageY ? 'down' : 'up'
    const reachedEnd = percent > 99
    const reachingEnd = percent > 85
    for (i = 0; i < len; i++) {
        scrollCallbacks[i](reachedEnd, reachingEnd, direction)
    }
    pageY = window.pageYOffset
}

function addCallback(a, fn) {
    if (typeof fn == 'function') {
        a.push(fn)
    }
}

function removeCallback(a, fn) {
    if (typeof fn == 'function') {
        a.splice(a.indexOf(fn), 1)
    }
}

function addResizeCallback(fn) {
    addCallback(window.resizeCallbacks, fn)
}

function removeResizeCallback(fn) {
    removeCallback(window.resizeCallbacks, fn)
}

function addScrollCallback(fn) {
    addCallback(window.scrollCallbacks, fn)
}

function removeScrollCallback(fn) {
    removeCallback(window.scrollCallbacks, fn)
}

function addUnauthorizedCallback(fn) {
    addCallback(window.unauthorizedCallbacks, fn)
}

function removeUnauthorizedCallback(fn) {
    removeCallback(window.unauthorizedCallbacks, fn)
}
