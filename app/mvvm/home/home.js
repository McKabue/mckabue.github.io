define(['plugins/router'],
    function (router) {




        var viewmodel = {
            router: router,

            activate: function () {
                //alert(ko.toJSON(router.activeInstruction()));
            },
            compositionComplete: function () {
                // alert("home compositionComplete");
                $('.carousel').carousel({ interval: 2500, cycle: true });
            }
        };

        return viewmodel;
    });