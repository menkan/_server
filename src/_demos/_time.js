/**
 * @Created by menkan_mark on 2019/11/30
*/

const schedule = require('node-schedule');

// 秒, 分, 时, 月, year
const j = schedule.scheduleJob('*/10 * * * *', function(){
  console.log('The answer to life, the universe, and everything!');
});

// everyDay 6:30运行
// let rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = [0, new schedule.Range(1, 6)];
// rule.hour = 6;
// rule.minute =30;
// var j = schedule.scheduleJob(rule, function(){
//  　　　　console.log("执行任务");
//         getData();
// });
