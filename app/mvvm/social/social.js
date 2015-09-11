define(['plugins/router'],
    function (router) {



        var viewmodel = {
            router: router,

            activate: function () {
                
               
            },

            attached: function () {
                twttr.ready(function (twttr) {
                    // bind events here
                    //alert("twttr.ready");
                    //twttr.widgets.load();
                    twttr.widgets.load(document.getElementById("collapseOne"));
                }
                );

                stLight.options({ publisher: "c6eec58b-537b-4557-a746-b086dd18a9b8", doNotHash: false, doNotCopy: false, hashAddressBar: false });
            }
        };

        return viewmodel;
    });