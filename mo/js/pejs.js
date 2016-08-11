/*!
 * 错误上报
 * @module PEJS
 * PP Error 错误
 * Production Engineer 生产工程师
 * 屁js
 */

var ERR_REPORT = (function(global) {
    var _error = [];
    var _error_map = {};
    var _config = {
        user: '', // 用户名称
        url: 'http://100.84.242.67:7001/report/bad', // 上报接口
        combo: 0, // 是否合并 !0-合并 0-不合并
        delay: 1000, // 延迟上报 combo 为 true 时有效
        submit: null, // 自定义上报方式
        repeat: 1 // 重复上报次数(对于同一个错误超过多少次不上报)
    };

    // 校验权限
    var _verifyPermission = function(config) {
    	if (!config.user) {
    		console.error('请填写用户名！');
    		return false;
    	}
    	// if (!/pp\.cn$/gi.test(location.hostname)) {
    	// 	console.error('该域名没有权限访问！');
    	// 	return false;
    	// }
    	return true;
    }

    // 校验对象类型
    var _isOBJ = function(obj) {
        var type = typeof obj;
        return type === "object" && !!obj;
    };


    var _isOBJByType = function(o, type) {
        return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
    };


    var _isEmpty = function(obj) {
        if (obj === null) return true;
        if (_isOBJByType(obj, "Number")) {
            return false;
        }
        return !obj;
    };

    // 重写onerror，添加error监听
    var orgError = global.onerror;
    global.onerror = function(msg, url, line, col, error) {
        var newMsg = msg;

        if (error && error.stack) {
            newMsg = _processStackMsg(error);
        }

        if (_isOBJByType(newMsg, "Event")) {
            newMsg += newMsg.type ?
                ("--" + newMsg.type + "--" + (newMsg.target ?
                    (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : "";
        }

        report.push({
            msg: newMsg,
            target: url,
            rowNum: line,
            colNum: col
        });

        // _send();
        orgError && orgError.apply(global, arguments);
    };

    var _processError = function(errObj) {
        try {
            if (errObj.stack) {
                var url = errObj.stack.match("https?://[^\n]+");
                url = url ? url[0] : "";
                var rowCols = url.match(":(\\d+):(\\d+)");
                if (!rowCols) {
                    rowCols = [0, 0, 0];
                }

                var stack = _processStackMsg(errObj);
                return {
                    msg: stack,
                    rowNum: rowCols[1],
                    colNum: rowCols[2],
                    target: url.replace(rowCols[0], "")
                };
            } else {
                //ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
                if (errObj.name && errObj.message && errObj.description) {
                    return {
                        msg: JSON.stringify(errObj)
                    };
                }
                return errObj;
            }
        } catch (err) {
            return errObj;
        }
    };

    var _processStackMsg = function(error) {
        var stack = error.stack
            .replace(/\n/gi, "")
            .split(/\bat\b/)
            .slice(0, 9)
            .join("@")
            .replace(/\?[^:]+/gi, "");
        var msg = error.toString();
        if (stack.indexOf(msg) < 0) {
            stack = msg + "@" + stack;
        }
        return stack;
    };

    // 将错误对象转换成参数字符串
    var _error_tostring = function(error, index) {
        var param = [];
        var params = [];
        var stringify = [];
        if (_isOBJ(error)) {
            // error.level = error.level || _config.level;
            for (var key in error) {
                var value = error[key];
                // console.info(key +': '+value);
                if (!_isEmpty(value)) {
                    if (_isOBJ(value)) {
                        try {
                            value = JSON.stringify(value);
                        } catch (err) {
                            value = "[ERR_REPORT detect value stringify error] " + err.toString();
                        }
                    }
                    stringify.push(key + ":" + value);
                    param.push(key + "=" + encodeURIComponent(value));
                    params.push(key + "[" + index + "]=" + encodeURIComponent(value));
                }
            }
        }

        // msg[0]=msg&target[0]=target -- combo report
        // msg:msg,target:target -- ignore
        // msg=msg&target=target -- report with out combo
        return [params.join("&"), stringify.join(","), param.join("&")];
    };

    // 发送上报请求
    var _submit = function(url) {
        if (_config.submit) {
            _config.submit(url);
        } else {
            var _img = new Image();
            // console.log(url);
            _img.src = url;
        }
    };


    var error_list = [];
    var comboTimeout = 0;
    var _send = function(isReoprtNow) {
        if (!_config.report) return;

        var error_str = '';
        for (var i = 0, len = _error.length; i < len; i++) {
        	if (_config.combo) {
                error_list.push(error_str[0]);
            } else {
                _submit(_config.report + _error_tostring(_error[i], 1)[2] + "&_t=" + (+new Date));
            }
        }

        // 合并上报 var error_str = _error_tostring(error, error_list.length);
        // var count = error_list.length;
        // if (count) {
        //     var comboReport = function() {
        //         clearTimeout(comboTimeout);
        //         _submit(_config.report + error_list.join("&") + "&count=" + error_list.length + "&_t=" + (+new Date));
        //         comboTimeout = 0;
        //         error_list = [];
        //     };

        //     if (isReoprtNow) {
        //         comboReport(); // 立即上报
        //     } else if (!comboTimeout) {
        //         comboTimeout = setTimeout(comboReport, _config.delay); // 延迟上报
        //     }
        // }
    };

    var report = {
    	// 主动将错误推到缓存池
        push: function(msg) {
            var data = _isOBJ(msg) ? _processError(msg) : {
                msg: msg
            };
            _error.push(data);
            _send();
            return report;
        },
        // 主动上报错误
        report: function(msg) {
            msg && report.push(msg);
            // _send(true);
            return report;
        },
        // 初始化
        init: function(config) {
        	// 参数合并
            if (_isOBJ(config)) {
                for (var key in config) {
                    _config[key] = config[key];
                }
            }

            // 校验权限
            if (_verifyPermission(config)) {
            	_config.report = (_config.url || "/pejs") +
                    "?id=1"+
                    "&user=" + _config.user +
                    "&from=" + encodeURIComponent(location.href) +
                    "&";
            }

            // 缓存对象中有err，则立即上报
            if (_error.length) {
                _send();
            }
            return report;
        },

        __onerror__: global.onerror
    };

    return report;

}(window));

if (typeof module !== "undefined") {
    module.exports = ERR_REPORT;
}