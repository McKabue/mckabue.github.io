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

        var viewmodel = {
            router: router,

            activate: function () {
                disqus();
               
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