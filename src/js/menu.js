/* Menu */
+function($, window, document, Math)
{
    "use strict";

    var Menu = function(element, options)
    {
        this.$         = $(element);
        this.options   = this.getOptions(options);

        this.init();
    };

    Menu.DEFAULTS = {auto: false, foldicon: 'icon-chevron-right'};

    Menu.prototype.getOptions = function (options)
    {
        options = $.extend({}, Menu.DEFAULTS, this.$.data(), options);
        return options;
    };

    Menu.prototype.init = function()
    {
        var children = this.$.children('.nav');
        children.find('.nav').closest('li').addClass('nav-parent');
        children.find('.nav > li.active').closest('li').addClass('active');
        children.find('.nav-parent > a').append('<i class="' + this.options.foldicon + ' nav-parent-fold-icon"></i>');

        this.handleFold();
    }

    Menu.prototype.handleFold = function()
    {
        var auto = this.options.auto;
        var $menu = this.$;

        this.$.find('.nav-parent > a').click(function(event)
        {
            if(auto)
            {
                $menu.find('.nav-parent.show').find('.nav').slideUp(function(){$(this).closest('.nav-parent').removeClass('show')});
                $menu.find('.icon-rotate-90').removeClass('icon-rotate-90');
            }

            var li = $(this).closest('.nav-parent');;
            if(li.hasClass('show'))
            {
                li.find('.icon-rotate-90').removeClass('icon-rotate-90');
                li.find('.nav').slideUp(function(){$(this).closest('.nav-parent').removeClass('show')});
            }
            else
            {
                li.find('.nav-parent-fold-icon').addClass('icon-rotate-90');
                li.find('.nav').slideDown(function(){$(this).closest('.nav-parent').addClass('show')});
            }

            event.preventDefault();
            return false;
        });
    }

    $.fn.menu = function(option)
    {
        return this.each(function()
        {
            var $this   = $(this);
            var data    = $this.data('zui.menu');
            var options = typeof option == 'object' && option;

            if (!data) $this.data('zui.menu', (data = new Menu(this, options)));

            if (typeof option == 'string') data[option]();
        })
    };

    $.fn.menu.Constructor = Menu;

    $(function()
    {
        $('[data-toggle="menu"]').menu();
    });
}(jQuery,window,document,Math);
