

define([], function () {



    function log(type, title, message, position, fadeIn, timeOut) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "positionClass": position,
            "onclick": null,
            "fadeIn": fadeIn,
            "fadeOut": 1000,
            "timeOut": timeOut,
            "extendedTimeOut": 1000,
            //"showMethod": "slideDown",
            //"hideMethod": "slideUp",
            //"closeMethod": "slideUp"
            //"showEasing": "swing",
            //"hideEasing": "linear",
        };

        toastr[type](message, title);
    };


    function logSuccess(title, message, position) {
        toastr.options = {
            "debug": false,
            "positionClass": position,
            "onclick": null,
            "fadeIn": 300,
            "fadeOut": 1000,
            "timeOut": 5000,
            "extendedTimeOut": 1000
        };

        toastr.success(message, title);
    };





        var logger = {
            log: log
        };

        return logger;


    });