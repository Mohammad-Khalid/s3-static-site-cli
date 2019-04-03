const minimist = require('minimist')
const error = require('./lib/error')

module.exports = () => {

  //TODO: check to see if CLI is configured
  
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {

    case 'init':
      require('./cmd/init')(args)
      break

    case 'list-bucket':
      require('./cmd/list-bucket')(args)
      break

    case 'upload-website':
      require('./cmd/upload-website')(args)
      break

    case 'add-website':
      require('./cmd/add-website')(args)
      break

    case 'delete-website':
      require('./cmd/delete-website')(args)
      break

    case 'delete-bucket':
      require('./cmd/delete-bucket')(args)
      break

    case 'version':
      require('./cmd/version')(args)
      break

    case 'help':
      require('./cmd/help')(args)
      break

    default:
      error(`"${cmd}" is not a valid command!`, true)
      break
  }
}