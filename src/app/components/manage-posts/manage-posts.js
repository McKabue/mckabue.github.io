define(['vue'], function (Vue) {
    return {
        data: function () {
            return {
                posts: [
                    'Vue.js: The Basics',
                    'Vue.js Components',
                    'Server Side Rendering with Vue',
                    'Vue + Firebase'
                ]
            }
        },
        components: {
            'post-display': Vue.extend({
                template: '<span>{{ item }} - {{ post }} <span class="pull-right"><button class="btn btn-xs btn-info"><span class="glyphicon glyphicon-edit"></span></button> <button class="btn btn-xs btn-warning"><span class="glyphicon glyphicon-trash"></span></button></span></span>',
                props: ['post'],
                data: function () {
                    return {
                        item: 'item'
                    }
                }
            })
        }
    };
});