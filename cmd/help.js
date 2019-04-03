const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');

//TODO: finish the help screen
const menus = {
  'main': `S3 Bucket CLI
   Usage:
    aws-s3 [command] <options>
    init ...................... configure auth setting
    list-bucket ............... list existing buckets
    upload-website ............ upload website to S3 bucket
    add-website ............ add website to S3 bucket
    delete-website ............ delete website from S3 bucket
    delete-bucket ............ delete bucket from S3
    version ............ get package version
    help ............... get help menu for a command`,

  'list-bucket': `  Usage:
    aws-s3 list-bucket <options>
    Options:
    --profile ...... [optional] profile name`,

  'upload-website': `  Usage:
    aws-s3 upload-website <options>
    Options:
    --bucket ........... S3 Bucket name,
    -- dir ............. upload directory/file path
    --profile .......... [optional] profile name`,

  'add-website': `  Usage:
    aws-s3 add-website <options>
    Options:
    --bucket ........... S3 Bucket name,
    --profile ...... [optional] profile name`,

  'delete-website': `  Usage:
    aws-s3 delete-website <options>
    Options:
    --bucket ........... S3 Bucket name,
    --profile ...... [optional] profile name`,

  'delete-bucket': `  Usage:
    aws-s3 delete-bucket <options>
    Options:
    --bucket ........... S3 Bucket name,
    --profile ...... [optional] profile name`,

  'version': `  Usage:
    aws-s3 version `,
}

module.exports = (args) => {
  
  clear()

  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0]

    console.log(
      chalk.red(
        figlet.textSync('S3 Static Site Hosting', { horizontalLayout: 'full' })
      )
    )

    console.log(menus[subCmd] || menus.main)
}