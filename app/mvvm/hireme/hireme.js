define(['plugins/router'],
    function (router) {

        var SearchText = ko.observable();

        var typeaheadOptions = {
            name: 'test',
            hint: true,
            highlight: true,
            minLength: 0
        };


        var viewmodel = {
            router: router,

            activate: function () {
                //alert(ko.toJSON(router.activeInstruction()));
            },
            typeaheadOpts: typeaheadOptions,

            SearchText: SearchText,
        };

        return viewmodel;
    });