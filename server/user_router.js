function getUser(req, res) {
  res.status(200).json({});
}

module.exports = function() {
  const router = new (require('express').Router)();
  router.get('/:id', getUser);
  return router;
};
