// Dependencies
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

// Constants
const NODE_ENV = process.env.NODE_ENV || 'development';

// Helpers
const helpers = require('./helpers');

// Production render method
const productionRender = (() => {
  // Pre-building template
  const filename = path.join(__dirname, 'views/resume.ejs');
  const template = ejs.compile(fs.readFileSync(filename, 'utf8'), {
    filename : filename,
    context  : Object.assign({}, helpers),
  });
  const css = fs.readFileSync(path.join(__dirname, 'assets/stylesheets/style.css'), 'utf8');

  // Return function that use the pre-built template
  return (resume) => template({ css, resume });
})();

// Development render method
const developmentRender = (resume) => {
  const filename = path.join(__dirname, 'views/resume.ejs');
  const template = ejs.compile(fs.readFileSync(filename, 'utf8'), {
    filename : filename,
    context  : Object.assign({}, helpers),
  });
  const css = fs.readFileSync(path.join(__dirname, 'assets/stylesheets/style.css'), 'utf8');

  return template({ css, resume });
};

function exportPdf (resumeFile, pageFormat) {
  let resume = require(path.join(__dirname, resumeFile))
  const pdf = require('html-pdf')
  const template = render(resume, pageFormat)

  pdf.create(template, {format: pageFormat}).toFile(config.names.resume.pdf, function (err, res) {
    if (err) return console.log(err)
  })
}

// Exports
module.exports = {
  render: NODE_ENV !== 'development' ? productionRender : developmentRender,
  exportPdf: exportPdf,
};
