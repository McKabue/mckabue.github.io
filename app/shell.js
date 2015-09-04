
define(['plugins/router', 'durandal/system', ],
    function (router, system) {
        

        var r2 = [{ 'route': ['', 'home'], 'title': 'Home', 'moduleId': 'mvvm/home/home', 'nav': true },
                  { 'route': 'resume', 'title': 'Resume', 'moduleId': 'mvvm/resume/resume', 'nav': true }
        ];

        function loadRoutes() {
            return $.ajax("api/Durandal/routes", {
                type: "GET"
            });
        };

        function convertToArray(roles) {
            //alert("roles   " + roles);
            return roles = roles[0].split(",");
        };

        var viewmodel = {

            router: router,

            activate: function () {
                var self = this;



                return router.map(r2).buildNavigationModel()
                  //.mapUnknownRoutes('MVVM/not-found/not-found', 'not-found')
                  //  .activate({ pushState : true });
                  .activate();

            },

            Initialize: function () {
                var self = this;
                



                return system.defer(function (goOn) {
                    loadRoutes().then(function (data) {
                       // alert(ko.toJSON(data));
                        self.r(data);
                        goOn.resolve(true);
                    }).fail(function (data) {
                        alert(ko.toJSON(data));
                        goOn.resolve(true);
                    })
                }).promise();
            }


        };


        return viewmodel;

    });






