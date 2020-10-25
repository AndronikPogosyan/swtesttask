let peopleList = [] ;
let elementList = [];
let urlStart = 'http://swapi.dev/api/people/?page=1' ;
let urlNext;
let urlBack;
let promiseOuter;
let next = document.querySelector('.next');
let back = document.querySelector('.back');

let moveNext = () =>{
    for(let i=0; i<10; i++){
        if(document.querySelector('.people')){
            document.querySelector('.people').remove();
        }
    };
    urlNext = promiseOuter['next'];
    getStarWarHeroes(urlNext);
    urlBack = promiseOuter['previous'];
}
let moveBack = () =>{
    for(let i=0; i<10; i++){
        if(document.querySelector('.people')){
            document.querySelector('.people').remove();
        }
    };
    urlBack = promiseOuter['previous'];
    getStarWarHeroes(urlBack);
}


// Функция запроса 
async function getStarWarHeroes(url){
    let response = await fetch(url);
    let promise = await response.json();
    let copyPromise = promise['results'];
    peopleList = copyPromise;
    let contain = document.querySelector('.container');
    promiseOuter = promise;
    urlNext = promise['next'];
    urlBack = promiseOuter['previous']? promiseOuter['previous']: urlBack;
    for(let i=0; i<peopleList.length; i++){
        let el = document.createElement('div');
        let h2 = document.createElement('h2');
        let p = document.createElement('p');
        //let img = document.createElement('img');
        //img.className = 'character';
        el.className = 'people';
        el.style.background = `url(images/${peopleList[i].name.split(' ').join('')}.jpg) round`;
        h2.className = 'heroName';
        p.className = 'heroDescription';
        //el.append(img);
        el.append(h2);
        el.append(p);
        //img.src = `images/${peopleList[i].name.split(' ').join('')}.jpg`;
        //img.alt = peopleList[i].name.split(' ').join('');
        h2.innerText = 'Имя :' + peopleList[i].name;
        p.innerText = `Дата Рождения: ${peopleList[i]['birth_year']}/n Пол: ${peopleList[i]['gender']}`;
        contain.append(el);
        elementList.push(el.innerText);
        console.log(promiseOuter);
    }
    
    if(promiseOuter['next'] === 'http://swapi.dev/api/people/?page=2'){
        back.disabled = true;
    } else{
        back.disabled = false;
    }
    if(promiseOuter['previous'] === 'http://swapi.dev/api/people/?page=8'){
        next.disabled = true;
    } else{
        next.disabled = false;
    }
}

let funcStarting = () => {
    document.querySelector('.wrapper').style.background = `url(images/spacebackg2.jpg) repeat`
    document.querySelector('.startShowing').hidden = true;
    document.querySelector('.navButtons').hidden = false;
    next.addEventListener('click', moveNext);
    back.addEventListener('click', moveBack);    
    getStarWarHeroes(urlStart);
}


// next.addEventListener('click', moveNext)
// back.addEventListener('click', moveBack)


document.querySelector('.startShowing').addEventListener('click', funcStarting)

console.log(peopleList)
console.log(elementList)
