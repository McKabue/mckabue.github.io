var urlArgs = (window.requireandconfig || document.getElementById("requireandconfig")).src.split("?")[1] || "v=1.0.0";

requirejs.config({
    urlArgs: urlArgs,
    baseUrl: "/dest",
    paths: {
        "text": "../vendors/requirejs-text/text",
        'vuejs': "../vendors/vue/vue.min"
    },
    waitSeconds: 7,
    shim: {
        
    },
    callback: function () {

    }
});

define('vue', ['vuejs'], function (vue) {
    return vue;
});

require(['vue', 'utils'], function (Vue, utils) {
    

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
            }
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
        //created: function () {

        //}
    };

    var viewModel = new Vue(model);

    viewModel.$mount('#main-body-wrapper');
});

