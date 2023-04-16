const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res){
    try {
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
      
        if (req.xhr){
          return res.status(200).json({
            data: {
              post: post
            },
            message: "Post Created!!"
          });
        }

        req.flash('success', "Post Published!!")
        return res.redirect('back');
    } catch (err) {
        console.log('Error in creating the post:', err);
        return;
    }
}


// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         //id means converting the object into string
//         if (post.user == req.user.id){
//             post.remove();

//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     })
// }
module.exports.destroy = async function(req, res) {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.redirect('back');
    }

    if (post.user != req.user.id) {
      return res.redirect('back');
    }
    req.flash('success', "Post Deleted");
    await post.deleteOne();
    await Comment.deleteMany({ post: req.params.id });

    return res.redirect('back');
  } catch (err) {
    console.error('Error in deleting post:', err);
    return res.redirect('back');
  }
}

