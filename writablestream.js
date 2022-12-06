const fs = require('fs')

const writableStream = fs.createWriteStream('output.txt');

writableStream('Ini merupakan teks baris pertama!\n');
writableStream('Ini merupakan teks baris kedua!\n');
writableStream.end('Ini dari writeable stream!');