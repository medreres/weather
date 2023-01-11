if (!self.define) {
    let e, t = {};
    const r = (r, n) => (r = new URL(r + ".js", n).href, t[r] || new Promise((t => {
        if ("document" in self) {
            const e = document.createElement("script");
            e.src = r, e.onload = t, document.head.appendChild(e)
        } else e = r, importScripts(r), t()
    })).then((() => {
        let e = t[r];
        if (!e) throw new Error(`Module ${r} didn’t register its module`);
        return e
    })));
    self.define = (n, s) => {
        const i = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (t[i]) return;
        let o = {};
        const l = e => r(e, i),
            m = {
                module: {
                    uri: i
                },
                exports: o,
                require: l
            };
        t[i] = Promise.all(n.map((e => m[e] || l(e)))).then((e => (s(...e), o)))
    }
}
define(["./workbox-11b81c2c"], (function (e) {
    "use strict";
    self.addEventListener("message", (e => {
        e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting()
    })), e.precacheAndRoute([{
        url: "registerSW.js",
        revision: "04f6ce4da8956c459da40c7e4d917ef1"
    }, {
        revision: null,
        url: "index.html"
    }], {}), e.cleanupOutdatedCaches(), e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"), {
        allowlist: [/^\/$/]
    })), e.registerRoute(/https:\/\/api\.open-meteo\.com\/v1\/forecast\?latitude=(.*)&longitude=(.*)&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&timezone=(.*)/gm, new e.CacheFirst({
        cacheName: "forecast",
        plugins: [new e.ExpirationPlugin({
            maxEntries: 500,
            maxAgeSeconds: 63072e3
        }), new e.CacheableResponsePlugin({
            statuses: [200]
        })]
    }), "GET")
}));