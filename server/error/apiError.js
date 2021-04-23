class ApiError {
  constructor(code, message) {
    this.message = message;
    this.code = code;
  }
  static badRequest(msg) {
    // cast error, invalid input fields
    return new ApiError(400, msg);
  }
  static notFound(msg) {
    // Resourse/request Not Found
    return new ApiError(404, msg);
  }
  static internalServerError(msg) {
    return new ApiError(500, msg);
  }
  static unauthorizedRequest(msg) {
    //invalid auth/permission
    return new ApiError(401, msg);
  }
  static UnprocessableError(msg) {
    //Unprossesable entity
    return new ApiError(422, msg);
  }
  static forbiddenRequest(msg) {
    //invalid_operation, refuses to authorize it, Key is expired or does not exists
    return new ApiError(403, msg);
  }
  static requestConflict(msg) {
    //request conflict with current state - user/email is already taken
    return new ApiError(409, msg);
  }
}

module.exports = ApiError;
