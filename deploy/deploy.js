process.env.AZURE_STORAGE_ACCOUNT = 'booksys';
process.env.AZURE_STORAGE_ACCESS_KEY = 'BS323SGwtVqgJF+mx3JGpWF81e4rGqt7CHUEJoeu4SsBtO+S+lm9tmx1E6qG68VQ6WFhSPliPMs7ji4QMaTjEQ==';


var azure = require('azure'),
    path = require('path'),
    blobService = azure.createBlobService(),
    containerName = 'tracker-ui';

var fs = require('fs');
var walk = function(root, each_done, path) {
    path=path||root;
    fs.readdirSync(path).forEach(function(file) {
        var newPath = path + '/' + file;
        var stat = fs.statSync(newPath);
        if (/^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)?$/.test(file)) {
            if (stat.isFile()) {
                each_done(file, newPath.substr(root.length+1), newPath);
            } else if (stat.isDirectory()) {
                walk(root, each_done, newPath);
            }
        }
    });
};


function upload(blobService, container){
    return function(name, relPath, absPath){
        blobService.createBlockBlobFromFile(containerName
            , relPath       // blobName
            , path.normalize(absPath    )   // localName
            , function done(error){
                if(!error){
                    console.log("Uploaded: " + relPath);
                }
            });
    };
}

blobService.createContainerIfNotExists(containerName
    , {publicAccessLevel : 'blob'}
    , function done(error){
        if(!error){
            var root = __dirname +"/../public";
            walk(root, upload(blobService));
        }
    }
);