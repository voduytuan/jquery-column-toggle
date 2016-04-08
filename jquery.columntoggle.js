(function($) {

    $.fn.columntoggle = function( options ) {



        // Establish our default settings
        var settings = $.extend({
            //Class of column toggle contains toggle link
            toggleContainerClass: 'columntoggle-container',

            //Text in column toggle box
            toggleLabel: 'Show/Hide columns: ',

            //Default column toggle ID
            toggleContainerId: 'column-toggle-container',

            //the prefix of key in localstorage
            keyPrefix: 'columntoggle-',

            //keyname in localstorage, if empty, it will get from URL
            key: '',

            //where place toggle container
            toggleContainerPos: '',

        }, options);

        //set default key for storage
        if (settings.key.length == 0) {
            settings.key = window.location.href;
        }

        var toggleLinkStatus = {
            checkStatus: function(hidelist) {
                $('#'+settings.toggleContainerId).find('input').each(function(){
                    var columnindex = $(this).attr('data-columnindex');
                    if ($.inArray(columnindex + '', hidelist) >= 0) {
                        this.checked = true;
                    } else {
                        this.checked = false;
                    }
                });
            }
        }

        var toggleStatusStorage = {
            save: function(el){
                var hidelist = [];
                $(el).find('thead > tr > th').each(function(index){
                    //column index start from 1
                    var columnindex = index + 1;

                    if ($(this).is(':visible') === false) {
                        hidelist.push(columnindex + '');
                    }
                });

                localStorage.setItem(settings.keyPrefix + settings.key, hidelist.join(','));

            },
            load: function(el){
                if (settings.key.length > 0) {
                    var hidelistString = localStorage.getItem(settings.keyPrefix + settings.key);
                    if (hidelistString !== null && hidelistString.length > 0) {
                        var hidelist = hidelistString.split(',');
                        if (hidelist.length > 0) {
                            $.each(hidelist, function(index, columnindex){
                                $(el).find('td:nth-child('+columnindex+'), th:nth-child('+columnindex+')').hide();
                            });

                            toggleLinkStatus.checkStatus(hidelist);
                        }

                    }
                }
            }
        };



        return this.each( function() {

            //Detect to prevent add more togglebox to a table (ussally from react didUpdate)
            if ($(this).next().hasClass(settings.toggleContainerClass)) {
                $(this).next().remove();
            }

            var table = $(this);

            //find table header to extract columns
            var toggleColumnHtml = [];
            $(this).find('thead > tr > th').each(function(index){

                //column index start from 1
                var columnindex = index + 1;

                var togglenameAttr = $(this).attr('data-columntoggle');
                var toggleName = '';
                if (typeof togglenameAttr !== typeof undefined && togglenameAttr !== false) {
                    toggleName = togglenameAttr;
                } else {
                    toggleName = $(this).text();
                }

                toggleColumnHtml.push('<label><input type="checkbox" data-columnindex="'+columnindex+'" >'+toggleName+'</label>');
            });

            var toggleContainer = '<div id="'+ settings.toggleContainerId + '" class="'+settings.toggleContainerClass+' ">'+settings.toggleLabel+' '+toggleColumnHtml.join(', ')+'</div>';

            if (settings.toggleContainerPos) {
                $(settings.toggleContainerPos).prepend(toggleContainer);
            } else {
                $(this).after(toggleContainer);
            }



            $('#'+settings.toggleContainerId).find('input').each(function(){
                $(this).on('click', function(e){
                    var columnindex = $(this).attr('data-columnindex');
                    var column = $(table).find('td:nth-child('+columnindex+'), th:nth-child('+columnindex+')');

                    if (e.target.checked) {
                        column.hide()
                    } else {
                        column.show();
                    }

                    //store
                    toggleStatusStorage.save(table);
                });
            });

            //load hide status from cache
            toggleStatusStorage.load(table);
        });

    }
}(jQuery));
