const titleEl = document.getElementById("title");
const contentEl = document.getElementById("content");
const userIdEl  = document.getElementById("user-id");

const userId = userIdEl.dataset.userId

async function createBlog(e) {
  e.preventDefault();
  try {
    console.log(titleEl.value);
    const blog = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title: titleEl.value,
        content: contentEl.value,
        user_id:userId
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (blog) {
      alert("blog created");
    }
  } catch (error) {
    console.error("Error creating blog:", error.message);
  }
}

document.addEventListener("submit", createBlog);
