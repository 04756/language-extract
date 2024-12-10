# language-cli

Extracts chinese text based on configuration for easy summarisation of internationalised dictionaries.


## Quick Start

- install cli
```
npm i language-cli
```

- configration

create new file named ```language-cli.config.json```

```{
  "src": "./test-project",
  "ignore": {
    "folders": ["./test-project/ignore"],
    "fileTypes": [".json"]
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


## How to write configration

```src``` : cli work source folder

```ignore```: cli will not work in specific folders or specific file types
```
"ignore": {
    "folders": ["./test-project/ignore"],
    "fileTypes": [".json"]
  }
```

```output```: the result of text extract will be written in output folder