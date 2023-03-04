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
  document.getElementById('sort-date').addEventListener('click', function () {
    data.sort(function (a, b) {
      return new Date(a.published_in) - new Date(b.published_in)
    })
    displayData(data)
    seeMore.classList.remove("d-none");
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

// modal section
const displaySingleData = singleData => {
  // header part
  const toolDiscription = document.getElementById('tool-description');
  toolDiscription.innerText = singleData.data.description ? singleData.data.description : 'Not Found';

  // pricing part
  const price1 = document.getElementById('price1');
  price1.innerHTML = `
 <span>  ${singleData.data.pricing ? singleData.data.pricing[0].price : 'Free of Cost'}
 </span> 
  <br>
 <span>  ${singleData.data.pricing ? singleData.data.pricing[0].plan : ''}
 </span>
  `

  const price2 = document.getElementById('price2');
  price2.innerHTML = `
 <span>  ${singleData.data.pricing ? singleData.data.pricing[1].price : 'Free of Cost'}
 </span> 
  <br>
 <span>  ${singleData.data.pricing ? singleData.data.pricing[1].plan : ''}
 </span>
  `

  const price3 = document.getElementById('price3');
  price3.innerHTML = `
  <span>  ${singleData.data.pricing ? singleData.data.pricing[2].price : 'Free of Cost'}
  </span> 
   <br>
  <span>  ${singleData.data.pricing ? singleData.data.pricing[2].plan : ''}
  </span>
   `

  // features part
  const featuresList = document.getElementById('features-list');
  featuresList.innerHTML = '';
  const featuresObj = singleData.data.features;
  for (const key in featuresObj) {
    const li = document.createElement('li')
    li.innerText = singleData.data.features ? featuresObj[key].feature_name : 'Not Found';
    featuresList.appendChild(li)
  }

  // integrations part
  const integrationList = document.getElementById('integrations-list');

  let list = "<ul>";
  for (let i = 0; i < (singleData.data.integrations ? singleData.data.integrations.length : ''); i++) {
    list += "<li>" + singleData.data.integrations[i] + "</li>";
  }
  list += "</ul>"
  integrationList.innerHTML = `${singleData.data.integrations ? list : 'No Data Found'}`;


  // img part
  const imgContainer = document.getElementById('modal-card2-img');
  const img = document.createElement('img')
  imgContainer.innerHTML = `
      <img
      src="${singleData.data.image_link[0]}"
      class="img-fluid h-100 w-100 p-3 rounded-5" alt="...">
  `

  // accuracy
  const accuracyContainer = document.getElementById('accuracy-container');
  const accuray = document.getElementById('accuracy');
  const accurayScore = `${singleData.data.accuracy.score ? singleData.data.accuracy.score : '0'}`;
  const accuracyPercentage = accurayScore * 100;
  if (accuracyPercentage === 0) {
    accuracyContainer.classList.add('d-none')
  } else {
    accuray.innerText = accuracyPercentage;
    accuracyContainer.classList.remove('d-none')
  }

  // input output part
  const inputElement = document.getElementById('input-examples')
  const outputElement = document.getElementById('output-examples')

  inputElement.innerText = `${singleData.data.input_output_examples ? singleData.data.input_output_examples[0].input : ''}`
  outputElement.innerText = `${singleData.data.input_output_examples ? singleData.data.input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}`

}



loadData(6);