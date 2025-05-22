// This section manages the tab switching.

document.getElementById("signTab").addEventListener("click", () => {
  openTab("signPage");
});
document.getElementById("messageTab").addEventListener("click", () => {
  openTab("messagePage");
});

function openTab(pageName) {
  let i, tabcontent;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  document.getElementById(pageName).style.display = "block";
}
