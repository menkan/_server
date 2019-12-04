/**
 * @Created by menKan_mark on 2019/12/01
*/

const nodemailer = require('nodemailer');
const path = require('path');
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
  // 发送者厂商
  service: "QQ",
  // smtp port
  port: '465',
  // ssl安全链接
  cecureConnection: true, // true

  // 发送者邮箱与SMTP密码
  auth: {
    user: '1751532131@qq.com',
    pass: 'eywezrfulbgsbifg',
  },
});


let formData = {"banner":"http://image.wufazhuce.com/Foek-9Pwyj844tDCLT304YTrFz9L","tag":"摄影","description":"我只是无法明白，到底是爱艰难些，还是承受爱艰难些。","middleInfo":{"tips": "天冷了，该加衣服了！","temperature":"9","_topImage":"https://h5tq.moji.com/tianqi/assets/images/weather/w0.png","_topTxt":"晴"},"weatherArr":[{"time":"今天","src":"https://h5tq.moji.com/tianqi/assets/images/weather/w0.png","state":"晴","scope":"4° / 11°","directionOfTheWind":"西北风","level":"3级","pollution":"115 轻度污染","class":"level_3"},{"time":"明天","src":"https://h5tq.moji.com/tianqi/assets/images/weather/w0.png","state":"晴","scope":"6° / 12°","directionOfTheWind":"北风","level":"3级","pollution":"84 良","class":"level_2"},{"time":"后天","src":"https://h5tq.moji.com/tianqi/assets/images/weather/w1.png","state":"多云","scope":"8° / 13°","directionOfTheWind":"北风","level":"3-4级","pollution":"63 良","class":"level_2"}]};

let data = {
  title: 'EveryDay Tips',
  auther: 'menkan_mark',
  middleInfo: formData.middleInfo,
  weatherArr: formData.weatherArr,
  ...formData,
};

let indexPath = path.join(__dirname, '..', 'view', 'index.ejs');
const template = ejs.compile(fs.readFileSync(indexPath, 'utf-8'))

const html = template(data)
// console.log(html)

let mail_options = {
  from: '"Everyday Tips" <everyday_tips@foxmail.com>',
  to: 'xtz17515@163.com',
  // mail title
  subject: 'EveryDay Tips',
  html: html,
};

setTimeout(() => {
  transporter.sendMail(mail_options, (error, info) => {
    if(error) {
      console.log(error);
      console.log('===============  执行出错=============================')
      return;
    }
    console.log('mail send successed', info.messageId);
  })
}, 3000)
