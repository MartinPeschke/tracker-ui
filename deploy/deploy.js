
var containerName = 'public',
    path = require('path'),
    async = require('async'),
    fs = require('fs'),
    azure = require('azure'),
    blobService = azure.createBlobService(),
    walk = function(root, each_done, path) {
        path=path||root;
        fs.readdirSync(path).forEach(function(file) {
            var newPath = path + '/' + file;
            var stat = fs.statSync(newPath);
            if (stat.isFile()) {
                each_done(file, newPath.substr(root.length+1), newPath);
            } else if (stat.isDirectory()) {
                walk(root, each_done, newPath);
            }
        });
    },
    uploadFile = function (b_service, c_name){
        return function(name, relPath, absPath){
            b_service.createBlockBlobFromFile(c_name
                , relPath       // blobName
                , path.normalize(absPath)   // localName
                , function done(error){
                    if(!error){
                        console.log("Uploaded: " + relPath);
                    }
                });
        };
    },
    uploadFiles = function(b_service, c_name){
        return function(){
            var root = __dirname +"/../public";
            walk(root, uploadFile(b_service, c_name));
        };
    },
    emptyContainer = function(b_service, c_name, next){
        var deleteBlob = function(blob){
            return function(_cb){
                b_service.deleteBlob(c_name, blob.name,
                    function(error, isSuccessful){
                        console.log((isSuccessful?"Deleted ":"FAILED to delete ") + blob.name);
                        _cb(null, isSuccessful);
                    }
                );
            }
        };

        b_service.listBlobs(c_name, function(error, blobs){
            async.parallel(
                blobs.map(deleteBlob),
                next
            );
        });
    },

    __main__ = function(error){
        if(!error){
            uploadFiles(blobService, containerName)();

            var root = __dirname +"/../public/";
            blobService.createBlockBlobFromFile('$root'
                , 'index.html'       // blobName
                , path.normalize(root+'index.html')   // localName
                , function done(error){
                    if(!error){
                        console.log("Uploaded: " + path.normalize(root+'index.html'));





                    }
                });
        }
    };

blobService.createContainerIfNotExists(containerName, {publicAccessLevel : 'blob'}, __main__);