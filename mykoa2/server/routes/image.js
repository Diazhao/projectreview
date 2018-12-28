const router = require('koa-router')()
const userService = require('../controller/myconfig');
const fs = require('fs');
const path = require('path');
const mineType = require('mime-types');
router.prefix('/image')

router.post('/post', async function (ctx, next) {
  console.log('保存图片')
  
  const file = ctx.request.files.file;
  const reader = fs.createReadStream(file.path);
  let filePath = path.join(__dirname, 'public/upload') + `/${file.name}`;
  const upStream = fs.createWriteStream(filePath);

  reader.pipe(upStream);
  ctx.body = JSON.stringify(ctx.request.files);
})

router.get('/', function (ctx, next) {
  let filePath = path.join(__dirname, 'public/upload');
  const imgs = fs.readdirSync(filePath);
  let files = [];
  for(let i=0;i<imgs.length;i++){
    let imgPath = filePath + `/${imgs[i]}`;
    let data = fs.readFileSync(imgPath);
    let basedata = data.toString('base64');
    let base64 = 'data:' + mineType.lookup(imgPath) + ';base64,' + basedata;
    files.push(base64);
  }
  ctx.body = JSON.stringify(files);
})

module.exports = router
