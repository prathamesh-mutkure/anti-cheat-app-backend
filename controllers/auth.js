const { handleError, handleSuccess } = require("../utils/handleResponse");
const Student = require("../models/Student");

exports.login = (req, res) => {
  const errors = validationResult(req);
  const { id, password } = req.body;

  if (!errors.isEmpty()) {
    return res.json({
      err: errors.errors[0].msg,
    });
  }

  Student.findById(id, (err, user) => {
    if (err) return handleError(res, "Database error, please try again!", 400);

    if (!user) return handleError(res, "User does not exist!", 400);

    if (!user.authenticate(password))
      return handleError(res, "Incorrect username or password!", 401);

    const { _id, fname, lname, assignedExams } = user;

    return res.json({ id: _id, fname, lname, assignedExams });
  });
};
