const fs = require('fs');
const path = require('path');

// read all file path in folrder
const getFilesPath = (dirPath, filePattern, ignorePaths, ignoreTypes) => {
  let files = fs.readdirSync(dirPath);
  let jsonFiles = [];

  for (let fileName of files) {
    let filePath = path.join(dirPath, fileName);
    let stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      jsonFiles = jsonFiles.concat(getFilesPath(filePath, filePattern, ignorePaths, ignoreTypes));
    } else {
      const isInIgnorePath = ignorePaths?.length ? ignorePaths?.some((p) => filePath.match(path.resolve(p))) : false;
      if (!isInIgnorePath && !ignoreTypes?.some((type) => (path.extname(fileName) === type))) { jsonFiles.push(filePath); }
    }
  }
  return jsonFiles;
};

// read files contents
const getFilesContent = (folders) => {
  let jsonContent = {};

  // Reading content of JSON files
  for (let filePath of folders) {
    let content = fs.readFileSync(filePath, 'utf8'); // Read file content
    try {
      jsonContent[filePath] = content; // Parse the content as JSON
    } catch (e) {
      console.error(e);
    }
  }
  return jsonContent;
};

const getFileContent = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf8'); // Read file content
  return content;
};

const writeFileContent = (filePath, content) => {
  fs.writeFile(
    filePath,
    content,
    (err) => {
      if (err) {
        throw err;
      }
      console.log('> write file finished. file path:', filePath);
    },
  );
}


exports.getFilesPath = getFilesPath;
exports.getFilesContent = getFilesContent;
exports.getFileContent = getFileContent;
exports.writeFileContent = writeFileContent;