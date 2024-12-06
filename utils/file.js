const fs = require('fs');
const path = require('path');

// read all file path in folrder
const getFilesPath = (dirPath, filePattern, ignorePath) => {
  let files = fs.readdirSync(dirPath);
  let jsonFiles = [];

  for (let fileName of files) {
    let filePath = path.join(dirPath, fileName);
    let stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      jsonFiles = jsonFiles.concat(getFilesPath(filePath, filePattern, ignorePath));
    } else {
      // if (path.extname(fileName) === filePattern) 
      const isInIgnorePath = ignorePath ? filePath.match(path.resolve(ignorePath)) : false;
      if (!isInIgnorePath) { jsonFiles.push(filePath); }
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