/// <reference path="../../../Scripts/app/script.js" />

define(['plugins/router'],
    function (router) {

        var activate = function () {
            var self = this;
            $.ajax("/AppData/resume.js", {
                dataType: 'json',
                type: "GET",
                async: true,
                cache: true
            }).done(function (data) {
                self.resume(new resumeData(data))
            }).fail(function (data) {
                alert(ko.toJSON(data))
            });


            
        };

        function resumeData(data) {
            var self = this;
            this.personalsummary = data.personalsummary;
            this.skillsabilities = [];
            data.skillsabilities.forEach(function (i) {
                self.skillsabilities.push({ "value": i });
            });

            this.references = data.references;
            this.education = [];
            data.education.forEach(function (i) {
                self.education.push(i);
            });
            
        };

        var viewmodel = {

            router: router,

            resume: ko.observable(),

            activate: activate,


        };

        return viewmodel;
    });