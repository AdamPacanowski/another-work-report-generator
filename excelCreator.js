const Excel = require('exceljs');

module.exports = function(calculatedCommits, settings) {
  const workbook = new Excel.Workbook();

  const sheet = workbook.addWorksheet(`Report ${ settings.year }.${ settings.month }`);
  sheet.columns = [
    { header: 'Fullhash', key: 'fullhash', width: 42 },
    { header: 'Hash', key: 'hash', width: 8 },
    { header: 'Date', key: 'date', width: 12, style: { numFmt: 'dd/mm/yyyy' } },
    { header: 'Time spend (h)', key: 'timeSpend', width: 14 },
    { header: 'Project', key: 'project' },
    { header: 'Description', key: 'description' }
  ];

  calculatedCommits.forEach((commit) => {
    console.log(commit.time)
    sheet.addRow({
      fullhash: commit.fullhash,
      hash: commit.hash,
      date: commit.shortDate,
      timeSpend: commit.time,
      project: commit.project,
      description: commit.text
    });
  });

  sheet.getCell('K1').value = "Sum:";
  sheet.getCell('L1').value = {formula: "SUM(D:D)"};

  workbook.xlsx.writeFile(`report-${ settings.year }-${ settings.month }.xlsx`)
    .then(function() {
        // done
    });
};