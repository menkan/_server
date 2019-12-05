/**
 * @Created by menkan_mark on 2019/11/29;
 */

const Koa = require('koa');
const app = new Koa();
const schedulEvent = require('./schedules/index');

// let formData = {"banner":"http://image.wufazhuce.com/Foek-9Pwyj844tDCLT304YTrFz9L","tag":"摄影","description":"我只是无法明白，到底是爱艰难些，还是承受爱艰难些。","middleInfo":{"tips": "天冷了，该加衣服了！","temperature":"9","_topImage":"https://h5tq.moji.com/tianqi/assets/images/weather/w0.png","_topTxt":"晴"},"weatherArr":[{"time":"今天","src":"https://h5tq.moji.com/tianqi/assets/images/weather/w0.png","state":"晴","scope":"4° / 11°","directionOfTheWind":"西北风","level":"3级","pollution":"115 轻度污染","class":"level_3"},{"time":"明天","src":"https://h5tq.moji.com/tianqi/assets/images/weather/w0.png","state":"晴","scope":"6° / 12°","directionOfTheWind":"北风","level":"3级","pollution":"84 良","class":"level_2"},{"time":"后天","src":"https://h5tq.moji.com/tianqi/assets/images/weather/w1.png","state":"多云","scope":"8° / 13°","directionOfTheWind":"北风","level":"3-4级","pollution":"63 良","class":"level_2"}]};

// 定时任务
schedulEvent()

app.use(async ctx => {
  console.log(`${ctx.method}--${ctx.url}`);
  ctx.body = 'In the create';
});

app.listen(3000);
