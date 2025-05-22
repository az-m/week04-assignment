// globals

const apiRoot = import.meta.env.VITE_API_ROOT;

// ====================================================================================

// This section manages the tab switching.

// event listeners
document.getElementById("signTab").addEventListener("click", () => {
  openTab("signPage");
});
document.getElementById("messageTab").addEventListener("click", () => {
  openTab("messagePage");
});

// event handler
function openTab(pageName) {
  let i, tabcontent;

  // hide all the tabs
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // make the one we selected visible again
  document.getElementById(pageName).style.display = "block";
}

// ====================================================================================

// This section submits the form

const form = document.getElementById("form");

function handleSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const formValues = Object.fromEntries(formData);

  const API = apiRoot + "addMessage";

  fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formValues),
  });

  form.reset();
}

form.addEventListener("submit", handleSubmit);
