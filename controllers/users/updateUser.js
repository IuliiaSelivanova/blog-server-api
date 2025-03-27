import User from "../../models/User.js";
import bcrypt from "bcrypt"; //библиотека для хэширования паролей

export default async function updateUser(req, res) {
  if (req.body.userId === req.params.id) {
    // если меняется пароль, хэшируем его
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(
        req.body.password,
        salt,
      );
    }

    try {
      // ищем в БД юзера с id и обновляем данные
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true },
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res
      .status(401)
      .json(
        "Вы не можете изменить данные чужого пользователя",
      );
  }
}
