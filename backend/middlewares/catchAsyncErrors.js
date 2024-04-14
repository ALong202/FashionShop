//lớp catchAsyncErrors.js

export default (controllerFunction) => (req, res, next) => 
    Promise.resolve(controllerFunction(req, res, next)).catch(next);  

