fs = require('fs');

// fill in the following variables with the correct values
let production = false;
let API_URL = 'http://localhost:6977';
// don't touch anything below here

let pwd = process.cwd();
let path = pwd;
path += production
  ? '/src/environments/environment.prod.ts'
  : '/src/environments/environment.ts';

let template = `export const environment = {
  production: ${production},
  API_URL: '${API_URL}'
};`;

if (!fs.existsSync(pwd + '/src/environments')){
    fs.mkdirSync(pwd + '/src/environments');
}

fs.writeFile(path, template, {flag: 'w+'}, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('Environment Variables were generated successfully!');
});
