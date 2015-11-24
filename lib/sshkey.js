
var fs = require('fs'),
    commander = require('commander'),
    child_process = require('child_process'),
    connect = require('./sshclient'),
    prompt = require('prompt');
    require('colors');

var sshkey = (function() {

  function writeConfig(serverCfg, alias) {
    var configInfo =
        "Host " + alias + "\n" +
        "    HostName " + serverCfg.hostname + "\n" +
        "    Port "     + serverCfg.port       +"\n" +
        "    User "     + serverCfg.user     + "\n" ;

    fs.appendFile(process.env.HOME + "/.ssh/config" , configInfo ,function(err){
      if (err) throw err.red;
      console.log("Authorized info uploads success!".green);
      console.log("please use '" + "ssh ".red + alias.red + "' command to login in server!");
    });
  }

  function sshServer(keyContent, serverCfg, alias) {
    var client = connect(serverCfg.user, serverCfg.hostname, serverCfg.port,function(){
      client.exec('mkdir -p $HOME/.ssh', function(err){
        if(err) throw err ;
        client.exec("echo '" + keyContent + "' >>$HOME/.ssh/authorized_keys", function(err){
          if(err) throw err;
          client.close();
          writeConfig(serverCfg, alias);
        });
      });
    });
  }

  function createKeys() {
    if(!fs.existsSync(process.env.HOME+"/.ssh/id_rsa.pub")){
      child_process.exec('ssh-keygen -t rsa -N "" -C "" -f '+ process.env.HOME +'/.ssh/id_rsa',function(error){
        if(error) throw  error;
      });
    }
    child_process.exec('cat $HOME/.ssh/id_rsa.pub',function(error, stdout, stderr){
      if(error) throw error ;

      prompt.start();

      prompt.get([{
        name: 'hostname',
        required: true
      }, {
        name: 'user',
        required: true
      }, {
        name: 'port',
      }, {
        name: 'alias',
      }], function (err, result) {
        sshServer(stdout, {
          hostname: result.hostname,
          user: result.user,
          port: result.port || 22
        }, result.alias);
      });
    });
  }
  return {
    init : function(){
      createKeys();
    }
  };

})();

module.exports = sshkey ;





