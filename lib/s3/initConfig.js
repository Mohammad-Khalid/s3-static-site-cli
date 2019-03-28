const inquirer = require('inquirer');
const os = require('os');

const json_utility = require('../json_utility');

const initConfig = function (args) {
    const option = args.hasOwnProperty('profile') ? 'profile' : args.hasOwnProperty('list') ? 'list' : 'setup';

    switch (option) {

        case 'setup':
            AWSInitSetUp();
            break;

        case 'profile':
            AWSInitProfile(args.profile);
            break;

        case 'list':
            AWSInitProfileList();
            break;
    }
}

// create new profile
const AWSInitSetUp = () => {
    if (json_utility.read().length) {
        inquirer.prompt([{
            message: 'Please type in your new profile name:\n',
            type: 'input',
            name: 'profile',
            default: 'default'
        }]).then((answer) => {
            let newProfileName = answer.profile.trim();

            if (!/^[a-zA-Z0-9-_]+$/i.test(newProfileName)) {
                console.error(`[Error]: Invalid profile name. The profile name '${profileName.trim()}' contains characters that are not allowed.`);
            }
            _askCredential(newProfileName);
        });
    }
    else {
        _askCredential('default');
    }
}

// update existing profile
const AWSInitProfile = (profileName) => {

    if (!/^[a-zA-Z0-9-_]+$/i.test(profileName.trim())) {
        console.error(`[Error]: Invalid profile name. The profile name '${profileName.trim()}' contains characters that are not allowed.`);
    } else {
        const p_index = _.findIndex(json_utility.read(), { profileName: profileName });
        if (p_index >= 0) {
            _confirmOverwritingProfile(profileName, (confirm) => {
                if (confirm) {
                    _askCredential(profileName.trim());
                }
            })
        }
        else {
            console.error('[Error]: The profile name [' + profileName + '] does not exists.');
            process.exit(1);
        }
    }

}

// list all associated profiles
const AWSInitProfileList = () => {
    console.log('\n profile \t\t| Associated AWS profile');
    console.log('------------------------------------------------------------------------');
    json_utility.read().forEach(element => {
        console.log('[' + element.profileName + ']\t\t|' + ' "' + element.profileName + '"');
    });
}


// get account_sid and auth_token
const _askCredential = async (profileName) => {

    console.log('\nPlease visit https://www.twilio.com/console' +
        '\nFill in the Twilio ACCOUNT SID and Twilio AUTH TOKEN below to save/modify your Twilio profile.');

    return await inquirer.prompt([
        {
            type: 'input',
            name: 'accessKeyId',
            message: 'AWS Access Key:\n',
            validate: function (input) {
                if (!input.trim()) {
                    return `'AWS Access Key' cannot be empty.`;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'secretAccessKey',
            message: 'AWS Secret Key:\n',
            validate: function (input) {
                if (!input.trim()) {
                    return `'AWS Secret Key' cannot be empty.`;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'region',
            message: 'AWS Region:\n',
            validate: function (input) {
                if (!input.trim()) {
                    return `'AWS Region' cannot be empty.`;
                }
                return true;
            }
        }
    ]).then(async (answer) => {
        let valid_credential_object = {
            "accessKeyId": answer.accessKeyId.trim(),
            "secretAccessKey": answer.secretAccessKey.trim(),
            "region" : answer.region.trim()
        };
        const cred = await json_utility.addProfile(profileName, valid_credential_object);
        return cred;
    });
}

// confirming profile overwriting
function _confirmOverwritingProfile(profileName, callback) {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'overwrite',
            default: true,
            message: 'The profile name [' + profileName + '] exists, do you want to overwrite it?'
        }
    ]).then((answer) => {
        callback(answer.overwrite);
    });
}


module.exports = { initConfig, _askCredential };