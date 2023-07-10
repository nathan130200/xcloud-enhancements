// ==UserScript==
// @name         xCloud Enhancements
// @version      0.1
// @author       FRNathan13
// @match        https://www.xbox.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {

    document.querySelector(`style[_is_generated='1']`)?.remove();

    var style = document.createElement('style');
    style.setAttribute('_is_generated', 1);

    style.innerHTML = `
        #game-stream video {
            /* Will work in most of games */
            filter: saturate(120%) contrast(115%) brightness(115%) !important;
            object-fit: 'fill' !important;
        }

        button[class*=GripHandle] {
            display: none !important;
        }

        div[class*=RocketAnimation] {
            display: none !important;
        }

        div[class*=NotFocusedDialog] {
            display: none !important;
        }

        * {
            font-family: 'Segoe UI' !important;
        }
    `;

    document.documentElement.appendChild(style);

    // Some additions such as press F9 to hide cursor, F8 open xcloud menu, and temporary fix for xCloud don't allow us go in fullscreen with F11 hotkey.

    document.onkeyup = e => {
        if (e.code == 'F8') {
            document.querySelector(`button[class*=GripHandle]`)?.click();
        }
        else if (e.code == 'F9') {
            try { document.body.requestPointerLock(); }
            catch (e) { /* ignore */ }
        }
        else if (e.code == 'F11') {
            try { document.body.requestFullscreen(); }
            catch (e) { /* ignore */ }
        }
    };


    // FIXME: Sometimes CSS don't set even forcing with "!important" tag.
    function fitVideoToScreen() {
        var el = document.querySelector('#game-stream video');

        if (el) {
            el.style.objectFit = 'fill';
            return;
        }

        setTimeout(fitVideoToScreen, 1000);
    }

    // Ensure each game started will test for element.
    window.onpageshow = e => {
        fitVideoToScreen();
    };
})();
