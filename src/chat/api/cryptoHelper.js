/**
 * 加密
 */
const CryptoJS = require('../../../node_modules/crypto-js/core.js');

const key = 'niugu123niugu456niugu123';
const iv = '12312300';

require('../../../node_modules/crypto-js/cipher-core.js');
require('../../../node_modules/crypto-js/md5.js');
require('../../../node_modules/crypto-js/tripledes.js');

const Security = {
  /**
   * 加密
   */
  encode(msg) {
    const msgHex = CryptoJS.enc.Utf8.parse(msg);
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv);

    const encrypted = CryptoJS.TripleDES.encrypt(msgHex, keyHex, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex,
    });
    const res = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
    return res.toUpperCase();
  },
  /**
   * 解密
   */
  decode(msg) {
    const msgHex = CryptoJS.enc.Hex.parse(msg);
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv);

    const decrypted = CryptoJS.TripleDES.decrypt({
      ciphertext: msgHex,
    }, keyHex, {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  },
};

window.Security = Security;

module.exports = Security;
