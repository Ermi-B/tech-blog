const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");

const blogIdEl  = document.getElementById("blog-id");

const blogId = blogIdEl.dataset.blogId





async function updatePost(e) {
    e.preventDefault();
    try {
    //   const blogID = req.params.id;
      console.log(titleEl.value,contentEl.value)
      const blog = await fetch(`/api/blog/${blogId}`, {
        method: "PUT",
        body: JSON.stringify({
          title: titleEl.value,
          content: contentEl.value,
          
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (blog) {
        alert("blog updated");
        window.location.replace('/dashboard')
      }else{
        alert('error')
      }
    } catch (error) {
      console.error("Error creating blog:", error.message);
    }
  }
  
  document.addEventListener('submit', updatePost)