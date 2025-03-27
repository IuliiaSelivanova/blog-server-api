import Post from "../../models/Post.js";

export default async function getPosts(req, res) {
  // проверяем фильтры по username или category
  const username = req.query.user;
  const categoryName = req.query.category;

  try {
    let posts;

    if (username) {
      // ищем посты с определенным username
      posts = await Post.find({ username });
    } else if (categoryName) {
      // ищем посты с определенными категориями
      posts = await Post.find({
        categories: {
          $in: [categoryName],
        },
      });
    } else {
      // ищем все посты
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).jaon(error);
  }
}
