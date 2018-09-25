var fs = require('fs-extra');
fs.mkdirs("www/WEB-INF");
fs.copy("src/WEB-INF/web.xml","www/WEB-INF/web.xml");
exports.BUILD_DIR = 'src';
