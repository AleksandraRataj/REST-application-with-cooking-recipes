//funkcja opakowaująca cały routing w try catch
const AsynchronousHandler = (callback) => {
    return function (req,res,next) {
        callback(req,res,next).catch(next);
    }
}

module.exports = AsynchronousHandler;