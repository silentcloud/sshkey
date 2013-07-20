
var fs = require('fs'),
    commander = require('commander'),
    child_process = require('child_process'),
    connect = require('ssh-client');
    require('colors');

var sshkey = (function(){
  var serverName = commander.server,
      port = commander.port || 22,
      userName = commander.user,
      alias = commander.alias || serverName;

  function writeConfig(){
    var configInfo =
        "Host " + alias + "\n" +
        "    HostName " + serverName + "\n" +
        "    Port "     + port       +"\n" +
        "    User "     + userName     + "\n" ;

    fs.appendFile(process.env.HOME + "/.ssh/config" , configInfo ,function(err){
      if (err) throw err.red;
      console.log("Authorized info uploads success!".green);
      console.log("please use '" + "ssh ".red + alias.red + "' command to login in server!");
    });
  }

  function sshServer(keyContent){
    var client = connect(userName, serverName, function(){
      client.exec('mkdir -p $HOME/.ssh', function(err){
        if(err) throw err.red ;
        client.exec("echo '" + keyContent + "' >>$HOME/.ssh/authorized_keys", function(err){
          if(err) throw err.red;
          client.close();
          writeConfig();
        });
      });
    });
  }

  function createKeys(){ //check '~/.ssh' folder & create 'id_rsa' files ;
    if(!fs.existsSync(process.env.HOME+"/.ssh/id_rsa.pub")){
      child_process.exec('ssh-keygen -t rsa -N "" -C "" -f '+ process.env.HOME +'/.ssh/id_rsa',function(error){
        if(error) throw  error.red;
      });
    }
    child_process.exec('cat $HOME/.ssh/id_rsa.pub',function(error, stdout, stderr){
      if(error) throw error.red ;
      sshServer(stdout);
    });
  }

  return {
    init : function(){
      createKeys();
    }
  }

})();

module.exports = sshkey ;





