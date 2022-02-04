const pkg = require('./package.json');
const path = require('path');
const fs = require('fs');

const config = {
  headings: {
    fx_version: 'cerulean',
    game: 'gta5',
  },
  info: {
    author: pkg.author,
    description: pkg.description,
    version: pkg.version,
  },
  scripts: {
    client: 'client.js',
    server: ['server.js'],
  },
  files: [],
};

if (!fs.existsSync('./build')) {
  fs.mkdirSync('./build');
}

const manifest = [
  `fx_version '${config.headings.fx_version}'\n`,
  `game '${config.headings.game}'\n\n`,
  `author '${config.info.author}'\n`,
  `description '${config.info.description}'\n`,
  `version '${config.info.version}'\n\n`,
];

function createArrayEntry(name, value) {
  if (!value || value.length === 0) {
    return;
  }

  manifest.push(
    `${name}${
      Array.isArray(value) && value.length > 1
        ? `s {\n${value.map((s) => `  '${s}'`).join(',\n')}\n}`
        : ` '${Array.isArray(value) ? value[0] : value}'`
    }\n`
  );
}

createArrayEntry('client_script', config.scripts.client);
createArrayEntry('server_script', config.scripts.server);
if (config.files && config.files.length > 0) manifest.push('\n');
createArrayEntry('file', config.files);

fs.writeFileSync('./build/fxmanifest.lua', manifest.join(''));

console.info('Generated fxmanifest.lua');
