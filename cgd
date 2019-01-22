#!/usr/bin/env node

var exec = require('child_process').exec;

let runShell = function (str) {
  return new Promise((resolve, reject) => {
    exec(str, (err, stdout, stderr) => {
      if (err) throw err;
      console.log(new Date().toLocaleString(), str , 'run success');
      resolve();
    });
  });
}

let runAll = async function (arr) {
    for(let str of arr) {
        await runShell(str);
    }
}

let timenow = new Date().toLocaleString();

runAll(['hexo clean', 
        'hexo g', 
        'hexo d', 
        'git add .', 
        `git commit -m"[${timenow}] updata"`, 
        `git pull`, 
        'git push origin master']);