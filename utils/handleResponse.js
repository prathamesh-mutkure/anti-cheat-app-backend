exports.handleError = (res, err, code) => {
  return res.status(code).json({
    err: err,
  });
};

exports.handleSuccess = (res, msg) => {
  return res.json({
    msg: msg,
  });
};
