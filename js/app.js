const loadData = () => {
  toggleSpinner(true)
  const url = "https://openapi.programming-hero.com/api/ai/tools"
  fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data.tools))
}

const displayData = (data) => {
  const cardContainer = document.getElementById('card-container')

  // display 6 data
  const seeMore = document.getElementById('see-more');

  if (data.length > 6) {
    data = data.slice(0, 6);
    seeMore.classList.remove("d-none")
    document.getElementById('see-more-btn').addEventListener('click', function () {

      seeMore.classList.add("d-none")
    })

  } else {
    seeMore.classList.add("d-none")
  }

  // display all data
  data.forEach(singleElement => {
    featureList(singleElement.features)

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
                <button class="btn bg-danger-subtle
                " data-bs-toggle="modal" data-bs-target="#aiModal"><img src="images/arrow-right.svg" alt=""></button>
                
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


const featureList = (featureList) => {

  const featuresContainer = document.getElementById('features-list');

 
  // console.log(list)
  // featuresContainer.innerHTML = list;
  // console.log(ol)
}


loadData()