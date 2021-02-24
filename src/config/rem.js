(function (document, window) {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    var docEl = document.documentElement

    const recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        /* 设备宽度 / 设计稿宽度 */
        docEl.style.fontSize = (clientWidth / 750) + 'px'
    }
    
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)