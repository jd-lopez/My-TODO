function getUserId(req) {
  // Keep compatibility with the older request field names used earlier in the project.
  return req.user?.id || req.userId?.id || req.userID?.id;
}

module.exports = getUserId;
