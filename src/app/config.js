var urlArgs = (window.requireandconfig || document.getElementById("requireandconfig")).src.split("?")[1] || "v=1.0.0";

requirejs.config({
    urlArgs: urlArgs,
    baseUrl: "/dest",
    paths: {
        "text": "../vendors/requirejs-text/text",
        'vuejs': "../vendors/vue/vue.min",
        "particlesjs": "../vendors/vue-particles/particles",
        "vue-particles": "../vendors/vue-particles/vue-particles",
        'typed': "../vendors/typed.js/typed.min",
        "flickity": "../vendors/flickity/flickity.pkgd.min"
    },
    waitSeconds: 7,
    shim: {
        'particlesjs': {
            exports: 'particlesJS'
        }
    },
    callback: function () {

    }
});

define('particles.js', ['particlesjs'], function (particlesjs) {
    return particlesjs;
});

define('vue', ['vuejs'], function (vue) {
    return vue;
});

require(['vue', 'utils', 'vue-particles', 'typed', "flickity"], function (Vue, utils, vueparticles, typed, Flickity) {

    Vue.use(vueparticles);
    var model = {
        data: {
            currentView: 'create-post',
            message: "message"
        },
        components: {
            'create-post': {
                template: '#create-template'
            },
            'manage-posts': function (resolve) {
                require(['loader!manage-posts'], resolve); //require(['loader!text!components/manage-posts/manage-posts.html:components/manage-posts/manage-posts'], resolve);
            },
            //'vue-particles': vueparticles
        },
        //methods: {
        //    rawHtml: function () {
        //        var html = utils.vueTemplate({
        //            template: '<div><input v-model="message" placeholder="edit me"><p>Message is: {{ message }}</p></div>',
        //            data: {
        //                message: "message"
        //            }
        //        });
        //        document.body.appendChild(html);//document.getElementById('app').appendChild(html);
        //        return html.innerHTML;
        //    }
        //},
        created: function () {
            var _timeout_ = setTimeout(function () {
                var elem = document.getElementsByClassName('splash-screen')[0];
                elem.parentNode.removeChild(elem)
                clearTimeout(_timeout_);
            }, 3000);
        },
        mounted: function () {
            require(['bio'], function (bio) {
                var _typedInstance = new typed("#typed", {
                    strings: bio,
                    cursorChar: '_',
                    typeSpeed: 15,
                    backSpeed: 30,
                    backDelay: 2000,
                    startDelay: 4000,
                    callback: function () {

                    }
                });
            });

            var flkty = new Flickity('.carousel', {
                cellAlign: 'left',
                pageDots: false,
                freeScroll: true,
                wrapAround: true,
                imagesLoaded: true,
                percentPosition: true,
                adaptiveHeight: true,
                contain: true,
                setGallerySize: false
            });
        }
    };

    var viewModel = new Vue(model);

    viewModel.$mount('#main-body-wrapper');

    var headTag = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style'),
        resize = function () {
            //https://stackoverflow.com/a/8876069
            var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            style.type = 'text/css';
            style.innerHTML = '.view-height { height: ' + h + 'px !important; }';
            style.innerHTML += '.view-width { width: ' + w + 'px !important; }';
        };

    headTag.appendChild(style);
    window.addEventListener('resize', resize);
    resize();
    
});

