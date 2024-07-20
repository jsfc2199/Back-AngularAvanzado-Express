const { response } = require("express");

const getTodo = (req, res = response) => {

  const search = req.params.todo;
  
  res.status(200).json({
    ok: true,
    ms: "getTodo",
    search,
  });
};

module.exports = {
  getTodo,
};
