function countAllRepos() {
  fetch("https://zoeyvid.de/assets/repos/index.json")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      console.log(Object.keys(json).length)
    })
}

function getAllRepos() {
  fetch("https://zoeyvid.de/assets/repos/index.json")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      Object.keys(json).forEach(element => {
        document.getElementById("Projekte").innerHTML += "<a href='https://zoeyvid.de/projekt?projekt=" + element + "' class='text-white'><div class='bg-gray-800 rounded-lg p-4 m-2' style='width: calc(100vw/2.1);'><h1 class='text-2xl font-bold hover:underline' id='" + element + "Headline'>" + element + "</h1><p class='text-gray-300'>" + json[element].description + "</p><div id='" + element  + "Topics'></div></div></a></br>"
      })
      return json
    }).then((json) => {
      Object.keys(json).forEach(element => {
        console.log(json[element].topics)
        json[element].topics.forEach(topic => {
          document.getElementById(element + "Topics").innerHTML += "<span class='bg-gray-700 rounded-lg p-1 mr-2'>" + topic + "</span>"
        })
        if(Boolean(json[element].fork)) {
          document.getElementById(element + "Headline").innerText += " (Fork)"
        }
      })
    })
}

function getProjekt() {
  const urlParams = new URLSearchParams(window.location.search);
  var exist = false
  fetch("https://zoeyvid.de/assets/repos/index.json")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      Object.keys(json).forEach(element => {
        if (element == urlParams.get("projekt")) {
          exist = true
          document.title = element + " - ZoeyVid"
          var description = document.createElement('meta'); description.setAttribute('name', 'description'); description.content = json[element].description; document.getElementsByTagName('head')[0].appendChild(description);
        }
      })
    }).then(() => {
      if (!exist) window.location.href = "https://zoeyvid.de/"
      readHTML("Projekt", "https://zoeyvid.de/assets/repos/" + urlParams.get("projekt") + ".html")
    })
}
