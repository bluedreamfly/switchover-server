const qiniu = require('qiniu');

const  upload = (filename, localfile) => {
  return new Promise((resolve, reject) => {
    var accessKey = 'U1x8OQNl5dyR5R7r306YlqZNr-4BZpRkFnF6-g0C';
    var secretKey = 'IwBgyk8pW6baoSys6AUGP5YuB1h1RVQdSh6N8Pgh';
    var bucket = 'test';
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
      scope: bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    var formUploader = new qiniu.form_up.FormUploader();
    var putExtra = new qiniu.form_up.PutExtra();
    var key='test111.txt';
    formUploader.putStream(uploadToken, filename, localfile, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        reject(respErr);
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody);
      } else {
        reject(respInfo);
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  })
  
}

module.exports = upload;


