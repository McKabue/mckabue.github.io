define(['vue', 'utils', 'vue-particles', "flickity", "isotope"], function (Vue, utils, vueparticles, Flickity, Isotope) {
    Vue.use(vueparticles);

    return {
        data: function () {
            return {
                carouselIndex: 0
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
        },
        mounted: function () {
            var self = this;

            var flkty = new Flickity('.carousel', {
                cellAlign: 'left',
                pageDots: false,
                freeScroll: true,
                wrapAround: true,
                imagesLoaded: true,
                percentPosition: true,
                adaptiveHeight: true,
                contain: true,
                setGallerySize: false,
                //prevNextButtons: false,
                on: {
                    change: function (index) {
                        self.carouselIndex = index;
                    }
                }
            });

            var iso = new Isotope('.skills', {
                itemSelector: '.skill'
            });
        }
    };
});