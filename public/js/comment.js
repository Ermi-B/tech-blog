

 const commentEl = document.getElementById('comment')
 const dataEl  = document.getElementById("data");
    const submitBtn = document.getElementById("submit")
 const blogId = dataEl.dataset.blogId;
 const userId = dataEl.dataset.userId;



async function postComment(e){
    e.preventDefault()
    try {
            console.log(blogId,userId)
          const comment = await fetch(`/api/comment`, {
            method: "POST",
            body: JSON.stringify({
              
              content: commentEl.value,
              user_id:userId,
              blog_id:blogId
              
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (comment) {
            
            window.location.replace(`/blog/${blogId}`)
          }else{
            alert('error')
          }
        } catch (error) {
          console.error("Error creating blog:", error.message);
        }
      
}


submitBtn.addEventListener('click',postComment)