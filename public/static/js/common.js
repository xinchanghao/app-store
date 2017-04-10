/**
 *  var list = new List({
 *  	params : {type : 1, name : 'xxx'}, 
 *      page : 1, template : '', 
 *      url : '/data/'
 *  });
 */
function List(config) {
	this.config = config || {};
	this.dom = {};
	this.page = config.page || 0;
	this.params = config.params || {};
	this.dataType = config.dataType || 'json';

	this.url = this.config.url;
	this.template = config.template || $('#app_item_template').html();
	
	this.dom.container = config.container;	
	this.dom.loadMore = config.loadMore;

	this.init();
}

$.extend(List.prototype, {
	init : function() {		
		var me = this;

		if (this.dom.loadMore) {
			this.dom.loadMore.on('click', function(evt){
				evt.preventDefault();

				me.load();
			});	
		}
	},

	getItemData : function(item) {
		return item;
	},

	getData : function(data) {
		return data;
	},

	load : function(param) {
		param = param || {};
		this.page += 1;
		this.params = $.extend(this.params, param);

		var param = $.extend({page : this.page, requestType : 'ajax', _t : (new Date).getTime()}, this.params);
		var url = this.url + '?' + $.param(param);
		var me = this;

		$.getJSON(url, function(data){
			var list = me.getData(data);
			var html = [];

			me.processData && me.processData(data);

			if (list.length == 0) {
				me.dom.loadMore && me.dom.loadMore.html('没有了').hide();
				return;
			}
						
			for (var i = 0, len = list.length; i < len; i++) {
				var item = list[i];
				if (item) {
					item.rating && (item.rating *= 10);
					html.push(Mustache.render(me.template, me.getItemData(item, i)));
				}
			}

			me.dom.container.append(html.join(''));
			me.onUpdate && me.onUpdate();
		});
	}
});

// Tab Switch
function Switcher(config) {
	this.config = config;
	this.container = config.container;

	if (!this.container) {
		return;
	}

	this.eventType = config.eventType || 'click';

	this.init();
}

$.extend(Switcher.prototype, {
	init : function() {
		var me = this;
		this.container.each(function(){
			var container = $(this);
			container.delegate('.switcher-tab', me.eventType, function(evt) {
				var tab = $(this);
				var index = tab.index();
			
				if (me.eventType == 'click') {
					evt.preventDefault();
				}

				if (tab.hasClass('cur')) {
					return false;
				}

				var tabs = container.find('.switcher-tab');
				var panels = container.find('.switcher-panel');

				tabs.removeClass('cur');
				tabs.eq(index).addClass('cur');

				panels.hide().removeClass('switcher-panel-cur');
				panels.eq(index).show().addClass('switcher-panel-cur');

				me.onTabSwitch && me.onTabSwitch.call(this, index, tab, panels.eq(index), container);
			});
		});
	}
});


var Pinner = {
	list : [],

	add : function(selector) {
		var pinners = $(selector);
		var me = this;

		pinners.each(function(){
			$(this).parent().css('height', $(this).offset().height);
		});

		$(window).on('scroll', function(evt){
		//$(document).on('touchmove', function(evt){
			var scrollTop = document.body.scrollTop;
			var height = 0;

			pinners.each(function(){
				var pinner = $(this);
				var pinnerHolder = pinner.parent();

				if (scrollTop >= pinnerHolder.offset().top) {
					pinner.css('position', 'fixed');
				} else {
					pinner.css('position', '');
				}
			});
		});
	}
};

var CustomFx = {
	run : function(fn, duration, fxName) {
		var start = new Date();
		var end = start.getTime() + duration;
		var me = this;
		function fx() {
			var now = new Date;
			if (now >= end) {
				fn(1);
			} else {
				fn( me.effects.power((now - start) / duration));
				setTimeout(arguments.callee, 50);
			}
		}

		fx();
	},

	effects : {
		line : function(x) {
			return x;
		},

		power : function(x) {
			return x * x * x * x;
		}
	}
};

var Util = {
	firstview : function() {
		$('.firstview')[0] && $('.firstview').last()[0].scrollIntoView();
	},

	byteLen: function(s) {
		return s.replace(/[^\x00-\xff]/g, "--").length;
	},

	subByte: function(s, len, tail) {
		if (this.byteLen(s) <= len) {return s; }
		tail = tail || '';
		len -= this.byteLen(tail);
		return s.substr(0, len).replace(/([^\x00-\xff])/g, "$1 ") //双字节字符替换成两个
			.substr(0, len) //截取长度
			.replace(/[^\x00-\xff]$/, "") //去掉临界双字节字符
			.replace(/([^\x00-\xff]) /g, "$1") + tail; //还原
	},

	getQuery : (function() {
	    var query = window.location.search.substr(1);
	    var parts = query.split('&');
	    var queryObj = {}; // url参数

	    for (var i = 0, len = parts.length; i < len; i++) {
	        var kv = parts[i].split('='), value;

	        try {
	            value = decodeURIComponent(kv[1]);
	        } catch(e){
	            value = kv[1];
	        }

	        queryObj[kv[0]] = value;
	    }
	    
	    return function(key) {
	        if (typeof key == 'undefined') {
	            return queryObj;
	        }
	        
	        return queryObj[key];
	    };
	})(),

	showToast : (function(){
	    var timer, hideTimer;
	    var $el;
	    
	    return function(message) {
	      if (!$el) {
	        createElement();
	      }

	      if (timer) clearTimeout(timer);
	      timer = setTimeout(function(){
	        show(message);
	      }, 10);
	    };

	    function createElement() {
	      $el = $('<div><div style="position:fixed;width:100%;height:100%;left:0;top:0;z-index:1000;display:-webkit-box;-webkit-box-orient:vertical;-webkit-box-pack:center;-webkit-box-align:center;"><span class="_message" style="display:inline-block;padding:.5em 1em;background:rgba(0,0,0,.8);color:#fff;border-radius:4px;"></span></div></div>');

	      $el.appendTo(document.body);
	    }
	    
	    function show(message) {
	      $el.show().css('opacity', '1').find('._message').html(message);

	      hideTimer && clearTimeout(hideTimer);
	      hideTimer = setTimeout(function(){
	        $el.animate({
	          opacity : 0
	        }, {
	          duration : 1000,
	          complete : function() {
	            $el.hide();
	          }
	        })
	      }, 2500);
	    }
	})()
};

// 一些通用功能
$(function(){
	// 返回
	$('.go-back').on('click', function(evt){
		evt.preventDefault();
		history.go(-1);
	});


	// 跳转到详情页
	$(document).delegate('.app-item, .link', 'click', function(evt) {
		var target = $(evt.target);
		var downBtn = target.closest('.dl-btn, .js-downloadBtn');
		if (downBtn[0]) {
			return true;
		}

		window.location = $(this).data('href');
	});


	// 设定pinholder高度
	Pinner.add('.pin');

	// 返回顶部
	$('.goto-bar').on('click', function(evt){
		evt.preventDefault();
		document.body.scrollTop = 0;
	});


	$(document).delegate('.lists li', 'touchstart', function(evt){
		var li = $(this);
		li.parent().find('.hover').removeClass('hover');
		li.addClass('hover');
	}).on('touchend', function(){
		$(this).find('.hover').removeClass('hover');
	});

	// 搜索框为空时，设定默认搜索词
	$('#searchForm').on('submit', function(evt){
		var q = $('#q');
		if ($.trim(q.val()).length == 0) {
			q.val(q.attr('placeholder'));
		}
	});
});