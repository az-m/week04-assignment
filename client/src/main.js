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

  if (pageName === "messagePage") {
    showMessages();
  } else {
    removeMessages();
  }
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

// ====================================================================================

// This section get the messages from the API and shows them

async function showMessages() {
  const messages = await getMessages();
  makeMessageElements(messages);
}

async function getMessages() {
  // go go get messages
  const API = apiRoot + "messages";
  const response = await fetch(API);
  const messageData = await response.json();
  return messageData;
}

function makeMessageElements(messageArr) {
  // I'd like the newest messages at the top please
  messageArr.reverse();

  // creates the div for each upgrade item, populates it with the data, and adds it to the messages section in the dom
  messageArr.forEach((item, index) => {
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "message");
    const section = document.getElementById("messages");
    section.appendChild(newDiv);

    const pName = document.createElement("p");
    const pLocation = document.createElement("p");
    const pMessage = document.createElement("p");
    const pTimestamp = document.createElement("p");

    pName.textContent = item.name;
    pLocation.textContent = item.location;
    pMessage.textContent = item.content;
    pTimestamp.textContent = item.created_at;

    // get the div we just added back from the DOM to add its content elements
    const div = document.getElementsByClassName("message")[index];

    div.appendChild(pName);
    div.appendChild(pLocation);
    div.appendChild(pMessage);
    div.appendChild(pTimestamp);
  });
}

// ====================================================================================

function removeMessages() {
  const section = document.getElementById("messages");
  section.replaceChildren();
}
