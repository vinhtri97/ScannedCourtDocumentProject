const fs = require('fs');
const path = require('path')
const readdirPromise = require('util').promisify(fs.readdir);
let directories = [{type:"Civil", directory:path.dirname(__dirname) + '\\Databases\\Civil'}, 
                        {type:"Criminal", directory:path.dirname(__dirname) + '\\Databases\\Criminal'}];

let promises = [];
directories.forEach(dir =>{
    let directory = dir.directory;
    promises.push(readdirPromise(directory));
});

Promise.all(promises)
    .then(results => console.log(results))
    .catch(err => console.log(err));