let url = "https://wme-image-search-api.herokuapp.com/README.md"

async function getData(url) {
  let downloadData = await fetch(url)
  let data = await downloadData.text()
  document.getElementById('content').innerHTML = marked(data)
}

window.onload = getData(url)