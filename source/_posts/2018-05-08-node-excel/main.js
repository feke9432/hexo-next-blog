var xlsx = require('node-xlsx');
var fs = require('fs');

var obj = xlsx.parse(__dirname + '/2.xlsm');
var excelObj = obj[0].data;

// return console.log(excelObj); // 打印查看 node-xlsx 读取到的数据格式。

var RCount = 0; // 记录有效数据
var ACount = 0; // 记录总数据

// 将读取到的双重数组转化为我们更好使用个格式：之所以过滤，就是考虑未来可以整点报表之类的花活儿。
// var objs = {
//     'id': {
//         '日期': {
//             LNum: 0, // 午餐次数
//             WCNum: 0, // wc次数
//             SNum: 0, // 抽烟次数
//             DNum: 0, // 晚餐次数
//             ANum: 0, // 单天总出入次数
//             LunchTime: ['出入格式 出时间点', '出入格式 入时间点'], // 午餐出入时间记录
//             DinnerTime: ['出入格式 出时间点', '出入格式 入时间点'], // 晚餐出入时间记录
//             WCTime: ['出入格式 出时间点', '出入格式 入时间点'], // wc 出入使时间记录
//             STime: ['出入格式 出时间点', '出入格式 入时间点'], // 抽烟出入时间记录
//         }
//     }
// }
function changeData (idSet) {
    var objs = {};
    
    for (var i = 0; i < excelObj.length; i++) {
        ACount ++;
        var item = excelObj[i];
        var id = item[0] ? (item[0] + '').length == 3 ? (item[0] + '').match(/\d+/)[0].length == 3 ? (item[0] + '').match(/\d+/)[0]:false:false:false;
        
        if (idSet.has(id) && item[0] !== '姓名' && item[1] != null && item[2] != null && item[3] != null && item.length > 3 && typeof item[1] == 'string' && typeof item[2] == 'string' && id) {
            
            if (objs[id] == null) {
                objs[id] = {}
            }
            var obj = objs[id];
            RCount ++;

            var isIn = item[1].toUpperCase() == 'C'; // 进还是出
            var jinchu = item[1].toUpperCase(); // C R
            var type = Trim(item[2].toUpperCase()); // WC S L D 
            var time = formatDateTime(item[3]); // 2018-04-03 16:01:40
            // console.log(time);

            var date = time.split(' ')[0];
            var timeH = time.split(' ')[1];
            
            if (obj[date] == null) {
                obj[date] = {
                    LNum: 0,
                    WCNum: 0,
                    SNum: 0,
                    DNum: 0,
                    ANum: 0,
                }
            }

            // 只有 出 记录次数，但进出都记录时间点。
            if (type == 'L') {
                if (isIn) {
                    obj[date].LNum++;
                    obj[date].ANum++;
                }
                
                if (obj[date]['LunchTime'] == null) {
                    obj[date]['LunchTime'] = [];
                }
                obj[date]['LunchTime'].push(jinchu + ' ' + timeH)
            }
            if (type == 'D') {
                if (isIn) {
                    obj[date].DNum++;
                    obj[date].ANum++;
                }
                
                if (obj[date]['DinnerTime'] == null) {
                    obj[date]['DinnerTime'] = [];
                }
                obj[date]['DinnerTime'].push(jinchu + ' ' + timeH)
            }
            if (type == 'WC') {
                if (isIn) {
                    obj[date].WCNum++;
                    obj[date].ANum++;
                }
                
                if (obj[date]['WCTime'] == null) {
                    obj[date]['WCTime'] = [];
                }
                if (item[4] && item[4].length > 1) {
                    obj[date]['WCTime'].push(jinchu + ' ' + timeH + ' ' + 'DA');
                } else {
                    obj[date]['WCTime'].push(jinchu + ' ' + timeH );
                }
            }
            if (type == 'S') {
                if (isIn) {
                    obj[date].SNum++;
                    obj[date].ANum++;
                }
                
                if (obj[date]['STime'] == null) {
                    obj[date]['STime'] = [];
                }
                obj[date]['STime'].push(jinchu + ' ' + timeH)
            }
        }
    }
    return objs;
}

// Dtime Ltime < 35 min
// S < 10 min
// wc < 10 min
// 赛选 出在职人
// 一天最多八次

