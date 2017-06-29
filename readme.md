# Another work report generator

Do you want to generate report from your repositories? Now you can do it in simple way.

## Features

* Generate report from all repositories in ```path``` folder.
* Report generated in ```xlsx``` format.
* Calculate time spend based on number of lines changed (sure this method can be false).
* Many settings are set using indirect data (e.g ```author``` can be fetched from git settings)
* Columns available in report: fullhash, hash, date, time spend(h), project (folder), description. 
* Auto open file after it is generated.
* Display information about commits per day in console.

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
* ```path``` - Repositories root path (default: current working directory)
* ```output-path``` - Generated report path (default: current working directory)
* ```month``` - Report month (default: last or current month, depending on the day of the month)
* ```year``` - Report year (default: last or current year, depending on the day of the month)
* ```author``` - Report author name (default: name from git)
* ```max-hours-per-day``` - Number of max hours per day (default: 7)
* ```min-commit-time ``` - Number of min commit time in hours (default: 0.25)
* ```graduation``` - Smallest time unit in hours (default: 0.25)
* ```silent``` - Disable output in console (default: false)
* ```disable-auto-open-file``` - Disable auto opening new report file (default: false)
* ```disable-calendar``` - Disable displaying calendar with commits counters (default: false)
* ```disable-interactive``` - Disable interactive questions (default: false)

## Changelog

### 3.0.0

* First public version.
* Refactored input (default values, way to pass arguments) and console output.
* Now it can be installed and used as global package.
* Auto open file feature.
* Changed library to generating xlsx file.

### 3.0.1

* Eslint added
* Changed colors library to chalk
* Some files refactored (commitsGetter, defaults)
* Fixed problem with modifying the file without modifying it.

### 3.0.2

* Quick fix - Removed ```colors``` library from code.

### 3.0.3

* Quick fix - Displaying package version.

### 3.1.0

* Added calendar with commits counters.

![calendar-screen](images/calendar.png)

* Added question about report generator.
* Added new parameters (```disable-calendar``` and ```disable-interactive```)
* Improved displaying in console.
* Fixed problem with filepath containing spaces.



## TODO List

* Improve ```standardCalculation``` method
* Change to more flexible date range
* Generated file should be more configurable (e.g columns order)
* Passing arguments by config file
* Add other sources (not only git repos) e.g reports from bug trackers
* Add tests
