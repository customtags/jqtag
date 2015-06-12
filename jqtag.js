_define_('jqtag',function(jqtag,_jqtag_){
	
	_require_(":pitana/pitana.js");
	var pitana = _module_("pitana");
	
	jqtag._extend_ = function(tag,_tag_){
		tag._jqTagConfig_ = {};
		tag._jqTagConfig_ = tag._definition_(tag,tag._jqTagConfig_) || tag._jqTagConfig_;
	};

	jqtag.register = function(config){
		this._jqTagConfig_ = config || {};
	};
	
	jqtag.trigger = function(elem,eventName, detail){
		return pitana.domEvents.trigger(elem, eventName, detail);
	};
	
	jqtag._extended_ = function(tag,_tag_){
		var parentConfig = tag.parent()._jqTagConfig_ || {};
		tag._jqTagConfig_ = $.extend(true,parentConfig,tag._jqTagConfig_);
		jqtag._pitana_register_(tag.module,tag._jqTagConfig_);
	};
	jqtag._pitana_register_ = function(moduleName,_jqTagConfig_){
		if(_jqTagConfig_.tagName === undefined){
			_jqTagConfig_.tagName = moduleName.replace(/jqtags\./,"jq-").replace(/\./g,"-");
		}
		return pitana.register(_jqTagConfig_)
	};
	
	jqtag.META_KEYS = {};
	
	jqtag.key = function(e){
		var keyCode = e;
		if(typeof e !== 'string'){
			keyCode = e.which || e.keyCode;
		}
		return jqtag.META_KEYS[keyCode] || {}; 
	};
	
	jqtag.key_codes = {
		8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
		20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
		37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 
		96: "0", 97: "1",98 : "2", 99 : "3", 100 : "4", 101 : "5", 102 : "6", 103 : "7",
		104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111 : "/", 
		112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 
		120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"	
	};
	
	(function(){
		for(var i in jqtag.key_codes){
			jqtag.META_KEYS[i] = { name : jqtag.key_codes[i], code : i}
		}
		//Navigation Keys
		;[9,13,37,38,39,40].map(function(code){
			jqtag.META_KEYS[code].isNavKey = true;
		});
		;[37,39].map(function(code){
			jqtag.META_KEYS[code].isNavX = true;
		});
		;[38,40].map(function(code){
			jqtag.META_KEYS[code].isNavY = true;
		});
		
	})();
	
	
});

(function(foo) {
	
	var jqtag = _module_("jqtag");
	var pitana = _module_("pitana");
	
	foo._tag_ = function(tagName,definition){
		if(utils!==undefined && typeof utils.define === 'function'){
			return utils.define(tagName).extend('jqtag').as(definition);
		} else {
			var module = _define_(tagName,'jqtag',definition);
			return jqtag._pitana_register_(tagName,module._jqTagConfig_ || module)
		}
	};
	
})(this);