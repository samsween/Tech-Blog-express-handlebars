const commentForm = document.getElementById("comment-form");
const likeBtns = Array.from(document.querySelectorAll(".btn-like"));
const removeLikeBtns = Array.from(document.querySelectorAll(".btn-remove"));
let deleteBtns = Array.from(document.querySelectorAll(".btn-delete"));

function addDeleteBtns() {
  deleteBtns?.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      console.log(event);
      const id = event.target.dataset.id;
      console.log(id);
      const response = await fetch(`/api/comment/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        location.reload();
      }
    });
  });
}

function addCommentForm() {
  commentForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const comment = document.getElementById("comment").value;
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        body: comment,
        blog_id: commentForm.dataset.id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      location.reload();
    } else {
    }
  });
}

function addLikeBtns() {
  likeBtns?.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const { id } = event.target.closest(".btn-like").dataset;

      const response = await fetch(`/api/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_id: id,
        }),
      });
      if (response.ok) {
        location.reload();
      }
    });
  });
}

function addRemoveLikeBtn() {
  removeLikeBtns?.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();

      const { likeid, comment_id } = event.target.dataset;
      console.log(comment_id);
      const response = await fetch(`/api/like`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: likeid, id: comment_id }),
      });
      if (response.ok) {
        location.reload();
      }
    });
  });
}

function commentJs() {
  addCommentForm();
  addLikeBtns();
  addRemoveLikeBtn();
  addDeleteBtns();
}

export {commentJs}
