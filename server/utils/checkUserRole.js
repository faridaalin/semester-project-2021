const checkUserRole = (role) => {
  if (role !== 'admin') {
    return next(
      ApiError.forbiddenRequest('You must be logged in as admin user')
    );
  }
};

module.exports = checkUserRole;
