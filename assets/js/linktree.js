function loadView() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("person") !== "zoey" && urlParams.get("person") !== "zoeyvid" && urlParams.get("person") !== "david") window.location.href = "https://zoeyvid.de/"
    fetch("https://zoeyvid.de/assets/socials/" + urlParams.get("person") + ".json")
    .then((response) => {
      return response.json()
    })
    .then((json) => {
        document.getElementsByTagName('body')[0].classList.add("bg-gradient-to-r");
        document.getElementsByTagName('body')[0].classList.add(json.colorFrom);
        document.getElementsByTagName('body')[0].classList.add(json.colorTo);
        document.getElementById("name").innerHTML = json.name;
        document.getElementById("bild").src = json.profilbild;
        json.links.forEach(element => {
          document.getElementById("links").innerHTML += '<a href="' + element.url + '"><div class="text-center text-white text-2xl font-bold flex items-center justify-center p-6 rounded-md hover:bg-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>' + element.name + '</div></a>';
          console.log(element)
        });
        console.log(json)
    })
}
 
