import User from "../../models/User.js";
import bcrypt from "bcrypt"; //библиотека для хэширования паролей

export default async function loginUser(req, res) {
  try {
    // проверка на существование пользователя с таким логином
    const user = await User.findOne({
      username: req.body.username,
    });
    if (!user) {
      return res
        .status(400)
        .json("Пользователя с таким логином не существует");
    }

    // проверка соответствия паролей
    const validated = await bcrypt.compare(
      req.body.password,
      user.password,
    );
    if (!validated) {
      return res.status(400).json("Неверный пароль");
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}
