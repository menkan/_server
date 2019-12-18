/**
 * @Created by menkan_mark on 2019/12/02
*/

const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const cheerio = require('cheerio');
const ejs = require('ejs');
const { oneHref, rmNull } = require('../utiles/utiles')

let oneformData = '';
let mojiWeatherData = '';

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

// Take `One` context
function oneInfos() {
  return new Promise((resolve, reject) => {
    superagent.get(oneHref).end((err, res) => {
      if (err) {
        // 可以重新尝试获取新鲜的内容
        console.error(err)
        reject(err)
        return
      }
      const $ = cheerio.load(res.text)
      let currentHtml = $('#carousel-one > .carousel-inner > div.item');
      let fisrtCode = currentHtml[0];
      
      let formData = {
        banner: $(fisrtCode).find('.fp-one-imagen').attr('src'),
        tag: rmNull($(fisrtCode).find('.fp-one-imagen-footer').text()),
        description: $(fisrtCode).find('.fp-one-cita a').text(),
      };
      oneformData = formData;
      resolve(formData);
    })
  });
};

// Take `moji weather` context
const BASH_URL = `https://tianqi.moji.com/weather/china/`;
const shagnHai_PuTuo = `shanghai/putuo-district`;
function mojiWeatherInfos () {
  return new Promise((resolve, reject) => {
    superagent.get(`${BASH_URL}${shagnHai_PuTuo}`).end((err, res) => {
      if(err) {
        console.error(err);
        reject(err);
        return
      }

      const $ = cheerio.load(res.text);
      const _topElement = $('.wrap.clearfix.wea_info .left');
      const _listElement = $('.left .forecast.clearfix .days');

      let middleInfo = {
        temperature: $(_topElement).find('.wea_weather.clearfix em').text(),
        _topImage: $(_topElement).find('.wea_weather.clearfix span img').attr('src'),
        _topTxt: $(_topElement).find('.wea_weather.clearfix b').text(),
        tips: $('.wea_tips em').text(),
      }

      let weatherArr = []
      $(_listElement).each((i, element) => {
        const liArr = $(element).find('li');
        weatherArr.push(
          {
            time: $(liArr[0]).find('a').text(),
            src: $(liArr[1]).find('span img').attr('src'),
            state: rmNull($(liArr[1]).text()),
            scope: rmNull($(liArr[2]).text()),
            directionOfTheWind: rmNull($(liArr[3]).find('em').text()),
            level:rmNull($(liArr[3]).find('b').text()),
            pollution: `${rmNull($(liArr[4]).find('strong').text())}`,
            class: $(liArr[4]).find('strong').attr('class'),
          }
        )
      })

      let formData = { middleInfo, weatherArr };
  
      mojiWeatherData = formData;

      resolve(formData);
    })
  })
};

// 邮件发送到用户
function mailer(formData) {
  let data = {
    title: 'EveryDay Tips',
    auther: 'everyday tips',
    middleInfo: formData.middleInfo,
    weatherArr: formData.weatherArr,
    ...formData,
  };

  let indexPath = path.join(__dirname, '..', 'view', 'index.ejs');
  const template = ejs.compile(fs.readFileSync(indexPath, 'utf-8'))
  const html = template(data)

  let mail_options = {
    from: '"Everyday Tips" <everyday_tips@foxmail.com>',
    to: 'xtz17515@163.com,634234727@qq.com',
    subject: 'EveryDay Tips',
    html: html,
  };

  transporter.sendMail(mail_options, (error, info) => {
    if(error) {
      // 邮件发送失败
      console.error(error);
      return;
    }
    console.log('mail send successed', info);
  })
}

let count = 0;
function queryTwoInfos() {
  Promise.all([oneInfos(), mojiWeatherInfos()]).then(result => {
    const formData = {...oneformData, ...mojiWeatherData};
    console.log('data——', JSON.stringify({...oneformData, ...mojiWeatherData}));
    count = 0
    // 模拟发送数据
    mailer(formData);
  }).catch(error => {
    if(count < 3) {
      count++
      queryTwoInfos()
      console.log('restart data');
    } else {
      console.log('Error Count')
      console.error(`count === ${count}, catch Data!`);
    }
    // 数据收集 Error...
    // 错误三次之后不再请求发送。 当日天气不推送..
  })
}

function _time_mail() {
  console.log('=========== EveryDay tips start function ===========');
  let rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [0, new schedule.Range(1, 6)];

  // 上午六点三十分执行该函数;
  rule.hour = 6;
  rule.minute = 30;
  var j = schedule.scheduleJob(rule, function(){
    console.log(`runing _time Function`);
　  queryTwoInfos();
  });
}

// queryTwoInfos()
// console.log('执行queryTwoInfos函数');

module.exports = _time_mail
