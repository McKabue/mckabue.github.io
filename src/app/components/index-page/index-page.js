
define(['vue', 'utils', 'vue-particles', "typed"], function (Vue, utils, vueparticles, typed) {
    Vue.use(vueparticles);

    return {
        data: function () {
            return {
                rawHtml: '',
                animation: ''
            }
        },
        watch: {
            rawHtml: function (newValue, oldValue) {
                
            }
        },
        components: {
            
        },
        created: function () {
            document.body.style.overflowY = "hidden";
            var _timeout_ = setTimeout(function () {
                (function removeWithAnimation(el, className, speed) {
                    el.style.transition = "opacity " + speed + "ms ease";
                    el.className += " " + className;

                    var _removeSetTmeout = setTimeout(function () {
                        document.body.style.overflowY = "scroll";
                        el.parentNode.removeChild(el);
                        clearTimeout(_removeSetTmeout);
                    }, speed / 6);
                })(document.getElementsByClassName('splash-screen')[0], "animated zoomOut", 2000);

                clearTimeout(_timeout_);
            }, 500);

            require(['bio'], function (bio) {
                var _typedInstance = new typed("#typed", {
                    strings: bio,
                    cursorChar: '_',
                    typeSpeed: 15,
                    backSpeed: 30,
                    backDelay: 2000,
                    startDelay: 500,
                    callback: function () {

                    }
                });
            });
        },
        mounted: function () {
            var self = this;

            
        }
    };
});