const fsPromises = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const chalk = require('chalk');

const handleFile = async (filePath, outputPath) => {
  const fileParsed = path.parse(filePath);
  const image = sharp(filePath);
  const outputFilePath = `${outputPath}/${fileParsed.name}`;

  image.jpeg({
    quality: 70,
    trellisQuantisation: true,
    overshootDeringing: true,
    optimizeScans: true,
  }).toFile(`${outputFilePath}.jpeg`);
  image.webp({ quality: 70 }).toFile(`${outputFilePath}.webp`);
  image.heif({ quality: 30, compression: 'av1' }).toFile(`${outputFilePath}.avif`);
};

const handleDir = async (dirPath, output) => {
  const outputPath = `${dirPath}/${output}`;
  await fsPromises.mkdir(outputPath, { recursive: true });

  const files = await fsPromises.readdir(dirPath, { withFileTypes: true });
  files.forEach((file) => {
    if (file.isFile()) {
      console.info(`Processing : ${chalk.bgGreenBright(file.name)}`);
      handleFile(`${dirPath}/${file.name}`, outputPath);
    } else if (file.isDirectory() && file.name !== output) {
      console.info(chalk.bgYellowBright(`Processing directory : ${file.name}`));
      handleDir(`${dirPath}/${file}`, outputPath);
    }
  });
};

const handler = async (argv) => {
  const { source, output } = argv;
  const dirPath = await fsPromises.realpath(source);

  handleDir(dirPath, output);
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
