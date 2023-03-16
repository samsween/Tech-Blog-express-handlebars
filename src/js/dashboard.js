const editBtns = document.querySelectorAll(".edit");
const deleteBtns = document.querySelectorAll(".delete");
const modal = document.getElementById("modal");
const addBtn = document.getElementById("add");

const handleClickOutside = (e) => {
  const modalContentDiv = document.getElementById("modal-content");
  if (modalContentDiv.contains(e.target)) {
    return;
  }
  console.log("click outside");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.removeEventListener("click", handleClickOutside);
};
const createEditFormListener = (id) => {
  const editForm = document.getElementById("edit-form");
  editForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    const response = await fetch(`/api/blog/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body: body.trim(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  });
};
const createNewFormListener = () => {
  const editForm = document.getElementById("edit-form");
  editForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const response = await fetch(`/api/blog`, {
      method: "POST",
      body: JSON.stringify({
        title,
        body: body.trim(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  });
};

const createModal = (post = null) => {
  modal.innerHTML = "";
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  modal.innerHTML = `
    <div class="w-1/2 h-1/2 bg-white flex flex-col gap-4 p-4" id="modal-content">
    <h1 class="text-3xl">${post ? "Edit": "Add"} Blog</h1>
    <form class="flex flex-col gap-4" id="edit-form">
      
        <div class="w-full flex flex-col gap-2">
            <label class="text-xl">Title</label>
            <input type="text" class="border border-gray-500 p-2" id="title" placeholder="Title" value="${post ? post.title: ""}">
        </div>
        <div class="w-full flex flex-col gap-2">
            <label class="text-xl">Body</label>
            <textarea type="text" class="border border-gray-500 p-2" id="body" rows="4" value="${post ? post.body: ""}"
            placeholder="Body">${post ? post.body: ""}</textarea>
        </div>
        <button class="p-2 rounded-xl border bg-indigo-200 text-xl hover:text-indigo-400 ">${post ? "Edit": "Add"}</button>
    </form>
</div>
      `;
  document.addEventListener("click", handleClickOutside, {capture: true});
};

function dashboardJs() {

  addBtn?.addEventListener("click", async (event) => {
    event.preventDefault();
    createModal();
    createNewFormListener();
  });
  
  editBtns?.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const { id } = event.target.dataset;
  
      const response = await fetch(`/api/blog/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        createModal(data);
        createEditFormListener(data.id);
      }
    });
  });
  
  deleteBtns?.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      const { id } = event.target.dataset;
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/dashboard");
      }
    });
  });
  
}

export {dashboardJs}
