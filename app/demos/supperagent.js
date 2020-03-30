/**
 * Created by menkan_mark on 2019/11/29;
 */

const superagent = require('superagent');
const cheerio = require('cheerio');

let reqUrl = `http://wufazhuce.com/`;

// 找到非可见字符开头(结尾)文字
let regExp = /^(\s+)|(\s+)$/ig;

// 清除内容为空
function removeContext(r){
  return function(s) {
    return s.replace(r, '')
  }
}

const rmNull = removeContext(regExp); // 清除不可见字符(空格,换行符,等)

// 发送请求获取网站 DOM
// 获取 One
/*
superagent.get(reqUrl).end((err, res) => {
  if (err) {
    console.log(err)
    return
  }
  const $ = cheerio.load(res.text)
  let currentHtml = $('#carousel-one > .carousel-inner > div.item');
  let fisrtCode = currentHtml[0];
  let tegget = {
    toDayImg: $(fisrtCode).find('.fp-one-imagen').attr('src'),
    tag: $(fisrtCode).find('.fp-one-imagen-footer').text().replace(regExp, ''),
    description: $(fisrtCode).find('.fp-one-cita a').text(),
  }
  console.log(tegget)
})
*/


// 获取 墨迹天气 详情
const BASH_URL = `https://tianqi.moji.com/weather/china/`;
const shagnHai_PuTuo = `shanghai/putuo-district`;

superagent.get(`${BASH_URL}${shagnHai_PuTuo}`).end((err, res) => {

  if(err) {
    console.log(err)
    return
  }

  const $ = cheerio.load(res.text);
  const _topElement = $('.wrap.clearfix.wea_info .left');
  const _listElement = $('.left .forecast.clearfix .days');

  let _topInfo = {
    temperature: $(_topElement).find('.wea_weather.clearfix em').text(),
    _topImage: $(_topElement).find('.wea_weather.clearfix span img').attr('src'),
    _topTxt: $(_topElement).find('.wea_weather.clearfix b').text(),
  }

  let list = []

  $(_listElement).each((i, element) => {
    const liArr = $(element).find('li');
    list.push(
      {
        time: $(liArr[0]).find('a').text(),
        src: $(liArr[1]).find('span img').attr('src'),
        state: rmNull($(liArr[1]).text()),
        desc: `${rmNull($(liArr[2]).text())}|${rmNull($(liArr[3]).find('em').text())}|${rmNull($(liArr[3]).find('b').text())}|${rmNull($(liArr[4]).find('strong').text())}`,
        class: $(liArr[4]).find('strong').attr('class'),
      }
    )
  })

  console.log('obj...', {
    _topInfo,
    list
  })
})
