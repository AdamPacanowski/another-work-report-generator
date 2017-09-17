const os = require('os');
const path = require('path');
const Excel = require('exceljs');
const rimraf = require('rimraf');
const excelCreator = require('../src/excelCreator');

test('simple excel file', (done) => {
  const calculatedCommits = [
    {
      'fullhash':'fb1eb3ead0e20fed1029bea0edd7626964df326b',
      'hash':'fb1eb3e',
      'date':'2017-01-01T11:00:00.000Z',
      'shortDate':'2017-01-01',
      'text':'test-commit-0',
      'project':'repo1',
      'lines':10,
      'time':0.5
    },
    {
      'fullhash':'3d14b278e7e68d4d775cf363021e02f7eb88551f',
      'hash':'3d14b27',
      'date':'2017-01-01T13:00:00.000Z',
      'shortDate':'2017-01-01',
      'text':'test-commit-1',
      'project':'repo1',
      'lines':90,
      'time':6.25
    },
    {
      'fullhash':'7066af8f9125b85f41b014453802b2f1c488f7d2',
      'hash':'7066af8',
      'date':'2017-01-02T11:00:00.000Z',
      'shortDate':'2017-01-02',
      'text':'test-commit-2',
      'project':'repo1',
      'lines':50,
      'time':7
    },
    {
      'fullhash':'443e2a18619c1135f24d9b5e1f7b205c3e67d93e',
      'hash':'443e2a1',
      'date':'2017-01-03T11:00:00.000Z',
      'shortDate':'2017-01-03',
      'text':'test-commit-3',
      'project':'repo1',
      'lines':50,
      'time':7
    }
  ];

  const reportName = 'test.xlsx';
  const fullPath = path.join(os.tmpdir(), reportName);

  rimraf.sync(fullPath);

  excelCreator(calculatedCommits, {
    year: '2017',
    month: '1',
    outputPath: os.tmpdir(),
    reportName,
    disableAutoOpenFile: true
  }).then(() => {
    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(fullPath)
      .then(function() {
        const worksheet = workbook.getWorksheet(1);
        const firstRow = worksheet.getRow(1);

        expect(firstRow.getCell('A').value).toBe('Fullhash');
        expect(firstRow.getCell('B').value).toBe('Hash');
        expect(firstRow.getCell('C').value).toBe('Date');
        expect(firstRow.getCell('D').value).toBe('Time spend (h)');
        expect(firstRow.getCell('E').value).toBe('Project');
        expect(firstRow.getCell('F').value).toBe('Description');

        const secondRow = worksheet.getRow(2);

        expect(secondRow.getCell('A').value).toBe('fb1eb3ead0e20fed1029bea0edd7626964df326b');
        expect(secondRow.getCell('B').value).toBe('fb1eb3e');
        expect(secondRow.getCell('C').value).toBe('2017-01-01');
        expect(secondRow.getCell('D').value).toBe(0.5);
        expect(secondRow.getCell('E').value).toBe('repo1');
        expect(secondRow.getCell('F').value).toBe('test-commit-0');

        const firstEmptyRow = worksheet.getRow(6);

        expect(firstEmptyRow.getCell('A').value).toBe(null);



        rimraf.sync(fullPath);

        done();
      });
  });
});
