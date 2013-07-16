#!/usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    shell = require('shelljs'),
    ssh2 = require('ssh2'),
    colorful = require('colorful');

var sshh = (function(){
  var host = process.argv[3] ;
  var username = process.argv[5];
  var alias = process.argv[7];

  function usage(){
    console.log("    Usage : sshh -h host -u username [-a alias]");
    console.log("    ");
    console.log("    Options:")
    console.log("    -h The hostname.")
    console.log("    -u The username of the host.")
    console.log("    -a optional parameters, the alias name of host which you can ssh like 'ssh alias'");
  }

  function checkParam(){   //check params
    if(typeof host === "undefined"){
      usage();
      return false;
    }
    if(typeof username === "undefined" ){
      usage();
      return false;
    }
  }

  function catKeys(){ //check '~/.ssh' folder & create 'id_rsa' files ;

  }

  return {
    init : function(){
      checkParam();
    }
  }

})();

module.exports = sshh ;





