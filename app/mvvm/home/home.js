define(['plugins/router'],
    function (router) {


        
   

        var viewmodel = {
            router: router,

            activate: function () {
                
                //alert(ko.toJSON(router.activeInstruction()));

            },
            compositionComplete: function () {
                // alert("home compositionComplete");
                $('.carousel').carousel({ interval: 5000, cycle: true });
            }
        };

        return viewmodel;
    });