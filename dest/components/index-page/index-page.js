define(['vue', 'utils', 'vue-particles', "flickity", "isotope"], function (Vue, utils, vueparticles, Flickity, Isotope) {
    Vue.use(vueparticles);

    return {
        data: function () {
            return {
                rawHtml: ''
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
            var self = this,
                images = [
                    {
                        path: "/dest/images/curriculum.co.ke.PNG",
                        description: "/dest/images/curriculum.co.ke.PNG"
                    },
                    {
                        path: "/dest/images/curriculum.co.ke.2.PNG",
                        description: "/dest/images/curriculum.co.ke.2.PNG"
                    },
                    {
                        path: "/dest/images/curriculum.co.ke.3.PNG",
                        description: "/dest/images/curriculum.co.ke.3.PNG"
                    },
                    {
                        path: "/dest/images/curriculum.co.ke.4.PNG",
                        description: "/dest/images/curriculum.co.ke.PNG"
                    },
                    {
                        path: "/dest/images/daktari.net.PNG",
                        description: "/dest/images/daktari.net.PNG"
                    },
                    {
                        path: "/dest/images/daktari.net.2.PNG",
                        description: "/dest/images/daktari.net.2.PNG"
                    },
                    {
                        path: "/dest/images/daktari.net.3.PNG",
                        description: "/dest/images/daktari.net.3.PNG"
                    },
                    {
                        path: "/dest/images/daktari.net.4.PNG",
                        description: "/dest/images/daktari.net.4.PNG"
                    },
                    {
                        path: "/dest/images/daktari.net.5.PNG",
                        description: "/dest/images/daktari.net.5.PNG"
                    },
                    {
                        path: "/dest/images/daktari.net.6.PNG",
                        description: "/dest/images/daktari.net.6.PNG"
                    },
                    {
                        path: "/dest/images/oarklimited.com.PNG",
                        description: "/dest/images/oarklimited.com.PNG"
                    },
                    {
                        path: "/dest/images/oarklimited.com.1.PNG",
                        description: "/dest/images/oarklimited.com.1.PNG"
                    }
                ],
                imageDescription = function (image) {
                    var element = utils.vueTemplate({
                        template: '<div class="">{{description}}</div>',
                        data: image
                    });
                    self.rawHtml = element.innerHTML;
                };

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
                    ready: function () {
                        imageDescription(images[0]);
                    },
                    change: function (index) {
                        imageDescription(images[index]);
                    }
                }
            });

            images.forEach(function (image) {
                var element = utils.vueTemplate({
                    template: '<div class="carousel-cell"><img :src="path" :alt="description" /></div>',
                    data: image
                });

                flkty.append(element)
            });

            var iso = new Isotope('.skills', {
                itemSelector: '.skill'
            });
        }
    };
});