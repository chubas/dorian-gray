var withDeLorean = function(callback) {
    DeLorean.globalApi(true);
    callback();
    DeLorean.reset();
    DeLorean.globalApi(false);
};
