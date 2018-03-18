var urlArgs = (window.requireandconfig || document.getElementById("requireandconfig")).src.split("?")[1] || "v=1.0.0";

requirejs.config({
    urlArgs: urlArgs,
    baseUrl: "/dest",
    paths: {
        "text": "../vendors/requirejs-text/text",
        'vuejs': "../vendors/vue/vue.min",
        "particlesjs": "../vendors/vue-particles/particles",
        "vue-particles": "../vendors/vue-particles/vue-particles"
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

require(['vue', 'utils', 'vue-particles'], function (Vue, utils, vueparticles) {

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
        }
    };

    var viewModel = new Vue(model);

    viewModel.$mount('#main-body-wrapper');
});

