const basic = async (req, res) => {
  try {
    return res.status(200).send({
      message: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "error",
    });
  }
};

export { basic };
