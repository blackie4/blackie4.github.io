/**
 * server
 * Created by binoYip on 2017/01/01.
 */

require('@ali/pca');
require('@ali/pp-zepto');
import Url from '@ali/pp-utils/src/url';
import { UC_PARAM_STR } from 'constant/constant';
import {
  get,
  post
} from 'server/protocol';

// 请求热门搜索词
export function getSearchKeysHot(host, opt, onSuccess, onError) {
  get(host + '/StoreSearchController/hotKeywords', opt, onSuccess, onError);
};

// 请求默认搜索词
export function getSearchKeysDefault(host, opt, onSuccess, onError) {
  get(host + '/StoreSearchController/defaultKeywords', opt, onSuccess, onError);
};

// 首页头部配置信息 包括：1,banner 2,二级导航 接口支持参数：bannerSpaceId、naviSpaceId
export function getHomePageConfig(host, naviSpaceId, onSuccess, onError) {
  var params = '';

  if (naviSpaceId) {
    params = '?naviSpaceId=' + naviSpaceId;
  }
  get(host + '/StoreIndexController/banner' + params, {}, onSuccess, onError);
}

// 首页应用列表（包含推荐位广告）获取
export function getHomePageList(host, offset, opt, onSuccess, onError) {
  var url = host + '/StoreIndexController/applist2?offset=' + offset;
  get(url, opt, onSuccess, onError);
};

/**
 * 【应用/单机】页“推荐”栏数据
 * @param [Number] resourceType - 资源类型(0:应用, 1:单机)
 * @param [Number] offset - 从0开始
 */
export function getRecommend(host, resourceType, offset, opt, onSuccess, onError) {
    var url = host + '/StoreSoftGameController/recommend2?resourceType=' + resourceType + '&offset=' + offset;

    get(url, opt, onSuccess, onError);
};

/**
 * 获取应用列表
 * @param flags - 标志，详见：应用相关请求中参数：flags字段说明
 * @param positionId - 推荐位ID
 * @param offset - 起始位置
 * @param count - 请求的记录数
 * @param onSuccess
 * @param onError
 */
export function getRecommendAppList(host, clientInfo, flags, positionId, offset, count, onSuccess, onError) {
  post(host + '/api/proxyNew', {
    urlKey: 'op.rec.app.list',
    uuid: clientInfo.uuid || '',
    svr: clientInfo.svr,
    flags: flags || 193,
    positionId: positionId,
    offset: offset || 0,
    count: count || 50,
    osVersion: 19
  }, onSuccess, onError);
};

/**
 * 获取相关应用推荐列表
 * @param appIds - 需要推荐的appids(数组)
 * @param source - 请求来源：0（精选页）、1（软件页）、2（游戏页）、3（应用详情页）、4（下载管理页）、5（更新页）
 * @param count - 推荐数
 * @param onSuccess
 * @param onError
 */
export function getRelateList(host, clientInfo, appIds, source, count, onSuccess, onError) {
  var ua = navigator && navigator.userAgent ? navigator.userAgent : 'ucPlugin';
  post(host + '/api/proxyNew', {
    urlKey: 'op.rec.personality.listRelatedApps',
    uuid: clientInfo.uuid || '',
    svr: clientInfo.svr,
    appIds: appIds,
    ua: ua,   // 客户端标识
    source: source || 0,
    num: count || 3,
    osVersion: 19
  }, onSuccess, onError);
};

/**
 * 举报应用
 * @param packageName - 应用包名
 * @param versionCode - 应用版本号
 * @param downloadUrl - 应用下载地址（apk地址需包含md5参数）
 * @param resourceType - 应用类型：0表示软件 ，1表示游戏
 * @param categoryId - 应用分类ID
 * @param descr - 举报说明
 * @param onSuccess
 * @param onError
 */
export function reportApp(host, clientInfo, packageName, versionCode, downloadUrl, resourceType, categoryId, descr, onSuccess, onError) {
    post(host + '/api/jubao/12321', {
        uuid: clientInfo.uuid || '',
        svr: clientInfo.svr,
        packageName: packageName,
        versionCode: versionCode,
        downloadUrl: downloadUrl,
        resourceType: resourceType,
        categoryId: categoryId,
        descr: descr
    }, onSuccess, onError);
};

// 获取所有分类
export function getComCategory(host, clientInfo, resourceType, onSuccess, onError) {
  post(host + '/api/proxyNew', {
    urlKey: 'resource.category.getList',
    uuid: clientInfo.uuid || '',
    svr: clientInfo.svr,
    resourceType: resourceType,
    page: 1,
    count: 100,
    osVersion: 19
  }, onSuccess, onError);
};

/**
 * 【应用/单机】页“分类”栏数据
 * @param [Number] resourceType - 资源类型(0:应用, 1:单机)
 * @param [Number] page - 页数，从1开始
 */
