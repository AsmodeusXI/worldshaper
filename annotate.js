'use strict';

const sh = require('shelljs');
const jsExp = /.*\.js$/;
const noSpecExp = /.*Spec\.js$/;

function annotateFile(filePath) {
  sh.exec('ng-annotate -a ' + filePath + ' -o ' + filePath);
}

function deannotateFile(filePath) {
  sh.exec('ng-annotate -r ' + filePath + ' -o ' + filePath);
}

function annotateFolder(folderPath, deannotate) {
  sh.cd(folderPath);
  let files = sh.ls('-R');
  files.forEach(function (file) {
    if (file.match(jsExp) && !file.match(noSpecExp)) {
      if (deannotate && deannotate === '-d') {
        deannotateFile(file);
      } else {
        annotateFile(file);
      }
    }
  });
}

let folder = process.argv.slice(2)[0];
let deannotate = process.argv.slice(3)[0];
annotateFolder(folder, deannotate);
