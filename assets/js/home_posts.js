{
    //Method to submit the form using Ajax
    let createPost = function(){
        let newPostFrom = $('#new-post-form');

        newPostFrom.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostFrom.serialize(),
                success: function(data){
                    console.log(data);
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }

    //Method to create Post in DOM
    createPost(); 
}