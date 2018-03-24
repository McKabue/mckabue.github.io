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
        "flickity": "../vendors/flickity/flickity.pkgd.min",
        "isotope": "//unpkg.com/isotope-layout@3/dist/isotope.pkgd.min"
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

require(['vue'], function (Vue) {

    var model = {
        data: {
            
        },
        components: {
            'index-page': function (resolve) {
                require(['loader!index-page'], resolve); //require(['loader!text!components/manage-posts/manage-posts.html:components/manage-posts/manage-posts'], resolve);
            }
        }
    };

    var viewModel = new Vue(model);

    viewModel.$mount('#main-body-wrapper');

    //var headTag = document.head || document.getElementsByTagName('head')[0],
    //    style = document.createElement('style'),
    //    resize = function () {
    //        //https://stackoverflow.com/a/8876069
    //        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    //        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //        style.type = 'text/css';
    //        style.innerHTML = '.view-height { height: ' + h + 'px !important; }';
    //        style.innerHTML += '.view-width { width: ' + w + 'px !important; }';
    //    };

    //headTag.appendChild(style);
    //window.addEventListener('resize', resize);
    //resize();
    
});

