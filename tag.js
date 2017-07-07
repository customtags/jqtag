define({
    "name": "tag",
    "modules": ["pitana"]
}).as(function (jqtag, pitana) {

    var bindDomEvents = function (self, adapterName, events) {
        //We use {"eventName hash":"handler"} kind of notation !
        pitana.util.for(events, function (methodName, key) {
            key = key.trim().replace(/ +/g, " ");
            var arr = key.split(" ");
            var eventName = arr.shift();
            var htmlTag = arr.shift();
            var hash = htmlTag + "[jq-adapter='" + adapterName + "'] " + arr.join(" ");
            var callback = pitana.domEvents.addLiveEventListener(document, eventName, hash, self[methodName], self);
        });
    };

    return {
        trigger: function (elem, eventName, detail) {
            return pitana.domEvents.trigger(elem, eventName, detail);
        },
        _pitana_register_: function (moduleName, _jqTagConfig_) {
            if (_jqTagConfig_.tagName === undefined) {
                _jqTagConfig_.tagName = moduleName.replace(/\./g, "-");
                if (_jqTagConfig_.tagName.indexOf("-") === -1) {
                    _jqTagConfig_.tagName = "tag-" + _jqTagConfig_.tagName;
                }
            }
            console.error("_pitana_register_", _jqTagConfig_.tagName);
            return pitana.register(_jqTagConfig_);
        },
        registerTag: function (modeulName,options) {
            var _modeulName = modeulName || this.__moduleName__;
            var _options = options || this;
            this._pitana_register_(_modeulName, _options);
        },
        META_KEYS: {},
        key: function (e) {
            var keyCode = e;
            if (typeof e !== 'string') {
                keyCode = e.which || e.keyCode;
            }
            return jqtag.META_KEYS[keyCode] || {};
        },
        key_codes: (function () {
            var key_codes = {
                8: "backspace", 9: "tab", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
                20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home",
                37: "left", 38: "up", 39: "right", 40: "down", 45: "insert", 46: "del",
                96: "0", 97: "1", 98: "2", 99: "3", 100: "4", 101: "5", 102: "6", 103: "7",
                104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".", 111: "/",
                112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8",
                120: "f9", 121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 191: "/", 224: "meta"
            };
            var self = this;
            self.META_KEYS = self.META_KEYS || {};
            for (var i in key_codes) {
                self.META_KEYS[i] = {name: key_codes[i], code: i};
            }
            //Navigation Keys
            ;
            [9, 13, 37, 38, 39, 40].map(function (code) {
                self.META_KEYS[code].isNavKey = true;
            });
            ;
            [37, 39].map(function (code) {
                self.META_KEYS[code].isNavX = true;
            });
            ;
            [38, 40].map(function (code) {
                self.META_KEYS[code].isNavY = true;
            });
            return key_codes;
        })(),
        adapter: {
            bind: function (self) {
                return bindDomEvents(self, self.name, self.events)
            }
        },
        _ready_: function () {
            console.error("customTag is ready");
        }

    }
});