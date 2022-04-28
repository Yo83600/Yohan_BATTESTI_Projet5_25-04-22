// récuperation de l'id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id)

// recuperation des articles par l'api
fetch (`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json()
    })

    // récuperation des information des articles
    .then(item =>{
   
        let itemImg = document.querySelector(".item__img");
        itemImg.innerHTML += `
        <img src="${item.imageUrl}" alt="${item.altTxt}">
        `;

        let itemName = document.getElementById("title");
        itemName.innerHTML += `
           ${item.name}
        `;

        let itemPrice = document.getElementById("price");
            itemPrice.innerHTML += `
         ${item.price} 
        `;

        let itemDescription = document.getElementById("description");
            itemDescription.innerHTML += `
        ${item.description}
        `;

        let itemColor = document.getElementById("colors");
        item.colors.forEach((color) => {
                 itemColor.innerHTML += `
         <option> ${color} </option>
        `;
        });
         
        //console.log(item)
       
    // au clic on ajoute dans le panier

    let btnPanier = document.getElementById("addToCart")
    btnPanier.addEventListener("click" , ()=> {
        console.log("ok")
    },false);

    // si j'ai un panier (localstorage) je récupere les info du panier pour ajouter des nouveaux produits

    cardProduits = JSON.parse(localStorage.getItem('panier'));

    // creation de tableau dans local storage

    // let myProduit = cardProduits;
    myProduit = {
        id : item._id,
        name : item.name,
        imageUrl : item.imageUrl,
        description : item.description,
        price : item.price
    };

    // trnasformation du tableau en JSON
    myProduit = JSON.stringify(myProduit);

    // mettre les information qu'on a besoin
    localStorage.setItem('panier',myProduit)

    // fin du click
    console.log(localStorage.getItem('panier'))

 });
      
