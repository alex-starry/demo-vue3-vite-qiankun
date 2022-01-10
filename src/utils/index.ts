import store from '../store'

/**
 * 获取平台信息
 * @returns 平台: qd（千丁APP）、wx（微信APP）、h5（非前面选项的浏览器）
 */
 export const getPlatform = () => {
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.indexOf('owner-app') > -1) {
    return 'qd'
  } else if (userAgent.indexOf('micromessenger') > -1) {
    return 'wx'
  } else if (userAgent.indexOf('alipayclient') > -1) {
    return 'al'
  } else {
    return 'h5'
  }
}

/**
 * 滚动到顶部
 */
 export const goTop = () => {
  let distance = document.documentElement.scrollTop || document.body.scrollTop // 获得当前高度
  let step = distance / 30; // 每步的距离
  (function jump() {
    if (distance > 0) {
      distance -= step
      window.scrollTo(0, distance)
      setTimeout(jump, 10)
      console.log('jump distance', distance)
    }
  })();
}

export const Base64 = {
  _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
  encode: function (e) {
    var t = ''
    var n, r, i, s, o, u, a
    var f = 0
    e = Base64._utf8_encode(e)
    while (f < e.length) {
      n = e.charCodeAt(f++)
      r = e.charCodeAt(f++)
      i = e.charCodeAt(f++)
      s = n >> 2
      o = (n & 3) << 4 | r >> 4
      u = (r & 15) << 2 | i >> 6
      a = i & 63
      if (isNaN(r)) {
        u = a = 64
      } else if (isNaN(i)) {
        a = 64
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
    }
    return t
  },
  decode: function (e) {
    var t = ''
    var n, r, i
    var s, o, u, a
    var f = 0
    e = e.replace(/[^A-Za-z0-9+/=]/g, '')
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++))
      o = this._keyStr.indexOf(e.charAt(f++))
      u = this._keyStr.indexOf(e.charAt(f++))
      a = this._keyStr.indexOf(e.charAt(f++))
      n = s << 2 | o >> 4
      r = (o & 15) << 4 | u >> 2
      i = (u & 3) << 6 | a
      t = t + String.fromCharCode(n)
      if (u !== 64) {
        t = t + String.fromCharCode(r)
      }
      if (a !== 64) {
        t = t + String.fromCharCode(i)
      }
    }
    t = Base64._utf8_decode(t)
    return t
  },
  _utf8_encode: function (e) {
    e = e.replace(/rn/g, 'n')
    var t = ''
    for (var n = 0; n < e.length; n++) {
      var r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192)
        t += String.fromCharCode(r & 63 | 128)
      } else {
        t += String.fromCharCode(r >> 12 | 224)
        t += String.fromCharCode(r >> 6 & 63 | 128)
        t += String.fromCharCode(r & 63 | 128)
      }
    }
    return t
  },
  _utf8_decode: function (e) {
    var t = ''
    var n = 0
    var r = 0
    // var c1 = 0
    var c2 = 0
    var c3 = 0
    while (n < e.length) {
      r = e.charCodeAt(n)
      if (r < 128) {
        t += String.fromCharCode(r)
        n++
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1)
        t += String.fromCharCode((r & 31) << 6 | c2 & 63)
        n += 2
      } else {
        c2 = e.charCodeAt(n + 1)
        c3 = e.charCodeAt(n + 2)
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        n += 3
      }
    }
    return t
  }
}

/**
 * 循环判断
 */
 export const intervalJudge = (isSuccess: boolean, num: number, callback: Function = () => {}) => {
  return new Promise((resolve, reject) => {
    let count = 0
    const interval = setInterval(() => {
      ++count
      console.log('判断次数:', count)
      if (!isSuccess) {
        if (count >= num) {
          clearInterval(interval)
          resolve('error')
        }
        return
      }
      callback()
      clearInterval(interval)
      resolve('success')
    }, 5)
  })
}

/**
 * 获取URL参数对像
 * @returns URL参数对像
 */
export const getLocationSearchObj = () => {
  const obj: any = {};
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i += 1) {
    const [key, value] = vars[i].split('=');
    obj[key] = value;
  }
  return obj;
};
