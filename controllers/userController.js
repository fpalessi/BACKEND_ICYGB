const User = require("../models/User");
const { generateId } = require("../helpers/ID");
const { generateToken } = require("../helpers/JWT");

const register = async (req, res) => {
  const { email } = req.body;
  const checkUserExistence = await User.findOne({ email });
  if (checkUserExistence) {
    return res
      .status(400)
      .json(
        `Ya existe un usuario registrado con este mismo correo -> ${email}`
      );
  }
  try {
    const user = new User(req.body);
    user.token = generateId();
    await user.save();
    res.json(`Usuario creado correctamente con los siguientes datos: ${user}`);
  } catch (error) {
    res.json(`Tienes el siguiente error: ${error}`);
  }
};
const authenticate = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json(
        `No existe ningún usuario con el correo que has introducido (${email})`
      );
  }
  if (!user.confirmed) {
    return res.status(403).json("Tu cuenta no ha sido confirmada");
  }
  if (await user.checkPass(password)) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};
const confirm = async (req, res) => {
  const { token } = req.params;
  //Checking the existence of an user with this especific token
  const userConfirm = await User.findOne({ token });
  console.log(userConfirm);
  if (!userConfirm) {
    const error = new Error("Token No Válido");
    return res.status(403).json({ msg: error.message });
  }
  try {
    userConfirm.confirmed = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "User Successfully Confirmed" });
    console.log(userConfirm);
  } catch (error) {
    console.log(error);
  }
};
const passwordResetter = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(404)
      .json(
        `No existe ningún usuario con el correo que has introducido (${email})`
      );
  }
  try {
    user.token = generateId();
    await user.save();
    res.json({ msg: "Hemos enviado un email con las instrccuiones" });
  } catch (error) {
    console.log(error);
  }
};
const checkToken = async (req, res) => {
  const { token } = req.params;
  const validToken = await User.findOne({ token });
  if (validToken) {
    res.json({ msg: "Token Válido y el Usuario existe" });
  } else {
    const error = new Error("Token No Valido");
    return res.status(404).json({ msg: error.message });
  }
};
const getNewPass = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ token });
  if (user) {
    user.password = password;
    user.token = "";
    try {
      await user.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token No Valido");
    return res.status(404).json({ msg: error.message });
  }

  console.log(token);
  console.log(password);
  console.log(user.password);
};
const getNewUsername = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};
const profile = async (req, res) => {
  const { user } = req;

  res.json(user);
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("El usuario ha sido eliminado");
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllUsers = async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  authenticate,
  confirm,
  passwordResetter,
  checkToken,
  getNewPass,
  getNewUsername,
  profile,
  deleteUser,
  getAllUsers,
  getUserStats,
};