// 过滤函数，过滤处理过的数据
function getErr(objs) {
    var errObj = {};
    for (let id in objs) {
        // 缓存每个id 的数据
        var item = objs[id];

        for (let date in item) {
            // 缓存每天的数据
            var obj = item[date];
            var WCTime = obj.WCTime || [];
            var DinnerTime = obj.DinnerTime || [];
            var LunchTime = obj.LunchTime || [];
            var STime = obj.STime || [];
            // 计算超了多少次：
            if (obj.ANum > 8) {

                if (errObj[id] == null) {
                    errObj[id] = {}
                }
                if (errObj[id][date] == null) {
                    errObj[id][date] = {}
                }
                errObj[id][date]['出入次数超了'] = (obj.ANum - 8);
            }

            var wn = countTypeErr(WCTime, 'WC')
            var dn = countTypeErr(DinnerTime, 'D')
            var ln = countTypeErr(LunchTime, 'L')
            var sn = countTypeErr(STime, 'S')

            if (wn.num> 0) {
                if (errObj[id] == null) {
                    errObj[id] = {}
                }
                if (errObj[id][date] == null) {
                    errObj[id][date] = {}
                }
                errObj[id][date]['厕所超时'] = wn.num + '次' + JSON.stringify(wn.mins);
                errObj[id][date]['厕所原始数据'] = wn.all;
            }

            if (dn.num > 0) {
                if (errObj[id] == null) {
                    errObj[id] = {}
                }
                if (errObj[id][date] == null) {
                    errObj[id][date] = {}
                }
                errObj[id][date]['晚饭超时'] = dn.num + '次' + JSON.stringify(dn.mins);
                errObj[id][date]['晚饭原始数据'] = dn.all;
            }

            if (ln.num > 0) {
                if (errObj[id] == null) {
                    errObj[id] = {}
                }
                if (errObj[id][date] == null) {
                    errObj[id][date] = {}
                }
                errObj[id][date]['午饭超时'] = ln.num + '次' + JSON.stringify(ln.mins);
                errObj[id][date]['午饭原始数据'] = ln.all;
            }

            if (sn.num > 0) {
                if (errObj[id] == null) {
                    errObj[id] = {}
                }
                if (errObj[id][date] == null) {
                    errObj[id][date] = {}
                }
                errObj[id][date]['抽烟超时'] = sn.num + '次' + JSON.stringify(sn.mins);
                errObj[id][date]['抽烟原始数据'] = sn.all;
            }
        }
    }

    return errObj;
}

// 换算每个数组超时次数
function countTypeErr(arr, type) {
    var flagtime = '';
    var chaonum = {num: 0, mins: [], all: arr};
    var lastChuR = '';
    for ( let i = 0; i < arr.length; i ++) {
        var isIn = arr[i].split(' ')[0] == 'C';
        var type = arr[i].split(' ')[0];
        var time = arr[i].split(' ')[1]
        var isDa = true;
        lastChuR = type;
        
        if (type == 'WC') {
            isDa = arr[i].split(' ')[2] ? false : true;
        }
        if (lastChuR != type) {
            isDa = false;
        }
        if (isIn ) {
            flagtime = time;
        } else if (i != 0 && isDa) {
            var num = shijianjian(time, flagtime);

            if (type == 'L' || type == 'D') {
                if (num > 35) {
                    chaonum.num ++;
                    chaonum.mins.push(num);
                }
            } 

            if (type == 'S' || type == 'WC') {
                if (num > 10) {
                    chaonum.num++;
                    chaonum.mins.push(num);
                }
            } 
        }
    }

    return chaonum;
}

// 计算时间减值,精确到分钟
function shijianjian(str1, str2) {
    if (str1 == '' || str2 == '') return false;
    var hur1 = parseInt(str1.split(':')[0]);
    var min1 = parseInt(str1.split(':')[1]);
    var hur2 = parseInt(str2.split(':')[0]);
    var min2 = parseInt(str2.split(':')[1]);

    return (hur1 - hur1)*60 + min1 - min2;
}


function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

function formatDateTime(inputTime) {
    // var date = new Date(inputTime);
    var date = new Date(1900, 0, inputTime); // 注意： excel 读取到的时间戳是 1900 年到现在的秒数。
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}; 

function writeFile(file, txt) {
    // 测试用的中文  
    var str = txt;
    // 把中文转换成字节数组  
    // var arr = iconv.encode(str, 'gbk');

    // appendFile，如果文件不存在，会自动创建新文件  
    // 如果用writeFile，那么会删除旧文件，直接写新文件  
    fs.writeFile(file, txt, function (err) {
        if (err)
            console.log("fail " + err);
        else
            console.log("写入文件ok");
    });
}

function writeErrObj () {
    var memberObj = {};

    var memberList = xlsx.parse(__dirname + '/1.xlsx')[1].data;
    memberList.splice(0, 2);

    var memberListObj = changeMemberList(memberList);
    var memberId = [];
    var memberIdList = memberListObj.forEach(element => {
        memberId.push(element.match(/\d{3}/)[0])
    })
    console.log('共计有 ' + memberId.length + ' 人');
    var memberIdSet = new Set(memberId);

    var objs = changeData(memberIdSet);
    var errObj = getErr(objs);

    writeFile(__dirname + '/2.txt', JSON.stringify(errObj));
}

// console.log('right num：' + RCount, 'all num：' + ACount);

writeErrObj()

console.log();

// 处理用户列表函数，只要（444-名字）格式的数据
function changeMemberList(arr) {
    var narr = [];
    function inf(arr) {
        for (var i = 0; i < arr.length; i++) {
            if (typeof arr[i] == 'object' && arr[i] instanceof Array) {
                inf(arr[i]);
            }
            if (/^\d{3}-([\u4e00-\u9fa5]{2}|[\u4e00-\u9fa5]{1}[a-zA-Z])$/i.test(arr[i])) {
                narr.push(arr[i])
            }
        }
    }
    inf(arr);
    return narr;
}
