const API = 'https://swapi.co/api/';
let back = document.querySelector('.back-button');
let next = document.querySelector('.next-button');
let page =1;

async function getPlanets(page) {
   let config = {
       params : {
           'page' : page
       }
       
   };
   let planets = await axios.get(API+'planets/', config);
   return planets.data.results;
}
function renderPlanets(planets) {
    let planetsAll = document.querySelector('.planets-all');
    planetsAll.innerHTML = '';
    planets.forEach(element => {
        let planetsDiv = document.createElement('div');
        planetsDiv.append(element.name);
        planetsAll.append(planetsDiv);
    });
}
next.addEventListener('click',function () {
    if (page <=6) {
        page ++;
        getPlanets(page).then(renderPlanets)
    }
})
back.addEventListener('click', function () {
    if (page >=1)
    page --;
    getPlanets(page).then(renderPlanets)
})
getPlanets().then(renderPlanets)

let filmsInfo = document.querySelector('.films-info');
let films = document.querySelector('.films');
let peopleAll = document.querySelector(".people");
filmsInfo.addEventListener('click',function (){
    let getPeople = new Promise(async function(resolve){
        peopleAll.innerHTML='';
        const peoples = await axios.get(`${API}films/${films.value}/`);
        films.value='';
        resolve(peoples.data.characters);
    });
    getPeople.then(people=>{
        people.forEach(async element=>{
            const info = await axios.get(element);
            let peopleInfo = document.createElement('div');
            peopleInfo.innerHTML=`
            <p>
                name: ${info.data.name} <br>
                birth: ${info.data.birth_year}<br>
                male: ${info.data.gender}
            </p>`;
            peopleAll.append(peopleInfo);
        });
    })
});
