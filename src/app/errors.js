//https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror
//https://blog.sentry.io/2016/01/04/client-javascript-reporting-window-onerror.html
//https://danlimerick.wordpress.com/2014/01/18/how-to-catch-javascript-errors-with-window-onerror-even-on-chrome-and-firefox/
window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    console.log({
        messageOrEvent: messageOrEvent,
        source: source,
        lineno: lineno,
        colno: colno,
        error: error
    });
};
