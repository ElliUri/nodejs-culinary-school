const http = require('http');
const path = require('path');

const {mimeTypes} = require('./utilities/mime.js');
const {staticFile} = require('./utilities/static_file');

const PORT = 3500;

http.createServer(function(req, res) {
    const url = req.url;
    console.log(url);

    switch (url) {
        case '/': 
        console.log('main page');
        staticFile(res, './public/html/home.html', ".html");
        break;

        case '/about':
            console.log('about us');
            staticFile(res, './public/html/about.html',".html");
        break;

            default: 
            const extname = String(path.extname(url)).toLocaleLowerCase();
            if (extname in mimeTypes) {
                staticFile(res, path.join('./public', url), extname)
            } else {
                res.statusCode = 404;
                res.end('404 not found')
            }
    }
}).listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})