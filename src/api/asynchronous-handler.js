const AsynchronousHandler = (callback) => {
    return function (req,res,next) {
        callback(req,res,next).catch(next);
    }
}

module.exports = AsynchronousHandler();