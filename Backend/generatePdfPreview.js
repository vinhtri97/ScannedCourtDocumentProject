function generate(file) {
    const path = require('path');
    const pdf = require('pdf-poppler');
    const util = require('util');

    let opts = {
      format: 'jpeg',
      out_dir: path.dirname("..\\Databases\\PdfPreview\\testfile"),
      out_prefix: path.basename(file, path.extname(file)),
      page: null
    }
    pdf.convert(file, opts)
}

module.exports = generate;