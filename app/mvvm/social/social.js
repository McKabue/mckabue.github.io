define(['plugins/router'],
    function (router) {

        function disqus(){
            /* * * CONFIGURATION VARIABLES * * */
            var disqus_shortname = 'mckabue';

            /* * * DON'T EDIT BELOW THIS LINE * * */
            (function () {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();
            
        }

        function twttr() {
            window.twttr.ready(function (twttr) {
                // bind events here
               // alert("twttr.ready");
                //twttr.widgets.load();
                twttr.widgets.load(document.getElementById("collapseOne"));
            });
        }

        var viewmodel = {
            router: router,

            activate: function () {
               
            },

            attached: function () {
                disqus();
            },
            compositionComplete: function () {
                twttr();
            }
        };

        return viewmodel;
    });