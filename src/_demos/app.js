/**
 * @Created by menkan_mark on 2019/11/29;
 */

const path = require('path');
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const data = {
  title: 'EveryDay Tips',
  auther: 'menkan_mark',
  banner_im: '',
  description: '热爱，就是一种天赋。你不一定最优秀，但你有一股冲劲儿，哪怕自己干得不行，也不想放弃，这就是天赋。',
  tag: '摄影',
  weatherArr: [
    {
      time: '',
      src: '',
      state: '',
      desc: '',
      _clas: 'level_6',
    }
  ]
};

let indexPath = path.join(__dirname, 'view', 'index.ejs');

// demo
// const template = ejs.compile('<h3>hello <%= title %> </h3>');
// console.log('.....', template(data))

// demo2
// const template = ejs.compile(fs.readFileSync(indexPath, 'utf-8'))
// console.log(template(data))

// 墨迹天气
// BASE_URL - https://tianqi.moji.com/weather/china/
// City and region - shanghai/putuo-district

const server = http.createServer((request, response) => {
  // logger
  console.log(`${request.method} -- ${request.url}`)

  const template = ejs.compile(fs.readFileSync(indexPath, 'utf-8'))
  // console.log(template(data))

  // send the client
  response.end(template(data));
})
const port = 8886
server.listen(port, _ => {
  console.log(`server localhost on started, port: ${port}`)
})
