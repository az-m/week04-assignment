// globals

const apiRoot = import.meta.env.VITE_API_ROOT;

// ====================================================================================

// This section manages the tab switching.

// event listeners
document.getElementById("signTab").addEventListener("click", () => {
  openTab("signTab", "signPage");
});
document.getElementById("messageTab").addEventListener("click", () => {
  openTab("messageTab", "messagePage");
});

// event handler
function openTab(tabName, pageName) {
  let clickedTab = document.getElementById(tabName).getAttribute("class");

  // we don't want repeated clicks on the messages tab to reload them, so let's not do anything if the tab is already the active one
  if (clickedTab != "tab active") {
    let i, pages;

    // hide all the pages
    pages = document.getElementsByClassName("page");
    for (i = 0; i < pages.length; i++) {
      pages[i].style.display = "none";
    }

    // make the one we selected visible again
    document.getElementById(pageName).style.display = "block";

    // swap the tab styles and either show or remove the messages (so that we don't add to them each time we go back to the messages tab, but get them fresh each time)
    if (pageName === "messagePage") {
      swapTabClassLeftRight();
      showMessages();
    } else {
      swapTabClassRightLeft();
      removeMessages();
    }
  }
}

function swapTabClassLeftRight() {
  document.getElementById("signTab").setAttribute("class", "tab inactive");
  document.getElementById("messageTab").setAttribute("class", "tab active");
}

function swapTabClassRightLeft() {
  document.getElementById("messageTab").setAttribute("class", "tab inactive");
  document.getElementById("signTab").setAttribute("class", "tab active");
}

function removeMessages() {
  const section = document.getElementById("messages");
  section.replaceChildren();
}

// ====================================================================================

// This section submits the form

const form = document.getElementById("form");

form.addEventListener("submit", handleSubmit);

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
    pName.setAttribute("class", "msg-name");
    const pLocation = document.createElement("p");
    pLocation.setAttribute("class", "msg-loc");
    const pMessage = document.createElement("p");
    pMessage.setAttribute("class", "msg-cont");
    const pTimestamp = document.createElement("p");
    pTimestamp.setAttribute("class", "msg-date");

    let date = new Date(item.created_at);
    date = date.toDateString();

    pName.textContent = item.name;
    pLocation.textContent = item.location;
    pMessage.textContent = item.content;
    pTimestamp.textContent = date;

    // get the div we just added back from the DOM to add its content elements
    const div = document.getElementsByClassName("message")[index];

    div.appendChild(pName);
    div.appendChild(pTimestamp);
    div.appendChild(pLocation);
    div.appendChild(pMessage);
  });
}

// ====================================================================================

const filter = document.getElementById("filter");
filter.addEventListener("submit", getFiltered);

async function getFiltered(event) {
  const messages = await getByDate(event);
  removeMessages();
  makeMessageElements(messages);
  filter.reset();
}

async function getByDate(event) {
  event.preventDefault();

  const formData = new FormData(filter);
  const formValues = Object.fromEntries(formData);

  const API =
    apiRoot + `messagesByDate?from=${formValues.from}&to=${formValues.to}`;

  const response = await fetch(API);
  const messageData = await response.json();

  return messageData;
}
