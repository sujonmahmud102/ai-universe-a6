const loadData = (limit) => {
  toggleSpinner(true)
  const url = "https://openapi.programming-hero.com/api/ai/tools"
  fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools, limit))
}

const displayData = (data, limit) => {
  const cardContainer = document.getElementById('card-container')
  cardContainer.innerHTML = '';

  // display 6 data
  const seeMore = document.getElementById('see-more');

  if (data.length > 6 && limit) {
    data = data.slice(0, 6);
    seeMore.classList.remove("d-none")
  } else {
    seeMore.classList.add("d-none")
  }

  // display all data
  data.forEach(singleElement => {

    let list = "<ol>";
    for (let i = 0; i < singleElement.features.length; i++) {
      list += "<li>" + singleElement.features[i] + "</li>";
    }
    list += "</ol>"

    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100">
            <img src="${singleElement.image}" class="img-fluid h-50 p-3 rounded-5"
              alt="...">
            <div class="card-body">
              <h5 class="card-title cardTitle">Features</h5>
              <p class="card-text cardText">
                <div class="features-list">
                 ${list}
                </div>
              </p>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="aiName">${singleElement.name}</h4>
                  <p class="aiDate"> <img class="dateIcon" src="images/calendar3.svg" alt=""> <span>${singleElement.published_in}</span></p>
               
                 </div>
                <div>
                  <button onclick="singleDataDetails('${singleElement.id}')" class="btn bg-danger-subtle
                  " data-bs-toggle="modal" data-bs-target="#aiModal"><img src="images/arrow-right.svg" alt="">
                  </button>
                </div>
               
              </div>
            </div>
          </div>
          
        `
    cardContainer.appendChild(div)
    toggleSpinner(false)

  })
}

const toggleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');
  if (isLoading) {
    spinner.classList.remove("d-none")
  } else {
    spinner.classList.add("d-none")
  }
}

document.getElementById('see-more-btn').addEventListener('click', function () {
  toggleSpinner(true)
  loadData();
})

const singleDataDetails = id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`

  fetch(url)
    .then(res => res.json())
    .then(singleData => displaySingleData(singleData))

}

const displaySingleData = singleData => {
  // console.log(singleData.data.features)
  // header part
  const toolDiscription = document.getElementById('tool-description');
  toolDiscription.innerText = singleData.data.description

  // pricing part
  const price1 = document.getElementById('price1');
  price1.innerText = singleData.data.pricing[0].price + ' ' + singleData.data.pricing[0].plan;

  const price2 = document.getElementById('price2');
  price2.innerText = singleData.data.pricing[1].price + ' ' + singleData.data.pricing[1].plan;

  const price3 = document.getElementById('price3');
  price3.innerText = singleData.data.pricing[2].price + ' ' + singleData.data.pricing[2].plan;

  // features part
  const listElement = document.getElementById('features-list');
  const featuresObj = singleData.data.features;
  for (const key in featuresObj) {

    // console.log(featuresObj[key].feature_name);
    const li = document.createElement('li')
    li.innerText = featuresObj[key].feature_name;
    listElement.appendChild(li)
    console.log(li)
}

  // let list = "<ol>";

  // for (let i = 0; i < singleElement.features.length; i++) {
  //   list += "<li>" + singleElement.features[i] + "</li>";
  // }
  // list += "</ol>"
  // console.log(list)

}

loadData(6);