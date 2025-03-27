import User from "../../models/User.js";
import bcrypt from "bcrypt"; //библиотека для хэширования паролей

export default async function registerUser(req, res) {
  // хэширование пароля
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(
    req.body.password,
    salt,
  );

  // создание нового User с хэшированным паролем
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  });
  try {
    // созарнение user + отправка ответа
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}