export function getCategory(host, resourceType, page, opt, onSuccess, onError) {
    var url = host + '/StoreSoftGameController/category?resourceType=' + resourceType + '&page=' + page;

    get(url, opt, onSuccess, onError);
};

/**
 * 获取分类详情
 */
export function getCategoryDetail(host, resourceType, categoryId, onSuccess, onError) {
    get(host + '/StoreSoftGameController/subcategory', {resourceType: resourceType, categoryId: categoryId}, onSuccess, onError);
}


/**
 * 【应用/单机】页“排行”栏数据 - 综合排行数据
 * @param [Number] resourceType - 资源类型(0:应用, 1:单机)
 * @param [Number] page - 页数，从1开始
 */
export function getComRanking(host, resourceType, page, count, opt, onSuccess, onError) {
    var url = host + '/StoreSoftGameController/comranking';

    url = Url.queryFormat(url, {
        resourceType: resourceType,
        page: page,
        count: count
    });
    get(url, opt, onSuccess, onError);
};

/**
 * 【分类排行】页数据 - 月度排行数据
 * @param [Number] resourceType - 资源类型(0:应用, 1:单机)
 * @param [Number] categoryId (非必填)
 * @param [Number] subCategoryId (非必填)
 * @param [Number] page - 页数，从1开始
 */
export function getRanking(host, resourceType, categoryId, subCategoryId, page, opt, onSuccess, onError) {
  var url = host + '/StoreSoftGameController/ranking';

  url = Url.queryFormat(url, {
    resourceType: resourceType,
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    page: page
  });
  get(url, opt, onSuccess, onError);
};

/**
 * 网游列表
 */
export function getWebgameList(host, offset, count, opt, onSuccess, onError) {
  var url = host + '/StoreSoftGameController/netgame';

  url = Url.queryFormat(url, {
    offset: offset,
    count: count
  });
  get(url, opt, onSuccess, onError);
};

// 搜索
export function search(host, keyword, page, opt, onSuccess, onError) {
  var url = host + '/StoreSearchController/search';

  url = Url.queryFormat(url, opt);
  post(url, {q: keyword, page: page}, onSuccess, onError);
};

// 联想搜索
export function appsugs(host, keyword, onSuccess, onError) {
  post(host + '/StoreSearchController/appsugs', {q: keyword}, onSuccess, onError);
};

// 有奖活动列表
export function appActivityList(host, type, offset, count, opt, onSuccess, onError) {
  var url = host + '/StoreActivityController/simple';

  url = Url.queryFormat(url, {
    type: type,
    offset: offset,
    count: count
  });
  get(url, opt, onSuccess, onError);
};

// 有奖活动详情
export function appActivityDetail(host, type, appId, opt, onSuccess, onError) {
  var url = host + '/StoreActivityController/detail';

  url = Url.queryFormat(url, {
      type: type,
      appId: appId
  });
  get(url, opt, onSuccess, onError);
};


/**
 * 汇川广告位
 * @param [Object] sysInfo{}
 *  sysInfo.slotCode - 广告位编号
 *  sysInfo.device - 设备型号
 *  sysInfo.access - 网络类型
 *  sysInfo.utdid - 阿里统一设备id
 *  sysInfo.aid - 阿里统一用户id
 *  sysInfo.mac - 客户端mac地址
 * @param onSuccess
 * @param onError
 */
export function getSpaceHc(host, sysInfo, onSuccess, onError) {
  get(host + '/StoreUpdateController/spacehc', sysInfo, onSuccess, onError);
};

/**
 * 【更新】个数
 * @param [String] items - 浏览器返回的已安装应用数据
 */
export function updateCount(host, items, onSuccess, onError) {
  post(host + '/StoreUpdateController/updatecount', {items: items}, onSuccess, onError);
};

/**
 * 【更新】数据
 * @param [String] items - 浏览器返回的已安装应用数据
 */
export function updateList(host, items, opt, onSuccess, onError) {
  opt = $.extend({items: items, listType: 0}, opt);
  post(host + '/StoreUpdateController/updatelist', opt, onSuccess, onError);
};

/**
 * 【插件】上传已安装应用数据，服务器拿到后方便过滤已安装
 * @param items - 插件接口获取的M9串
 */
export function uploadInstalledAppsM9(host, items, onSuccess, onError) {
  if(!items) {
      return ;
  }

  post(host + '/StoreUpdateController/userinfo', {items: items}, onSuccess, onError);
  //post('http://100.84.52.236:9020/StoreUpdateController/userinfo', {items: items}, onSuccess, onError);
};

/**
 * 【忽略更新】数据
 * @param [String] items - 浏览器返回的已安装应用数据
 */
