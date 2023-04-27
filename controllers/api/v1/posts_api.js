const Post = require('../../../models/post');
const Comment = require('../../../models/comment')

module.exports.index = async function(req, res){

    const posts = await Post.find({})
      .sort('-createdAt')
      .populate('user')
      .populate({
        path:'comments',
        populate:{
          path:'user'
        }
      })

    return res.json(200, {
        message: "List of Posts",
        posts: posts
    });
}

module.exports.destroy = async function(req, res) {
  try {
    let post = await Post.findById(req.params.id);

    // if (!post) {
    //   return res.redirect('back');
    // }

    // if (post.user != req.user.id) {
    //   return res.redirect('back');
    // }
    
    await post.deleteOne();
    await Comment.deleteMany({ post: req.params.id });
    
    // if (req.xhr){
    //       return res.status(200).json({
    //         data: {
    //           post_id: req.params.id
    //         },
    //         message: "Post Deleted!!"
    //       });
    //     }

    // req.flash('success', "Post Deleted");
    return res.json(200, {
        message: "Post and Comment Deleted Successfully!!"
    });

  } catch (err) {
    // console.error('Error in deleting post:', err);
    return res.json(500, {
        message: "Internal Server Error"
    });
  }
}

