define(['plugins/router'],
    function (router) {



        var viewmodel = {
            router: router,

            activate: function () {
                //alert("social in...");
                twttr.widgets.load();
            }
        };

        return viewmodel;
    });