
//alert("../Scripts/app/script");

    ko.bindingHandlers.typeaheadJS = {
        init: function (element, valueAccessor, allBindingsAccessor) {
            var el = $(element);
            var options = ko.utils.unwrapObservable(valueAccessor());
            var local = [{ val: 'Alabama' }, { val: 'Alaska' }, { val: 'Arizona' }, { val: 'Arkansas' }, { val: 'California' }, { val: 'Colorado' }, { val: 'Connecticut' }, { val: 'Delaware' }, { val: 'Florida' }, { val: 'Georgia' }, { val: 'Hawaii' }, { val: 'Idaho' }, { val: 'Illinois' }, { val: 'Indiana' }, { val: 'Iowa' }, { val: 'Kansas' }, { val: 'Kentucky' }, { val: 'Louisiana' }, { val: 'Maine' }, { val: 'Maryland' }, { val: 'Massachusetts' }, { val: 'Michigan' }, { val: 'Minnesota' }, { val: 'Mississippi' }, { val: 'Missouri' }, { val: 'Montana' }, { val: 'Nebraska' }, { val: 'Nevada' }, { val: 'New Hampshire' }, { val: 'New Jersey' }, { val: 'New Mexico' }, { val: 'New York' }, { val: 'North Carolina' }, { val: 'North Dakota' }, { val: 'Ohio' }, { val: 'Oklahoma' }, { val: 'Oregon' }, { val: 'Pennsylvania' }, { val: 'Rhode Island' }, { val: 'South Carolina' }, { val: 'South Dakota' }, { val: 'Tennessee' }, { val: 'Texas' }, { val: 'Utah' }, { val: 'Vermont' }, { val: 'Virginia' }, { val: 'Washington' }, { val: 'West Virginia' }, { val: 'Wisconsin' }, { val: 'Wyoming' }]
            var showResults = function (data) {
                var arr = $.map(data[1], function (item) {
                    return {
                        value: item[0]
                    };
                });
                console.log(arr);
                return arr;
            };

            el.attr("autocomplete", "off").typeahead({
                hint: options.hint,
                highlight: options.highlight,
                minLength: options.minLength
            }, {
                name: 'Searches',
                display: 'value',
                source: new Bloodhound({
                    datumTokenizer: function (data) {
                        return Bloodhound.tokenizers.whitespace(data.value);
                    },

                    queryTokenizer: Bloodhound.tokenizers.whitespace,

                    //local: local,

                    /*
                    prefetch: 'http://localhost:1106/api/Search/searchTerm',
                    
                    remote: {
                        url: 'https://clients1.google.com/complete/search?q=' + '%QUERY' + '&hl=en&client=partner&source=gcsc&partnerid=007448797502181840672:minf_ltsr2s=cse&nocache=' + Math.random().toString(),
                        wildcard: '%QUERY'
                    },
                    */
                    remote: {
                        url: "http://clients1.google.com/complete/search?client=partner&hl=en&sugexp=gsnos%2Cn%3D13&gs_rn=25&gs_ri=partner&partnerid=004914516364918182382%3Ayfqw09r4qvu&types=t&ds=cse&cp=3&gs_id=15&q=%QUERY",
                        ajax: {
                            type: 'GET',
                            dataType: 'jsonp'
                        },
                        filter: showResults
                    }
                    
                }),
                templates: {
                    empty: [
                      '<div class="empty-message">',
                        'Powered by Google Custom Search',
                      '</div>'
                    ].join('\n'),
                    suggestion: function (data) {
                        return '<div><p data-bind="click:SearchFunction">' + data.val + ' <span class="pull-right text-primary">' + "data.year" + '</span></p></div>'
                    }
                }
            });
        }
    };


    ko.bindingHandlers.tooltip = {
        update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var $element, options, tooltip, subsc;
            options = ko.utils.unwrapObservable(valueAccessor());
            $element = $(element);

            // If the title is an observable, make it auto-updating.
            if (ko.isObservable(options.title)) {
                var isToolTipVisible = false;

                $element.on('show.bs.tooltip', function () {
                    isToolTipVisible = true;
                });
                $element.on('hide.bs.tooltip', function () {
                    isToolTipVisible = false;
                });

                // "true" is the bootstrap default.
                var origAnimation = options.animation || true;
                subsc = options.title.subscribe(function () {
                    if (isToolTipVisible) {
                        $element.data('bs.tooltip').options.animation = false; // temporarily disable animation to avoid flickering of the tooltip
                        $element.tooltip('fixTitle') // call this method to update the title
                            .tooltip('show');
                        $element.data('bs.tooltip').options.animation = origAnimation;
                    }
                });
            }

            tooltip = $element.data('bs.tooltip');
            if (tooltip) {
                $.extend(tooltip.options, options);
            } else {
                $element.tooltip(options);
            }
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                if (subsc) subsc.dispose();
                $element.tooltip('destroy');
            });
        }
    };