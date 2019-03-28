
let AWS = require('aws-sdk'),
os     = require('os'),
path   = require('path')
_      = require('lodash');

const inquirer = require('inquirer');
const {_askCredential} = require('./initConfig');

module.exports = async (profileName) => {
  try{
    const AWSDir = path.resolve(os.homedir(),'.aws-s3/config.json');
    let config = require(AWSDir);
    let f_profile = await _.findIndex(config,{profileName:profileName});
    if(f_profile>=0){
      let obj1 = config[f_profile];
      delete obj1.profileName;
      AWS.config.credentials = obj1;
      return AWS;
    }
    else{
      return await inquirer.prompt([
          {
              type: 'confirm',
              name: 'newcreate',
              default: true,
              message: 'The Credentials name [' + profileName + '] does not exist. Would you like to create it?'
          }
      ]).then(async (answer) => {
          if(answer.newcreate) {
              let config  = await _askCredential(profileName);
              let f_profile = await _.findIndex(config,{profileName:profileName});
              if(f_profile>=0){
                let obj = config[f_profile];
                delete obj.profileName;
                AWS.config.credentials = obj;
                return AWS;
              }
          }else{
            process.exit();
          } 
      });
    }
  } catch(e) {
    if(e.code == 'MODULE_NOT_FOUND')
    {
      console.log(`Oops! We did not find the "${profileName}" Credentials name in the System Home Directory.`)

      const config = await _askCredential('default');
      const f_profile = _.findIndex(config,{profileName:'default'});
      if(f_profile>=0){
        let obj = config[f_profile];
        delete obj.profileName;
        AWS.config.credentials = obj;
          return AWS;
      }
    }
    else
    {
      console.log(`Oops! Invalid credentials for the "${profileName}" Credentials name.`)
      process.exit();
    }
  }
}
