/**
 * month  阴历传索引值，从1开始
 */
var DaysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var ArrMonthLunar = new Array("正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "腊");
var ArrWeekDate = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
var ArrDayLunar = new Array("初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十");
//阴历节日
var lunarHoliday = {
  "_0101": "新年",
  "_0115": "元宵",
  "_0505": "端午",
  "_0707": "七夕",
  "_0815": "中秋",
  "_0909": "重阳",
  "_1208": "腊八",
  "_1224": "小年"
};
//阳历节日
var solarHoliday = {
  "_0101": "元旦",
  "_0214": "情人节",
  "_0308": "妇女节",
  "_0312": "植树节",
  "_0401": "愚人节",
  "_0501": "劳动节",
  "_0504": "青年节",
  "_0601": "儿童节",
  "_0701": "建党节",
  "_0801": "建军节",
  "_0910": "教师节",
  "_1001": "国庆节",
  "_1224": "平安夜",
  "_1225": "圣诞节"
};
/**
 * DaysInMonthLunar含义如下：
 * 例：arr = [6, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 26]
 * arr[0] : 表示该年表示的闰月 ， 如果为0则表示为非闰年
 * arr[arr.length] : 表示该年阳历1月1日与该年的阴历一月初一的间隔天数,规则为[)
 * 其他arr[n] : 结果为1表示月大，否则表示月小 
 */
var DaysInMonthLunar = new Array(
  [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 38], [6, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 26], [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 45], [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 35], [4, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 24], [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 43], [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 32], [2, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 21], [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 40], [7, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 28], [0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 47], [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 36], [5, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 26], [0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 44], [0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 33], [3, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 23], [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 42], [8, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 30], [0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 48], [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 38], [6, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 27], [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 45], [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 35], [4, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 24], [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 43], [0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 32], [3, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 20], [0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 39], [7, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 29], [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 47], [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 36], [5, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 26], [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 45], [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 33], [4, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 22], [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 41], [8, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 30], [0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 48], [0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 37], [6, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 27], [0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 46], [0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 35], [4, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 24], [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 43], [10, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 32], [0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 50], [0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 39], [6, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 28], [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 47], [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 36], [5, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 26], [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 45], [0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 34], [3, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 22], [0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 40], [8, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 30], [0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 49], [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 37], [5, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 27], [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 46], [0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 35], [4, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 23], [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 42], [0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 31], [2, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 21], [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 39], [7, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 28], [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 48], [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 37], [5, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 25], [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 44], [0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 33], [4, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 22], [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 40], [9, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 30], [0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 49], [0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 38], [6, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 27], [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 46], [0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 35], [4, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 24], [0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 42], [0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 31], [2, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 21], [0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 40], [6, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 28], [0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 47], [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 36], [5, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 25], [0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 43], [0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 33], [3, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 22]);


/**
 * 阴阳历 
 */
function Calendar() {
  // 阴历数组初始值,不是下拉选项初始设置
  this.yearStart = 1940;
  // 下拉选项的最大年限
  this.yearEnd = (new Date()).getFullYear();
}
Calendar.prototype = {
  // 传入的公历年月,返回天数
  getSolarMonth: function(year, month) {
    if (month == 2) {
      return (((year % 4 == 0) && ((year % 100) != 0)) || (year % 400 == 0)) ? 29 : 28;
    } else {
      return DaysInMonth[month - 1];
    }
  },
  /**
   * 返回指定月份的日期数组，前后有余数的星期，用上月或下月的数据补全
   * 以周分组（每周7天一个分组）
   */
  geMonthWeekDaysFill(y, m) {
    let _data = this.getMonthDaysFill(y, m);

    let _lineCount = Math.ceil(_data.days.length / 7);
    let _lineIndex = 0;
    let _weekDays = Array(_lineCount);

    for (let i = 0, l = _data.days.length; i < l; i++) {
      if (0 === (i % 7)) {
        _lineIndex += 1;
        _weekDays[_lineIndex - 1] = Array(7);
      }

      _weekDays[_lineIndex - 1][i % 7] = _data.days[i];
    }

    _data['weekDays'] = _weekDays;
    return _data;
  },
  /**
   * 返回指定月份的日期数组，前后有余数的星期，用上月或下月的数据补全
   */
  getMonthDaysFill: function(y, m) {
    let _result = this.getMonthDays(y, m);

    if (_result.nowDayWeek > 0) {
      let _upMonthDate = new Date(Date.parse(new Date(y, m - 1, 1)) - 3600 * 24 * 1000);
      let _upMonthDays = this.getMonthDays(_upMonthDate.getFullYear(), _upMonthDate.getMonth() + 1);
      for (let i = _upMonthDays.nowMaxDate; i > _upMonthDays.nowMaxDate - _result.nowDayWeek; i--) {
        _result.days.splice(0, 0, _upMonthDays.days[i - 1]);
      }
    }
    if (_result.nowLastDayWeek < 6) {
      let _nextMonthDate = new Date(y, m, 1);
      let _nextMonthDays = this.getMonthDays(_nextMonthDate.getFullYear(), _nextMonthDate.getMonth() + 1);
      for (let i = 0; i < 6 - _result.nowLastDayWeek; i++) {
        _result.days.push(_nextMonthDays.days[i]);
      }
    }

    return _result;
  },
  /**
   * 返回指定月份的日期数组
   */
  getMonthDays: function(y, m) {
    let _solarDate = this.getSolarDate(y, m);

    let _days = [];

    for (let _day = 0; _day < _solarDate.nowMaxDate; _day++) {
      let _now = new Date(y, m - 1, _day + 1);
      let _info = {};
      let _dateStr = `0${m}`.substr(-2) + `0${_day+1}`.substr(-2);
      let _todayCZ = `00${y}`.substr(-4) + `0${m}`.substr(-2) + `0${_day + 1}`.substr(-2);
      let _monthCZ = `00${y}`.substr(-4) + `0${m}`.substr(-2);

      _info['solar'] = {
        'now': _now,
        'year': _now.getFullYear(),
        'month': _now.getMonth() + 1,
        'date': _now.getDate(),
        'week': _now.getDay(),
        'weekCZ': ArrWeekDate[_now.getDay()],
        'holiday': solarHoliday[`_${_dateStr}`] ? solarHoliday[`_${_dateStr}`] : '',
        'todayCZ': _todayCZ
      };

      _info['lunar'] = this.solarTolunar(y, m, _day + 1);

      _days.push(_info);
    }

    let _result = _solarDate;
    _result['days'] = _days;

    return _result;
  },
  // 传入公历的年月日,返回包含月份的天数,星期
  getSolarDate: function(y, m, d) {
    //获得当月day号星期几,不填默认为1号
    var d = d || 1;
    var m = parseInt(m);
    var day = new Date(y, m - 1, 1);
    var firstDay = day.getDay();
    // console.log(firstDay);

    //获得当月最后一天星期几
    var nowLastDay = this.getSolarMonth(y, m);
    var lastDay = ((nowLastDay - 1) % 7 + parseInt(firstDay)) % 7;
    // console.log(lastDay);

    //获取这个月总的天数
    var nowMonth = new Date(y, m, 0);
    var nowMaxDate = nowMonth.getDate();
    return {
      nowYear: nowMonth.getFullYear(),
      nowMonth: nowMonth.getMonth() + 1,
      nowDayWeek: firstDay,
      nowMaxDate: nowMaxDate,
      nowLastDayWeek: lastDay
    }
  },
  // 传入公历的年月,返回上个月
  getSolarPreMonth: function(year, month) {
    var preMonth = new Date(year, parseInt(month) - 1, 0);
    //获取上个月总的天数
    var preMonthDate = preMonth.getDate();
    //获取上个月最后一天星期几
    var preMonthLastDay = preMonth.getDay();
    return {
      preMonthYear: preMonth.getFullYear(),
      preMonth: preMonth.getMonth() + 1,
      preMonthDate: preMonthDate,
      preMonthLastDay: preMonthLastDay
    }
  },
  // 传入公历的年月,返回下个月
  getSolarNextMonth: function(year, month) {
    var nextMonth = new Date(year, parseInt(month) + 1, 0);
    // console.log('dddd :', year, month + 1);
    //获取下个月总的天数
    var nextMonthDate = nextMonth.getDate();
    //获取下个月最后一天星期几
    var nextMonthLastDay = nextMonth.getDay();
    return {
      nextMonthYear: nextMonth.getFullYear(),
      nextMonth: nextMonth.getMonth() + 1,
      nextMonthDate: nextMonthDate,
      nextMonthLastDay: nextMonthLastDay
    }
  },
  // 传入年,返回闰月在阴历年中是第几月
  getRunMonth: function(year) {
    return DaysInMonthLunar[year - this.yearStart][0];
  },
  // 传入年,返回阴历年中闰月的天数
  getRunMonthDate: function(year) {
    // 得到闰月
    var runMonth = this.getRunMonth(year);
    var runMonthDate = (DaysInMonthLunar[year - this.yearStart][runMonth + 1] == 1) ? 30 : 29;
    return runMonthDate;
  },
  // 传入年月,返回阴历天数(不包含闰月)
  getLunarMonthDate: function(year, month) {
    var newMonth = new Number();
    // 判断是否是闰年
    var isRunMonth = this.getRunMonth(year);
    if (isRunMonth > 0) {
      if (isRunMonth >= month) {
        newMonth = month;
      } else {
        newMonth = month + 1;
      }
    } else {
      newMonth = month;
    }
    var LunarDate = DaysInMonthLunar[year - this.yearStart][newMonth] == 1 ? 30 : 29;
    return LunarDate;
  },
  // 传入阴历年,返回阴历月CZ数组
  showLunarMonth: function(y) {
    var getRunMonth = this.getRunMonth(y);
    var lunarMonthCZ = [];
    if (getRunMonth > 0) {
      for (var i = 0; i < 12; i++) {
        lunarMonthCZ.push(ArrMonthLunar[i])
      }
      lunarMonthCZ.splice(getRunMonth, 0, '闰' + ArrMonthLunar[getRunMonth - 1])
    } else {
      for (var i = 0; i < 12; i++) {
        lunarMonthCZ.push(ArrMonthLunar[i])
      }
    }
    return lunarMonthCZ;
  },
  // 获取阴历上一个月
  lunarPreMonth: function (y, m) {
    var lunarPreMonth;
    if (m == 1) {
      lunarPreMonth = this.lunarToSolar(y - 1, DaysInMonthLunar[y - 1 - this.yearStart].length - 2, 1);
    } else {
      lunarPreMonth = this.lunarToSolar(y, m - 1, 1);
    }
    return lunarPreMonth;
  },
  // 获取阴历下一个月
  lunarNextMonth: function (y, m) {
    var lunarNextMonth;
    if (m == DaysInMonthLunar[y - this.yearStart].length - 2) {
      lunarNextMonth = this.lunarToSolar(parseInt(y) + 1, 1, 1);
    } else {
      lunarNextMonth = this.lunarToSolar(y, parseInt(m) + 1, 1);
    }
    return lunarNextMonth;
  },
  // 获取阴历下一个月天数的CZ数组
  getLunarNextDays: function (y, m) {
    let _lunarDate = this.lunarNextMonth(y, m);
    let _days = [];

    for (let i = 0; i < _lunarDate.lunarMaxDate; i++) {
      _days.push(ArrDayLunar[i]);
    }

    return _days;
  },
  /**
   * 传入年，返回一年内阴历年的各月天数的CZ数组
   */
  getLunarDays:function(y){
    let months = [];
    let yearMonths = this.showLunarMonth(y);
    let isRunMonth = this.getRunMonth(y);
    // 阴历总的天数
    let runMonthDays = this.getRunMonthDate(y);
    for(let i=1;i<=12;i++){
      let _MonthDays = this.getLunarMonthDate(y, i);
      months.push(this.lunar2CZ(_MonthDays));
    }
    if (isRunMonth >0){
      months.splice(isRunMonth, 0, this.lunar2CZ(runMonthDays));
    }
    return months;
  },
  /**
   * 传入数组转换为CZ
   */
  lunar2CZ: function(num){
    let arr = [];
    for(let i=0;i<num;i++){
      arr.push(ArrDayLunar[i]);
    }
    return arr;
  },
  // 阳历转阴历
  solarTolunar: function(y, m, d) {
    var dayEnd = new Date(y, m - 1, d);
    var weekday = dayEnd.getDay();
    //var days = (dayEnd - new Date(y, 0, 1)) / 86400000;
    var sum = 0;
    for (var j = 1; j < m; j++) {
      sum += this.getSolarMonth(y, j);
    }
    var days = sum + d - 1;
    var solarMaxDate = this.getSolarMonth(y, m);
    var dayLunarCZ;
    // console.log('days : ', days);
    var lunarData = DaysInMonthLunar[y - this.yearStart];
    // console.log('dayEnd.getDate() : ', dayEnd.getDate());
    // console.log('lunarData[lunarData.length - 1] : ', lunarData[lunarData.length - 1]);
    dayEnd.setDate(dayEnd.getDate() - lunarData[lunarData.length - 1]);
    // console.log('dayEnd : ', dayEnd);
    var finalYear = dayEnd.getFullYear();
    var calDays = 0;
    var finalMonth = -1;
    var finalDay = -1;
    var lunarMonth = -1;
    var lunarRunMonth;

    var _runMonth = this.getRunMonth(y);
    var _runDateStr = '';

    if (days < lunarData[lunarData.length - 1]) {
      days = lunarData[lunarData.length - 1] - days;
      lunarData = DaysInMonthLunar[finalYear - this.yearStart];
      for (var i = lunarData.length - 2; i >= 1; i--) {
        if (lunarData[i] == 0) {
          calDays += 29;
        } else {
          calDays += 30;
        }
        if (days <= calDays) {
          finalMonth = i;
          finalDay = calDays - days + 1;
          break;
        }
      }
      // console.info("阳历:" + (y + "-" + m + "-" + d) + ",阴历:" + (finalYear + "-" + finalMonth + "-" + finalDay));
      lunarMonth = DaysInMonthLunar[finalYear - this.yearStart][0] > 0 ? finalMonth > DaysInMonthLunar[finalYear - this.yearStart][0] ? finalMonth - 1 : finalMonth : finalMonth;
      lunarRunMonth = ArrMonthLunar[lunarMonth - 1];

      _runDateStr = `0${lunarMonth}`.substr(-2) + `0${finalDay}`.substr(-2);
      if (_runMonth > 0 && _runMonth > lunarMonth) {
        _runDateStr = `0${lunarMonth - 1}`.substr(-2) + `0${finalDay}`.substr(-2);
      }

      return {
        solarYear: y, //公历
        solarMonth: m,
        solarDay: d,
        solarMaxDate: solarMaxDate, //本月天数
        lunarYear: finalYear, //阴历
        lunarMonth: lunarMonth,
        lunarMonthCZ: lunarRunMonth,
        lunarDay: finalDay,
        lunarDayCZ: ArrDayLunar[finalDay - 1], //如初一
        holiday: lunarHoliday[`_${_runDateStr}`] ? lunarHoliday[`_${_runDateStr}`] : '',
        weekday: weekday, //星期索引 0-6
        weekdayCZ: ArrWeekDate[weekday], //如星期一
        lunarMonthIndex: finalMonth //阴历索引 1-13
      };
    }

    lunarData = DaysInMonthLunar[finalYear - this.yearStart];
    days -= lunarData[lunarData.length - 1];
    // console.log('lunarData[lunarData.length - 1]',lunarData[lunarData.length - 1]);
    calDays = 0;
    finalMonth = -1;
    // var k = 1;
    for (var i = 1; i <= lunarData.length - 1; i++) {
      if (days >= calDays) {
        if (lunarData[i] == 0) {
          calDays += 29;
        } else {
          calDays += 30;
        }
        // k++;
      } else {
        if (i > 1) {
          // k--;
          finalMonth = i - 1;
          if (lunarData[i - 1] == 0) {
            calDays -= 29;
          } else {
            calDays -= 30;
          }
        }
        break;
      }
    }
    // console.log('kkkkk',k);
    finalDay = days - calDays + 1;

    // console.log('dddd ',days,calDays,finalDay);

    lunarMonth = DaysInMonthLunar[finalYear - this.yearStart][0] > 0 ? (finalMonth > DaysInMonthLunar[finalYear - this.yearStart][0] ? finalMonth - 1 : finalMonth) : finalMonth;
    if (finalMonth == (DaysInMonthLunar[finalYear - this.yearStart][0] + 1) && (DaysInMonthLunar[finalYear - this.yearStart][0] > 0)) {
      lunarRunMonth = '闰' + ArrMonthLunar[lunarMonth - 1];
    } else {
      lunarRunMonth = ArrMonthLunar[lunarMonth - 1];
    }

    _runDateStr = `0${lunarMonth}`.substr(-2) + `0${finalDay}`.substr(-2);
    if (_runMonth > 0 && _runMonth > lunarMonth) {
      _runDateStr = `0${lunarMonth - 1}`.substr(-2) + `0${finalDay}`.substr(-2);
    }

    return {
      solarYear: y,
      solarMonth: m,
      solarDate: d,
      solarMaxDate: solarMaxDate,
      lunarYear: finalYear,
      lunarMonth: lunarMonth,
      lunarDay: finalDay,
      lunarDayCZ: ArrDayLunar[finalDay - 1],
      lunarMonthCZ: lunarRunMonth,
      holiday: lunarHoliday[`_${_runDateStr}`] ? lunarHoliday[`_${_runDateStr}`] : '',
      weekday: weekday,
      weekdayCZ: ArrWeekDate[weekday],
      lunarMonthIndex: finalMonth
    };
  },
  // 阴历转阳历
  lunarToSolar: function(y, m, d) {
    var y = parseInt(y);
    var m = parseInt(m);
    var d = parseInt(d);
    var calDays = 0;
    var weekday = -1;
    var lunarMaxDate = -1;
    var lunarMonthCZ = -1;
    var lunarData = DaysInMonthLunar[y - this.yearStart];
    for (var i = 1; i < m; i++) {
      if (lunarData[i] == 0) {
        calDays += 29;
      } else {
        calDays += 30;
      }
    }
    calDays += d - 1;
    var date = new Date(y, 0, 1);
    date.setDate(date.getDate() + calDays + lunarData[lunarData.length - 1]);
    var _tmp = m;
    m = DaysInMonthLunar[y - this.yearStart][0] > 0 ? (DaysInMonthLunar[y - this.yearStart][0] >= m ? m : m - 1) : m;
    if ((_tmp == DaysInMonthLunar[y - this.yearStart][0] + 1) && DaysInMonthLunar[y - this.yearStart][0] > 0) {
      lunarMonthCZ = '闰' + ArrMonthLunar[m - 1];
      lunarMaxDate = this.getRunMonthDate(y);
    } else {
      // 非闰月
      lunarMaxDate = this.getLunarMonthDate(y, m);
      lunarMonthCZ = ArrMonthLunar[m - 1];
    }
    weekday = date.getDay();
    return {
      lunarYear: y,
      lunarMonth: m,
      lunarDay: d,
      lunarMaxDate: lunarMaxDate, //阴历本月天数
      lunarMonthCZ: lunarMonthCZ,
      lunarMonthIndex: _tmp,
      solarYear: date.getFullYear(), //阳历年
      solarMonth: (parseInt(date.getMonth()) + 1),
      solarDay: date.getDate(),
      weekday: weekday, //星期索引
      weekdayCZ: ArrWeekDate[weekday] //星期一
    }
  },
  /**
   * 传入 阳历 年月日
   * m从1开始
   * 返回 阴阳历 节假日
   */
  getHoliday: function(y, m, d) {
    let days = this.solarTolunar(y, m, d),
      sHoliday, lHoliday, month, day, lmonth, lday, _dateStr, _dateLunarStr;
    lmonth = days.lunarMonth;
    lday = days.lunarDay;
    month = m < 10 ? '0' + m : m;
    day = d < 10 ? '0' + d : d;
    lmonth = lmonth < 10 ? '0' + lmonth : lmonth;
    lday = lday < 10 ? '0' + lday : lday;
    _dateStr = `_${month}` + `${day}`;
    _dateLunarStr = `_${lmonth}` + `${lday}`;
    return {
      solarYear: y,
      solarMonth: m,
      solarDay: d,
      sHoliday: solarHoliday[_dateStr] ? solarHoliday[_dateStr] : '',
      lHoliday: lunarHoliday[_dateLunarStr] ? lunarHoliday[_dateLunarStr] : ''
    }
  }
}

module.exports = new Calendar;