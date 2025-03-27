import User from "../../models/User.js";
import Post from "../../models/Post.js";

export default async function deleteUser(req, res) {
  if (req.body.id === req.params.id) {
    try {
      // находим в БД пользователя по id
      const user = await User.findById(req.params.id);

      try {
        // удаляем все посты пользователя
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Пользователь удален");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(404).json("Пользователь не найден");
    }
  } else {
    res
      .status(401)
      .json("Вы не можете удалить чужой аккаунт");
  }
}
