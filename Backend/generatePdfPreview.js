async function generate(file) {
    const path = require('path');
    const pdf = require('pdf-poppler');

    let opts = {
      format: 'jpeg',
      out_dir: path.dirname("..\\Databases\\PdfPreview\\testfile"),
      out_prefix: path.basename(file, path.extname(file)),
      page: null
    }
    return pdf.convert(file, opts)
  }

module.exports = generate;