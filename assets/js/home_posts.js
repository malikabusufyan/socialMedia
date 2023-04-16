{
    //Method to submit the form using Ajax
    let createPost = function(){
        let newPostFrom = $('#new-post-form');

        newPostFrom.submit(function(e){
            e.preventDefault();
            // get the user ID from the HTML
            let userId = $('#new-post-form').find('[name=user]').val();

            // add the user ID to the post data
            let postData = newPostFrom.serialize() + '&user=' + userId;
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: postData,
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button',newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create Post in DOM

    let newPostDom = function(post) {
    return $(`<li id="post-${post._id}">
                <p>
                    <small>
                        <a class="delete-post-button" href="/posts/destroy/${post._id}"><i class="bi bi-trash-fill"></i></a>
                    </small>
                    ${post.content}
                    <br>
                    
                    <small>
                        ${post.user.name}
                    </small>
                </p>
                <div class="post-comments">
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Comments" required>
                        <input type="hidden" name="post" value="${post._id}">
                        <input type="submit" value="Add Comment">
                    </form>
                    <div class="post-comments-list">
                        <ul id="post-comments-${post._id}">
                        </ul>
                    </div>
                </div>
            </li>`);
            
}

    //Method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.data.post_id}`).remove();
                },error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

   createPost(); 
}