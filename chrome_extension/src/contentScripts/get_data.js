chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "GET_PAGE_DATA") {
    try {
      let title = document.getElementsByTagName("title")[0].textContent
      let descriptionEl = document.querySelectorAll("meta[name=description]")[0]
      let description = descriptionEl ? descriptionEl.getAttribute("content") : title
      sendResponse({
        title: title.trim(),
        link: location.href,
        description: description.trim(),
      })
    } catch (error) {
      sendResponse({
        title: "",
        link: "",
        description: "",
      })
    }
  }
})
