const loadData = () => {
  spinnerSection(true)
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    fetch(url)
        .then(res => res.json())
        .then(data => singleData(data.data.tools))
}

const singleData = (singleData) => {
    const cardContainer = document.getElementById('card-container')
    singleData.slice(0,6).forEach(singleElement => {
        console.log(singleElement.features)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img class="img-fluid p-3 rounded-5"
              src="${singleElement.image}" class="card-img-top"
              alt="...">
            <div class="card-body">
              <h5 class="card-title cardTitle">Features</h5>
              <p class="card-text cardText">
                <ol id="features-list">
                <li>${singleElement.features[0]}</li>
                <li>${singleElement.features[1]}</li>
                <li>${singleElement.features[2]}</li>
                <li>${singleElement.features[3] ? singleElement.features[3] : `<pre>`}</li>
                </ol>
              </p>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h4 class="aiName">${singleElement.name}</h4>
                  <p class="aiDate"> <img class="dateIcon" src="images/calendar3.svg" alt=""> <span>${singleElement.published_in}</span></p>
               
                 </div>
                <div>
                <button class="btn bg-danger-subtle
                "><img src="images/arrow-right.svg" alt=""></button>
               
                </div>
               
              </div>
            </div>
          </div>
          
        `
        cardContainer.appendChild(div)
        spinnerSection(false)
        
    })
}

const spinnerSection = isLoading => {
  const spinner = document.getElementById('spinner');

  if(isLoading){
    spinner.classList.remove("d-none")
  }
  else{
    spinner.classList.add("d-none")
  }
}

const featureList =  (featureList) =>{
    // console.log(featureList[1])
    // const featuresContainer = document.getElementById('test');
    // featureList.forEach(singleFeatureList =>{
    //     console.log(singleFeatureList)
    //     const ol = document.createElement('ol')
    //     ol.innerHTML=  `
    //     <li>s</li>
    //     `
    //     document.featuresContainer.innerHTML = ol;
    // })
}

loadData()