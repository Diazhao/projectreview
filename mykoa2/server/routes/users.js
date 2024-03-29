const router = require('koa-router')()
const userService = require('../controller/myconfig');

router.prefix('/users')

router.get('/', async function (ctx, next) {
  ctx.body = await userService.getConfig();
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
