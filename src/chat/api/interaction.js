/**
 * 通用交互
 */
import API from './API';

// const authURL = 'https://user.niuguwang.com/api_wap/wechat/oauthLogin.aspx?oauthtype=wechat&back=';

/**
 * 获取queryString中的key
 */
export const search = (key) => {
  let res;
  let ss;
  let i;
  let sss;
  let s = window.location.search;
  if (s) {
    s = s.substr(1);
    if (s) {
      ss = s.split('&');
      for (i = 0; i < ss.length; i += 1) {
        sss = ss[i].split('=');
        if (sss && sss[0] === key) {
          res = sss[1];
        }
      }
    }
  }
  return res;
};

/**
 * 校验
 */
export const auth = () => {
  const token = search('userToken');  
  // const token = search('userToken') || Cookie.get('userToken');
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token);
    } else {
      reject('未登录!');
    }
  });
};

/**
 * 关注主播
 * op = 1 关注
 * op = 0 取消关注
 */
export const followAnchor = ({
  op,
  relationid,
  usertoken,
}) => {
  return new Promise((resolve, reject) => {
    API.followAnchor({
      op,
      relationid,
      usertoken,
    }).then((res) => {
      resolve(res);
    }, (err) => {
      reject(err);
    });
  });
};

/**
 * 限制性行为
 */
export const limitBehavior = () => {
  document.body.addEventListener('touchmove', (event) => {
    if (!document.querySelector('.content-wrap').contains(event.target)) {
      event.preventDefault();
    }
  }, false);
  document.body.addEventListener('touchstart', (event) => {
    if (!document.querySelector('.send-box-wrap').contains(event.target)) {
      document.querySelector('#txtMsg').blur();
    }
  }, false);
};

export const faceToImg = (content) => {
  return content.replace(/\[([0-9a-f]{4,5})\]/g, (match, group) => {
    if (group.length < 6) {
      return `<img style="width:24px;height:24px;" src="https://live.fxtrade888.com/live/static/face/${group}.gif">`;
      // return `<img style="width:24px;height:24px;border:0px" src="http://www.jq22.com/demo/qqFace/arclist/${content}.gif">`;
    }
    return match;
  });
};

/**
 * 将内容转换为可以发送的内容
 */
export const contentToSend = (content) => {
  let result = content.replace(/&nbsp;/g, ' ').trim();
  result = result.replace(/<br>/g, '\n');
  result = result.replace(/<img[^>]+?([a-zA-Z0-9]{4,5}(?=\.png))[^>]*>/g, (match, key) => {
    return `[${key}]`;
  });

  return result;
};
