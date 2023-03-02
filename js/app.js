const loadData = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    fetch(url)
        .then(res => res.json())
        .then(data => singleData(data.data.tools))
}

const singleData = (singleData) => {
    const cardContainer = document.getElementById('card-container')
    singleData.forEach(singleElement => {
        console.log(singleElement)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img class="img-fluid p-3 rounded-5"
              src="https://randomwordgenerator.com/img/picture-generator/chameleon-540655_640.jpg" class="card-img-top"
              alt="...">
            <div class="card-body">
              <h5 class="card-title cardTitle">Card title</h5>
              <p class="card-text cardText">
                <ol>
                  <li>Lorem ipsum dolor sit amet.</li>
                  <li>Aliquid magni deserunt laudantium animi!</li>
                  <li>Facere deleniti excepturi ipsum at?</li>
                  <li>Laboriosam molestias qui commodi quam?</li>
                </ol>
              </p>
              <hr>
              <h4 class="aiName">ChatGPT</h4>
              <p class="aiDate"> <img class="dateIcon" src="images/calendar3.svg" alt=""> <span>11/01/2022</span></p>
            </div>
          </div>
        `
        cardContainer.appendChild(div)
        
    })
}

loadData()