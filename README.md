# @vizir/serverless-dotenv-plugin
Create .env files on your serverless function using serverless.yaml definition

## Why ?
The main objective of this library is to get out of the [lambda limit 4KBs problem](https://aws.amazon.com/premiumsupport/knowledge-center/lambda-environment-variable-size/#:~:text=The%20default%20quota%20value%20of,use%20an%20external%20data%20store.), using the serverless.yaml definitions to assemble the .env file (allowing to get variables through SSM, etc.). Keep in mind that putting a .env in your lambda, also means putting all your environment variables in a readable way inside your lambda .zip, so be careful.

## Usage

- Install the plugin with `yarn add -D @vizir/serverless-dotenv-plugin`
- Add the plugin on you serverless.yaml:
  ```yaml
  plugins:
  - "@vizir/serverless-dotenv-plugin"
  ```
- Create a custom definition on your serverless.yaml:
  ```yaml
  custom: 
    dotenv: 
      API_URL: http://api-url.example.com
  ```
- Run `serverless deploy`, a .env file will be created on the root your actual directory and serverless will put it inside your lambda (is important to have dotenv propertly configured inside your code)

## Example
Inside the main repository, a /example exists with a simple serverless function that shows a value from the .env file.