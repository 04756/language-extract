# language-cli

Extracts chinese text based on configuration for easy summarisation of internationalised dictionaries.


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
  "output": "./test-project/output"
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

```fileTypes```: cli only work in specific file types. ```fileType``` is not conflict with ```ignore.fileTypes```, they work together

```ignore```: cli will not work in specific folders or specific file types
```
"ignore": {
    "folders": ["./test-project/ignore"],
    "fileTypes": [".json"]
  }
```

```output```: the result of text extract will be written in output folder