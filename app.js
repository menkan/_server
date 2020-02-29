/**
 * @Created by menkan_mark on 2019/11/29;
 */

const Koa = require('koa');
const app = new Koa();
const schedulEvent = require('./schedules/index');

// 定时任务
schedulEvent()

app.use(async ctx => {
  console.log(`${ctx.method}--${ctx.url}`);
  ctx.body = 'In the create';
});

app.listen(3000);
