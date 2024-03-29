S3 STATIC SITE HOSTING CLI
===
A command line interface for managing S3 Static Site.

After installing you'll be able to:

* List S3 Buckets
* Upload Your Website on S3 bucket
* Add Website to your existing S3 bucket
* Delete Website from S3 bucket
* Delete Bucket from S3

## Installation

  `sudo npm install -g s3-website-cli`
  
## Usage

```
Usage:
  aws-s3 init [--profile <name>]
  aws-s3 list-bucket [--profile <name>]
  aws-s3 upload-website [--bucket <bucket-name>] [--dir <directory-path>] [--profile <profile-name>]
  aws-s3 add-website [--bucket <bucket-name>] [--profile <name>]
  aws-s3 delete-website [--bucket <bucket-name>] [--profile <name>]
  aws-s3 delete-bucket [--bucket <bucket-name>] [--profile <name>]
  
Options:
  -h --help             Help Screen
  -v --version          CLI Version
  --bucket              S3 Bucket Name
  --dir                 Directory path of your site
```

## Configuration
To use the S3 Static Site CLI, you first need to configure your AWS Access key, Secret key and region. Optionally, multiple accounts can be configured using the `--profile` option to associate an AWS Access key, Secret key and region with a profile name. 
To access the AWS Security Credentials(Access key ID and Secret access key) follow instructions from this link https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html
To configure the CLI with your AWS credentials run the following command: `$ aws-s3 init`. Credentials will be saved in a local JSON file in `~/.aws-s3/config.json`.

The first set of credentials you provide will become your 'default' profile. You can add additional profiles or update an existing profile by running the following command: `$ aws-s3 init --profile test-profile` (where 'test-profile' the the profile name you'd like to add/update).


## 1. GitHub Stats
![Your Repository's Stats](https://github-readme-stats.vercel.app/api?username=Mohammad-Khalid&show_icons=true)
--------------------------------------------------------------------
## 2. Most Used Languages
![Your Repository's Stats](https://github-readme-stats.vercel.app/api/top-langs/?username=Mohammad-Khalid&theme=blue-green)
--------------------------------------------------------------------
## 3. Contributors Badge
<a href="https://github.com/Mohammad-Khalid/s3-static-site-cli/graphs/contributors">
<img src="https://contrib.rocks/image?repo=Mohammad-Khalid/s3-static-site-cli" />
</a>

Made with [contributors-img](https://contrib.rocks).
--------------------------------------------------------------------
## 4. Random Joke Generator
## 😂 Here is a random joke that'll make you laugh!
![Jokes Card](https://readme-jokes.vercel.app/api)
--------------------------------------------------------------------
## 5. Profile View Counter
<img src="https://komarev.com/ghpvc/?username=Mohammad-Khalid"/>

