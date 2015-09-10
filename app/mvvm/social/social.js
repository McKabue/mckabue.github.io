define(['plugins/router'],
    function (router) {



        var viewmodel = {
            router: router,

            activate: function () {
                twttr.ready(function (twttr) {
                    // bind events here
                    //alert("twttr.ready");
                    twttr.widgets.load();
                  }
                );
                
                twttr.widgets.load();
            }
        };

        return viewmodel;
    });