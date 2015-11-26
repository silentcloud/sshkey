var fs = require('fs'),
  child_process = require('child_process'),
  connect = require('./sshclient'),
  inquirer = require('inquirer');
require('colors');

var sshkey = (function () {

  function writeConfig(serverCfg, alias) {
    var configInfo =
      "Host " + alias + "\n" +
      "    HostName " + serverCfg.hostname + "\n" +
      "    Port " + serverCfg.port + "\n" +
      "    User " + serverCfg.user + "\n";

    fs.appendFile(process.env.HOME + "/.ssh/config", configInfo, function (err) {
      if (err) throw err.red;
      console.log("Authorized info uploads success!".green);
      console.log("please use '" + "ssh ".red + alias.red + "' command to login in server!");
    });
  }

  function sshServer(keyContent, serverCfg, alias) {
    var client = connect(serverCfg.user, serverCfg.hostname, serverCfg.port, function () {
      client.exec('mkdir -p $HOME/.ssh', function (err) {
        if (err) throw err;
        client.exec("echo '" + keyContent + "' >>$HOME/.ssh/authorized_keys", function (err) {
          if (err) throw err;
          client.close();
          writeConfig(serverCfg, alias);
        });
      });
    });
  }

  function createServer() {
    child_process.exec('cat $HOME/.ssh/id_rsa.pub', function (error, stdout, stderr) {
      if (error) throw error;
      inquirer.prompt([{
        type: 'input',
        name: 'hostname',
        message: 'hostname: ',
        validate: function (value) {
          return value.length > 0;
        }
      }, {
        type: 'input',
        name: 'user',
        message: 'user name: ',
        validate: function (value) {
          return value.length > 0;
        }
      }, {
        type: 'input',
        name: 'port',
        message: 'server port: ',
        default: 22,
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        },
        filter: Number
      }, {
        type: 'input',
        name: 'alias',
        message: 'ssh server alias: ',
        default: function (values) {
          return values.hostname;
        }
      }], function (result) {
        sshServer(stdout, {
          hostname: result.hostname,
          user: result.user,
          port: result.port
        }, result.alias);
      });
    });
  }

  function createKeys() {
    if (!fs.existsSync(process.env.HOME + "/.ssh/id_rsa.pub")) {
      child_process.exec('ssh-keygen -t rsa -N "" -C "" -f ' + process.env.HOME + '/.ssh/id_rsa', function (error) {
        if (error) throw  error;
        createServer();
      });
    } else {
      createServer();
    }
  }

  return {
    init: function () {
      createKeys();
    }
  };

})();

module.exports = sshkey;





