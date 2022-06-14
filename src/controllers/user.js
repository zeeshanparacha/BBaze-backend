exports.login = (_, res) => {
  res.json({
    success: true,
    message: "Successfully fetch users",
    data: [1, 2, 3, 4],
  });
};
