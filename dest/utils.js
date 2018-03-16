/** 
  * @module Several utils for the app
*/

define(['vue'], function (Vue) {
    return {
        //http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
        stringTemplate: function(html, options) {
            var re = /\{\{(.+?)\}\}/g,
                reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g,
                code = 'with(obj) { var r=[];\n',
                cursor = 0,
                result,
                match;
            var add = function (line, js) {
                js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
                    (code += line !== '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
                return add;
            }
            while (match = re.exec(html)) {
                add(html.slice(cursor, match.index))(match[1], true);
                cursor = match.index + match[0].length;
            }
            add(html.substr(cursor, html.length - cursor));
            code = (code + 'return r.join(""); }').replace(/[\r\t\n]/g, ' ');
            try { result = new Function('obj', code).apply(options, [options]); }
            catch (err) { console.error("'" + err.message + "'", " in \n\nCode:\n", code, "\n"); }
            return result;
        },
        //https://forum.vuejs.org/t/how-can-i-compile-a-vue-template-string-and-just-get-a-string-of-the-resulting-html/10988/2
        //https://forum.vuejs.org/t/vue-js-1-x-this-compile-equivalen-vue-js-2-x-please-solved/515/9
        //https://forum.vuejs.org/t/innerhtml-compilation-vue-2/8780/7
        vueTemplate: function (model) {
            var el = document.createElement('DIV'),
                vm = new Vue((model || {}));

            el.style.display = "none";
            document.body.appendChild(el);
            vm.$mount(el);
            el = vm.$el;
            document.body.removeChild(el);
            return vm.$el;
        },
        //https://www.quirksmode.org/js/cookies.html
        cookie: {
            createCookie: function (name, value, days) {
                if (days) {
                    var date = new Date();
                    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                    var expires = "; expires=" + date.toGMTString();
                }
                else var expires = "";
                document.cookie = name + "=" + value + expires + "; path=/";
            },
            readCookie: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            eraseCookie: function (name) {
                this.createCookie(name, "", -1);
            }
        },
        readAsDataURL: function(file) {
            return new Promise(function (resolve, reject) {
                if (file) {
                    var fr = new FileReader();
                    fr.onload = function (e) {
                        resolve(e.target.result);
                    };
                    try {
                        fr.readAsDataURL(file);
                    }
                    catch (e) {
                        reject(e);
                    }
                } else {
                    resolve(undefined);
                }
            });
        },
        extend: function(obj, src) {
            for (var key in src) {
                if (src.hasOwnProperty(key)) obj[key] = src[key];
            }
            return obj;
        },
        //https://stackoverflow.com/a/3261380
        isBlank: function (str) { 
            return (!str || /^\s*$/.test(str));
        }
    };
});