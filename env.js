fs = require('fs');
require('dotenv').config();

// read in env vars
let production = process.env.PRODUCTION;
let API_URL = process.env.API_URL;

// determine the path
let pwd = process.cwd();
let path = pwd;
if (production === 'true') {
  path = path + '/src/environments/environment.prod.ts';
} else {
  path = path + '/src/environments/environment.ts';
}

// create the file contents based on the template and the env var values
let template = `export const environment = {
  production: ${production},
  API_URL: '${API_URL}'
};`;

// create environment file if it doesn't exist
if (!fs.existsSync(pwd + '/src/environments')) {
  fs.mkdirSync(pwd + '/src/environments');
}

// write env vars to angular environment file
fs.writeFile(path, template, { flag: 'w+' }, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Environment Variables were generated successfully!');
});
