const fsPromises = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const chalk = require('chalk');

const handleFile = (filePath, outputPath) => {
  const fileParsed = path.parse(filePath);
  const pipe = sharp(filePath);
  const outputFilePath = `${outputPath}/${fileParsed.name}_optimized`;

  pipe.webp().toFile(`${outputFilePath}.webp`);
  pipe.jpeg().toFile(`${outputFilePath}.jpeg`);
  // pipe.heif({ quality: 80, compression: 'av1' }).toFile(`${outputFilePath}.heivc`);
};

const handleDir = async (dirPath, outputPath) => {
  const files = await fsPromises.readdir(dirPath, { withFileTypes: true });
  files.forEach((file) => {
    if (file.isFile()) {
      console.info(`Processing : ${chalk.bgGreenBright(file.name)}`);
      handleFile(`${dirPath}/${file.name}`, outputPath);
    } else if (file.isDirectory()) {
      console.info(chalk.bgYellowBright(`Processing directory : ${file.name}`));
      handleDir(`${dirPath}/${file}`, outputPath);
    }
  });
};

const handler = async (argv) => {
  const { source, output } = argv;
  const dirPath = await fsPromises.realpath(source);
  const outputPath = `${dirPath}/${output}`;

  // Create output directory
  await fsPromises.mkdir(outputPath, { recursive: true });

  handleDir(dirPath, outputPath);
};

module.exports = {
  command: 'generate <source> [output]',
  aliases: ['gen', 'g'],
  describe: 'Generate optimized images',
  builder: {
    source: {
      default: './',
    },
    output: {
      default: 'optimized',
    },
  },
  handler,
};
