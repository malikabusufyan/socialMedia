const Comment = require('../models/comment');
const Post = require('../models/post');

const commentsMailer = require('../mailers/comments_mailer');
const queue = require('../config/kue');
const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async function(req, res) {
  try {
    const post = await Post.findById(req.body.post);

    if (post) {
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      populatedComment = await comment.populate({
        path: 'user',
        select: 'name email'
      });
      // commentsMailer.newComment(populatedComment);
      let job = queue.create('emails', populatedComment).save(function(err){
                if (err){
                    console.log('Error in sending to the queue', err);
                    return;
                }
                console.log('job enqueued', job.id);

            })
      if (req.xhr){
        return res.status(200).json({
          data: {
            comment: populatedComment
          },
          message: "Comment Created!"
        });
      }

      req.flash('success', "Comment Made");
      res.redirect('/');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
};


// module.exports.destroy = function(req, res){
//   Comment.findById(req.params.id, function( err, comment){
//     if(comment.user == req.user.id){
//       let postId = comment.post;
//       comment.deleteOne();

//       Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
//         return res.redirect('back');
//       })
//     }else{
//       return res.redirect('back');
//     }
//   })
// }

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.redirect('back');
    }

    if (comment.user != req.user.id) {
      return res.redirect('back');
    }

    let postId = comment.post;
    await comment.deleteOne();

    let post = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: req.params.id } },
      { new: true }
    );
    req.flash('success', "Comment Deleted Successfully");
    return res.redirect('back');
  } catch (err) {
    console.error('Error in deleting comment:', err);
    return res.redirect('back');
  }
};
