
// 高速下载功能
(function(){
    var Downloader = {
        init : function(container) {
            this.container = container;

            var self = this;
            container.on('click', '.js-close', function(evt){
                evt.preventDefault();
                self.hide();
            });

            $(document.body).on('mousedown touchstart', '.js-downloadBtn', function() {
                $(this).data('ct', Date.now())
            })


            var fuckQQBrowser = /MQQBrowser/i.test(navigator.userAgent);
            $(document.body).on('click', '.js-downloadBtn', function(evt){
                var btn = $(this);
                var apkUrl = btn.attr('href');
                var appItem = btn.closest('.app-item');
                var detailUrl = appItem.data('href');
                var rsid = /&id=(\d+)/i;
                var match = detailUrl.match(rsid);
                var inDetail = window.location.href.indexOf('/detail/index') > -1;
                var asin;

                // 点睛广告直接下载
                if (asin = decodeURIComponent(appItem.data('asin') || '').split('=')[1]) {
                    DianJing.click(asin, appItem.index(), {ct: btn.data('ct'), detail: inDetail})
                    return;
                }

                evt.preventDefault();
                if (match) {
                    var sid = match[1];

                    Spirit.detect(function(installed){
                        if (installed) {
                            posLog()
                            Spirit.install(sid);
                        } else {
                            // 以下情况走高速下载
                            // 1. 高速下载按钮
                            // 2. QQ浏览器
                            // 3. 勾选了通过360手机助手
                            var forceQstore = $('#qstoreChecker')[0] && $('#qstoreChecker')[0].checked;

                            if (btn.data('byzs') || fuckQQBrowser || forceQstore) {
                                posLog()
                                self.downloadWithZhushou(sid);
                            } else {
                                // 非详情页直接切换为高速下载
                                if (!inDetail) {
                                    posLog()
                                    self.downloadWithZhushou(sid);
                                } else {
                                    window.location.href = apkUrl;

                                    // 去掉弹窗
                                    // self.setup(apkUrl, sid).show();
                                    // $('.js-apk, .js-zhushou').off('mousedown').on('mousedown', posLog)
                                }
                            }
                        }
                    });
                }

                function posLog() {
                    record(sid, 'start', inDetail ? 'wapdown_detail' : 'wapdown');
                }
            });
        },

        show : function() {
            this.container.show();
        },

        hide : function() {
            this.container.hide();
        },

        downloadWithZhushou : function(sid) {
            var url = this.getBundleUrl(sid);

            window.location.href = url;
        },

        getBundleUrl : function(sid) {
            // var qihuStoreApk = 'http://api.np.mobilem.360.cn/redirect/down/?from=sjzs_100209&subfrom=&zsgs=1&appid=' + sid;
            // var apkUrl = 'http://api.np.mobilem.360.cn/redirect/down/?from=sjzs_100308&subfrom=&zsgs=1&appid=' + sid;
            // var apkUrl = 'http://api.np.mobilem.360.cn/redirect/down/?from=sjzs_110016&subfrom=&zsgs=1&appid=' + sid;
            var channel = 19;

            if (location.href.indexOf('from=qing') >= 0) {
                channel = 20;
            }

            var apkUrl = 'http://openbox.mobilem.360.cn/SpeedDownload/getSpeedUrl2?from=' + channel + '&appid=' + sid;

            return apkUrl;
        },

        setup : function(apk, sid) {
            this.container.find('.js-zhushou').attr('href', this.getBundleUrl(sid));
            this.container.find('.js-apk').attr('href', apk);

            return this;
        }
    };

    Downloader.init($('#apkDownloader'));
})();
