# language-cli

Extracts chinese text based on configuration for easy summarisation of internationalised dictionaries.

Now is only support chinese text be extracted or counted, text match regex pattern are in future design now.


## Quick Start

- install cli
```
npm i language-cli
```

- configration

create new file named ```language-cli.config.json```

```
{
  "src": "./test-project",
  "fileTypes": [".js",".jsx",".ts",".tsx"],
  "ignore": {
    "folders": ["./test-project/ignore", ".*output", ".*dist$"],
    "fileTypes": [".json", "\\.env.*", ".DS_Store", ".babelrc.js", "env"]
  },
  "output": "./test-project/output",
  "importFunction": {
    "functionName": "t",
    "functionAlias": "t",
    "moduleName": "i18Next",
    "isDefault" : false
  }
}
```

- usage

```
language [command] [options]
```


## Supported arguments and commands

- Help Usage
To display basic commands and arguments
```
language -h
```

- All Usage

```
Usage: language [options] [command]

Options:
  -v, --version   show version
  -h, --help      display help for command

Commands:
  run [options]
  help [command]  display help for command
```

```
Usage: language run [options]

Options:
  -e, --extract  extract specific language words in files
  -c, --count    count specific language words in files
  -w, --wrap     wrap words with specific function
  -q, --quiet    loading file without detail
  -h, --help     display help for command
```


## How to write configration

```src``` : cli work source folder

```fileTypes```: cli only work in specific file types.
If exist conficts bettween ```fileType``` and ```ignore.fileTypes```, ```ignore.fileTypes``` priority is higher.

```ignore```: cli will not work in specific folders or specific file types
```
"ignore": {
  "folders": ["./test-project/ignore"],
  "fileTypes": [".json"]
}
```

```output```: the result of text extract will be written in output folder

```importFunction```: the function translate use, the details of obj are show in follow,
```
"importFunction": {
  "functionName": "t",
  "functionAlias": "t",
  "moduleName": "i18Next",
  "isDefault" : false
}
```
  - if set <code>isDefault</code> as true, the output will like 
  ```
  import t from 'i18Next';
  ```
  else, the output will like
  ```
  import { t } from 'i18Next';
  ```

## Features

- Effect of processing string templates

Input:
```js
const a = `这是需要被包裹的中文 ${test}`
```
After use <code>language run -w</code>, the output will be as follow:
```js
const a = `${t('这是需要被包裹的中文')} ${test}`
```

If the variable are in the middle of the template.

Input:
```js
const a = `这是需要被包裹的中文 ${test} 变量在中间`
```
After use <code>language run -w</code>, the output will be as follow:
```js
const a = `${t('这是需要被包裹的中文')} ${test} ${t('变量在中间')}`
```