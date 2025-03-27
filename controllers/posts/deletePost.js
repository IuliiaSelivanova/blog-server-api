import Post from "../../models/Post.js";

export default async function deletePost(req, res) {
  try {
    // ищем пост в БД
    const post = await Post.findById(req.params.id);

    // прверяем на соответствие автору поста
    if (post.username === req.body.username) {
      try {
        await post.deleteOne();

        res.status(200).json("Пост удален");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(401)
        .json("Вы не можете удалять чужие посты");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
