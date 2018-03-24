
define([], function () {
    var plugin = {
        load: function (_name, req, onload, config) {
            var _template_default = 'text!components/' + _name + '/' + _name + '.html',
                _model_default = 'components/' + _name + '/' + _name,
                _common_default = 'components/common',
                _arguments = _name.indexOf(':') > -1 ? _name.split(':') : [],
                _template = _arguments[0] || _template_default,
                _model = _arguments[1] || _model_default,
                _common = (_arguments.length > 2 && !_arguments[2]) ? '' : _common_default,
                _req = [];

            if (_template)
                _req.push(_template);
            if (_model)
                _req.push(_model);
            if (_common)
                _req.push(_common);

            req(_req, function (template, model, common) {
                if (common) {
                    if (model['mixins'])
                        model['mixins'].push(common);
                    else
                        model['mixins'] = [common];
                }

                if (!model['template'])
                    model['template'] = template;
                onload(model);
            });
        }
    }
    return plugin;
});