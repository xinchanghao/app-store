(function() {

    var cookie = {
        'set': function (name, value, options) {
            var expire = "";
            var days = options.days || null;
            var path = options.path;
            var domain = options.domain;
            var secure = options.secure;

            if (days) {
                expire = new Date(new Date().getTime() + days * 24 * 3600000);
                expire = "; expires=" + expire.toGMTString();
            }

            document.cookie = name + "=" + escape(value) + expire + ((path) ? '; path=' + path : '') + ((domain) ? '; domain=' + domain : '') + ((secure) ? '; secure' : '');
        },

        'get': function(name) {
            var search = name + "=", cookie = document.cookie;
            var offset = cookie.indexOf(search);

            if (!cookie.length || offset === -1) return '';

            offset += search.length;
            end = cookie.indexOf(";", offset);
            if (end == -1) end = cookie.length;
            return unescape(cookie.substring(offset, end));
        }
    }

    function getmid () {
        var guid = cookie.get('m2')

        if (!guid) {
            guid = genmid()
            cookie.set('m2', guid, {days: 365, domain: location.hostname})
        }

        return guid
    }

    function genmid() {
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
    }

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)
    }

    function sendLog(baseUrl, params) {
        var id = '__log' + Date.now() + Math.random().toString(36).slice(-5),
            img = window[id] = new Image()
        img.onload = img.onerror = function() {
            if(window[id]) {
                window[id] = null
                delete window[id]
            }
        }
        var query = []
        for(var key in params) {
            query.push(encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
        }
        img.src = baseUrl + (baseUrl.indexOf('?') > -1 ? '&' : '?') + query.join('&')
    }

    function querystring(param, url) {
        url = (url || location.href).replace(/#.*$/, '')
        var queries = url.substring(url.indexOf('?') + 1).split('&') || []
        var result = {}

        for (var item, i = 0, len = queries.length; i < len; i++) {
            item = queries[i].split('=')
            result[decodeURIComponent(item[0])] = decodeURIComponent(item[1])
        }

        return param ? result[param] || '' : result
    }

    function record(sid, act, pos) {
        if (arguments.length < 3) return;

        var queries = {
            'u': location.href.replace(/[?#].*$/, ''),
            'ver': '',
            'mid': getmid(),
            'cid': 1,
            'from': 1,
            'act': act,
            'sid': sid,
            'market_id': '',
            'pos': pos,
            'tj': '',
            'refer': querystring('recrefer'),
            '_': Math.random()
        }

        sendLog('http://s.360.cn/zhushou/soft.html', queries)
    }

    /** 点睛 */
    /**
     * [DianJing]
     * @required Zepto.js, Client.js
     */
    function DianJing() {}

    // cid: (整型) 展现广告时的channel id. <点睛和手助约定好的频道id>
    DianJing.CID = 59;

    // pid: (整型) 展现广告时的place id. <点睛和手助约定好的位置id>
    DianJing.PID = 356;

    // 点击打点 URL
    DianJing.CLICK_URL = '//e.tf.360.cn/b/click';

    // PV 打点 URL
    DianJing.PV_URL = '//e.tf.360.cn/b/pv';

    // 展示时间戳
    DianJing.START_TIME = 0;

    /**
     * 发送点睛PV打点
     */
    DianJing.pv = function() {
        var queries = querystring()
        var m2 = getmid()
        var params = {
            mid: m2,
            m2:  m2,
            pid: DianJing.PID,
            cid: DianJing.CID,
            st: Date.now() // 广告开始展示时间. 单位：毫秒(13位整型)
        }
        var pvData = []

        DianJing.START_TIME = params.st

        $('.app-item').each(function(i, n){
            var el = $(n);
            if (el.data('_pv') || el.css('display') == 'none' || el.css('visibility') == 'hidden') return;
            el.data('_pv', true);
            pvData.push({asin: decodeURIComponent(el.data('asin') || '').split('=')[1], adindex: el.index()});
        });
        pvData = pvData.filter(function(n){ return n.asin; });
        while (pvData.length) {
            var part = pvData.splice(0, 5);
            sendLog(DianJing.PV_URL, $.extend(params, {asin: JSON.stringify(part)}));
        }
    };

    /**
     * 发送点击打点
     * @param  {String} asin asin
     */
    DianJing.click = function(asin, index, options) {
        options || (options = {})
        if (!asin) return;
        var m2 = getmid(),
            ud = Date.now(), // 广告触发的时间点
            params = {
                asin:    asin,
                clickip: '',
                st:      DianJing.START_TIME,
                ct:      options.ct || ud, // 用户点下时间. 单位：毫秒(13位整型)
                ut:      options.ut || ud, // 用户抬起时间. 单位：毫秒(13位整型)
                adindex: index || 0,
                from:    options.detail ? 1 : 2,
                mid:     m2,
                m2:      m2
            };
        sendLog(DianJing.CLICK_URL, params);
    };


    window.getmid = getmid
    window.record = record
    window.DianJing = DianJing


})()
