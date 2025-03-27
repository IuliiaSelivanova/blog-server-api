import Post from "../../models/Post.js";

export default async function getPost(req, res) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
}
