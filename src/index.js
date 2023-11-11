let addToy = false;


let dbURL = 'http://localhost:3000/toys';
document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  fetch(dbURL)
  .then(res => res.json())
  .then(data => {
    //console.log(data)
    handleToys(data)
  }) 
  .catch(error => console.log(error));

  let toyForm = document.querySelector('form');
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(dbURL, {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": e.target.name.value,
        "image": e.target.image.value,
        "likes": 0
    })
    })
    .then(res => res.json())
    .then(data => console.log(data));
    let toyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    buildToy(toyObj);
    toyForm.reset();
  })
});

function handleToys(toyData){
  console.log(toyData)
  for(let i = 0; i < toyData.length; i++){
    let newToy = buildToy(toyData[i]);
  }
}

function buildToy(toy){
  let toyCollection = document.getElementById('toy-collection');
  let newToy = document.createElement('div');
  newToy.id = 'card';

  let h2 = document.createElement('h2')
  h2.innerText = toy.name;
  newToy.appendChild(h2);

  let img = document.createElement('img');
  img.src = toy.image;
  img.class = 'toy-avatar';
  newToy.appendChild(img);

  let p = document.createElement('p');
  p.textContent = toy.likes;
  newToy.appendChild(p);

  let btn = document.createElement('button');
  btn.textContent = 'Like ♥';
  btn.class = 'like-btn';
  btn.id = toy.id;
  newToy.appendChild(btn);

  btn.addEventListener('click', () => {
    toy.likes++;
    p.textContent = toy.likes;

    fetch(dbURL + `/${toy.id}`, {
      method: 'PATCH',
      headers: 
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(toy)
    })
    .then(res => res.json())
    .then(data => {} )
  })

  toyCollection.appendChild(newToy);
}