exports.oneHref = `http://wufazhuce.com/`;

// 函数柯里化(替换内容为空)
exports.removeContext = function (r) {
  return function(s) {
    return s.replace(r, '')
  }
};

// 清除两侧非可见字符
exports.rmNull = this.removeContext(/^(\s+)|(\s+)$/ig);