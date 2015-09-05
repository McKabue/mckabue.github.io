/// <reference path="../../../Scripts/app/script.js" />

define(['plugins/router'],
    function (router) {

        var activate = function () {
            var self = this;
            $.ajax("/AppData/resume.js", {
                dataType: 'json',
                type: "GET",
                cache: false
            }).done(function (data) {
                self.resume(new resumeData(data[0]))
            }).fail(function (data) {
                alert(ko.toJSON(data))
            });


            
        };

        function resumeData(data) {
            this.personalsummary = data.personalsummary
        };

        var viewmodel = {

            router: router,

            resume: ko.observable(),

            activate: activate,


        };

        return viewmodel;
    });