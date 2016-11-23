var Tabs = new Class({
	
	Implements: [Options, Events], 

		options: {
			tab: '.tab',
			content: '.section',
			currentClass: 'current'
		},

	jQuery: 'tabs',

	initialize: function(selector, options){
		this.setOptions(options); // inherited from Options like jQuery.extend();
		this.container = jQuery(selector); // cache the jQuery object
		this.tabs = this.container.find(this.options.tab);
		this.contents = this.container.find(this.options.content);
		this.currentTab = jQuery(this.contents[0]);
		// proxy some methods so we can easily unbind them
		// and having events handled in their own methods
		// makes extending much easier
		this.proxied = {
		  tabClick: jQuery.proxy(this.tabClickHandler, this)
	  };
		this.setup().attach(); // can chain if methods return `this`
		jQuery(this.tabs[0]).trigger('click', true);
	},
	
	setup: function(){
		if (this.container.css('position') != 'absolute') {
			this.container.css('position', 'relative');
		}
		this.contents.hide();
		return this;
	},

	attach: function(){
	  this.tabs.bind('click', this.proxied.tabClick);
		return this;
	},

	detach: function(){
		this.tabs.unbind('click', this.proxied.tabClick);
		return this;
	},

	tabClickHandler: function(event, force){
		event.preventDefault();
		var index = this.tabs.index(event.currentTarget);
		if (force || this.contents.index(this.currentTab[0]) != index) this.show(index);
	},

	show: function(index){
		this.fireEvent('show'); // like a callback
		this.tabs.removeClass(this.options.currentClass);
		jQuery(this.tabs[index]).addClass(this.options.currentClass);
		this.currentTab.hide();
		this.currentTab = jQuery(this.contents[index]).show();
		return this;
	}

});

