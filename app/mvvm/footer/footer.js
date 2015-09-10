define(['plugins/router'],
    function (router) {

        var SearchText = ko.observable();

        var typeaheadOptions = {
            name: 'test',
            hint: true,
            highlight: true,
            minLength: 0
        };

        var submitform = function () {
            
        };

        var searchHasFocus = ko.observable(false);

        var viewmodel = {

            router: router,

            submitform: submitform,

            activate: function(){
                
            },

            attached: function(){
                $(".search-input").keypress(function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        $("#searchform").submit();
                    }
                });
            },

            searchHasFocus: searchHasFocus,

            typeaheadOpts: typeaheadOptions,

            SearchText: SearchText,

            
        };

        return viewmodel;
    });