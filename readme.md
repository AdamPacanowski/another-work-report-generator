# Another work report generator

Do you want to generate report from your repositories? Now you can do it in simple way.

## Features

TBD

## Usage

### Installation

```
npm install -g another-work-report-generator
```

Script requires node version at least 6.9.0.

### Launching

```
another-work-report-generator [options]
```

#### Available options

You can check available options and default values by:
```
another-work-report-generator --help
```

List of options: 
* ```version``` - Show version number
* ```path``` - Repositories root path (default: script folder)
* ```output-path``` - Generated report path (default: script folder)
* ```month``` - Report month (default: last or current month, depending on the day of the month)
* ```year``` - Report year (default: last or current year, depending on the day of the month)
* ```author``` - Report author name (default: name from git)
* ```max-hours-per-day``` - Number of max hours per day (default: 7)
* ```min-commit-time ``` - Number of min commit time in hours (default: 0.25)
* ```graduation``` - Smallest time unit in hours (default: 0.25)
* ```silent``` - Disable output in console (default: false)
* ```disable-auto-open-file``` - Disable auto opening new report file (default: false)

## Changelog

TBD

## TODO List

TBD
