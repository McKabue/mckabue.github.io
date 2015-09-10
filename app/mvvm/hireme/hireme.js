define(['plugins/router'],
    function (router) {



        var viewmodel = {
            router: router,

            activate: function () {
                //alert(ko.toJSON(router.activeInstruction()));
            }
        };

        return viewmodel;
    });