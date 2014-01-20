
var UserModel = function(source){
    if (source) {
        for (var prop in source) {
            this[prop] = source[prop];
        }
    }
};


exports.User = UserModel;