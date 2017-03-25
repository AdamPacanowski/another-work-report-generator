const path = require('path');
const Excel = require('exceljs');
const opn = require('opn');

module.exports = function(calculatedCommits, settings) {
  const workbook = new Excel.Workbook();

  const sheet = workbook.addWorksheet(`Report ${ settings.year }.${ settings.month }`);
  sheet.columns = [
    { header: 'Fullhash', key: 'fullhash', width: 42 },
    { header: 'Hash', key: 'hash', width: 8 },
    { header: 'Date', key: 'date', width: 12, style: { numFmt: 'dd/mm/yyyy' } },
    { header: 'Time spend (h)', key: 'timeSpend', width: 14 },
    { header: 'Project', key: 'project', width: 20 },
    { header: 'Description', key: 'description' }
  ];

  const startColumn = 'A';
  const startColumnAsciiCode = startColumn.charCodeAt(0);
  for (let i = 0; i < sheet.columns.length; i++) {
    const columnLetter = String.fromCharCode(startColumnAsciiCode + i);
    sheet.getCell(`${ columnLetter }1`).font = {
      bold: true
    };
  }

  let formulaSum = 0;
  calculatedCommits.forEach((commit) => {
    sheet.addRow({
      fullhash: commit.fullhash,
      hash: commit.hash,
      date: commit.shortDate,
      timeSpend: commit.time,
      project: commit.project,
      description: commit.text
    });
    formulaSum += commit.time;
  });

  sheet.getCell('K1').value = 'Sum:';
  sheet.getCell('K1').font = {
    bold: true
  };
  sheet.getCell('L1').value = {formula: 'SUM(D:D)', result: formulaSum};

  const fullPathToReportFile = path.join(settings.outputPath, settings.reportName);
  workbook.xlsx.writeFile(fullPathToReportFile)
    .then(() => {
      if (!settings.disableAutoOpenFile) {
        opn(fullPathToReportFile, {
          wait: false
        });
      }
    });
};