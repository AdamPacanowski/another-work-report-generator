const Excel = require('exceljs');

module.exports = function(calculatedCommits) {
  const workbook = new Excel.Workbook();

  const sheet = workbook.addWorksheet('My Sheet');

  workbook.xlsx.writeFile('testfile.xslx')
    .then(function() {
        // done
    });
};