export function ignoreList(host, items, opt, onSuccess, onError) {
  opt = $.extend({items: items, listType: 1}, opt);
  post(host + '/StoreUpdateController/updatelist', opt, onSuccess, onError);
};

// 更新推荐列表(大家都在更新)
export function updateRecommend(host, onSuccess, onError) {
  get(host + '/StoreUpdateController/recommend', {offset: 0}, onSuccess, onError);
};

// 忽略更新
export function ignoreUpdate(host, packageName, onSuccess, onError) {
  get(host + '/StoreUpdateController/ignore', {packageName: packageName}, onSuccess, onError);
};

// 忽略更新
export function ignoreUpdateCancel(host, packageName, onSuccess, onError) {
  get(host + '/StoreUpdateController/ignoreCancel', {packageName: packageName}, onSuccess, onError);
};

// 更新页广告位
export function getUpdateSpace(host, onSuccess, onError) {
  get(host + '/StoreUpdateController/space', {offset: 0}, onSuccess, onError);
};

// 应用接口
export const App = {
  // 应用下载
  download: function(dlHost, appId, opt) {
    var url = dlHost + '/download/apk?appId=' + appId;
    if(!opt || typeof opt !== 'object') {
        opt = {};
    }
    opt.uc_param_str = UC_PARAM_STR;
    location.href = Url.queryFormat(url, opt);
  },

  // 下载PP助手
  downloadPP: function(host, channel) {
    if(!channel) {
        channel = 'PP_27'; // 默认下载渠道为27
    }
    location.href = host + '/pp/apk?channel=' + channel + '&uc_param_str=' + UC_PARAM_STR;
  },

  // 获取PP助手下载地址
  getPPUrl: function(host, channel, onSuccess, onError) {
    get(host + '/pp/url', {channel: channel, uc_param_str: UC_PARAM_STR}, onSuccess, onError);
  },

  // 查询应用下载地址(高速下载用)
  getDownloadUrl: function(dlHost, appId, opt, onSuccess, onError) {
    if(!opt || typeof opt !== 'object') {
      opt = {};
    }
    get(dlHost + '/download/url/dot?appId=' + appId + '&apprd=' + appId, opt, onSuccess, onError);
  },

  // 查询应用下载地址（服务器不打点）
  getDownloadUrlPure: function(dlHost, appId, onSuccess, onError) {
    get(dlHost + '/download/url', {appId: appId}, onSuccess, onError);
  },

  // 获取应用详情
  getDetail: function(host, appId, opt, onSuccess, onError) {
    var url = host + '/StoreDetailController/detail?appId=' + appId;

    if(!opt) {
        opt = {};
    }
    if(!opt.ch_src) {
        opt.ch_src = 'pp';
    }
    get(url, opt, onSuccess, onError);
  },

  // 获取应用评分，5星满分
  getScore: function(host, appId, versionId, onSuccess, onError) {
    get(host + '/StoreDetailController/score', {appId: appId, versionId: versionId}, onSuccess, onError);
  },

  // 热门评论
  comment: function(host, appId, page, onSuccess, onError) {
    get(host + '/StoreDetailController/comment', {appId: appId, page: page}, onSuccess, onError);
  },

  // 应用详情页猜你喜欢
  recs: function(host, packageName, onSuccess, onError) {
    get(host + '/StoreDetailController/recs', {q: packageName}, onSuccess, onError);
  },

  // 应用详情页应用推荐
  subcates: function(host, appId, onSuccess, onError) {
    get(host + '/StoreDetailController/subcates', {appId: appId}, onSuccess, onError);
  },

  // 应用所属专题推荐
  specials: function(host, appId, onSuccess, onError) {
    get(host + '/StoreDetailController/specials', {appId: appId, specialNum: 2}, onSuccess, onError);
  }
}

// 日志打点接口
export const Log = {
  click: function(host, json, onSuccess, onError) {
    try {
      //http.get(_host + '/StoreStatisticsController/click', json, onSuccess, onError);
      var url = host + '/StoreStatisticsController/click';

      if(!json || typeof json !== 'object') {
        onError();
        return;
      }
      json.uc_param_str = UC_PARAM_STR;

      $.ajax({
        type: 'get',
        url: url,
        async: false, // 改为同步方法
        dataType: 'json',
        data: json,
        xhrFields: {
          withCredentials: true // 设为true，不然跨域服务器拿不到cookie
        },
        success: function (ret) {
        },
        error: function () {
        }
      });
    } catch(e) {
      console.log('e:' + e);
    }
  },
  access: function(host, json, onSuccess, onError) {
    post(host  + '/log/access', json, onSuccess, onError);
  }
};

export const Ad = {
  getAdInfo: function(host, adId, onSuccess, onError) {
    get(host + '/StoreAdsController/space', {id: adId}, onSuccess, onError);
  }
};


