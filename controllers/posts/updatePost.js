import Post from "../../models/Post.js";

export default async function updatePost(req, res) {
  try {
    // ищем нужный пост
    const post = await Post.findById(req.params.id);

    // проверка на соответствие пользователя, который пытается отредактировать пост, автору поста
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true },
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(401)
        .json("Вы не можете редоктировать чужие посты");
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
