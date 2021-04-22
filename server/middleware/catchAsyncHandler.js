// // Higher order function to handle  req, without try/catch block
function catchAsyncHandler(fn) {
  return function (req, res, next) {
    return fn(req, res, next).catch(next);
  };
}

module.exports = catchAsyncHandler;
