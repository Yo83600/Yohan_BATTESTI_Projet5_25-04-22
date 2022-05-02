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
   
            
    // au clic on ajoute dans le panier

    let btnPanier = document.getElementById("addToCart");
    let itemQuantity = document.getElementById("quantity");

    btnPanier.addEventListener("click" , ()=> {
        if (itemQuantity.value > 0 && itemQuantity.value < 100) {
            // ------ Création du produit qui sera ajouté au panier
            let myProduit = {
                id : item._id,
                name : item.name,
                img : item.imageUrl,
                alt : item.altTxt,
                color : itemColor.value,
                quantity: parseFloat(document.getElementById("quantity").value),
                price : item.price
            };

            let arrayProductsInCart = JSON.parse(localStorage.getItem("panier"));

            if(localStorage.getItem("panier") !== null){
                arrayProductsInCart.push(myProduit);
                localStorage.setItem("panier", JSON.stringify(arrayProductsInCart))

                console.log(arrayProductsInCart)
            }

            else {
                arrayProductsInCart = [];
                arrayProductsInCart.push(myProduit);
                localStorage.setItem("panier", JSON.stringify(arrayProductsInCart))

                console.log(arrayProductsInCart)
            }

            // // ----------------- Gestion du localStorage
            // let arrayProductsInCart = [];
            
            // // si j'ai un panier (localstorage) je récupere les info du panier pour ajouter des nouveaux produits

            // if (localStorage.getItem("panier") !== null) {
            // arrayProductsInCart = JSON.parse(localStorage.getItem("panier"));
            // } 

            // console.log(localStorage.getItem('panier'))

            // // creation de tableau dans local storage

            // // trnasformation du tableau en JSON
            // myProduit = JSON.stringify(myProduit);

            // // si vide , on créer avec le produit ajouté
            // arrayProductsInCart.push(myProduit);

            // // mettre les information qu'on a besoin
            // localStorage.setItem("panier",JSON.stringify(arrayProductsInCart));

            // // fin du click
          
            // console.log(localStorage.setItem('panier',arrayProductsInCart))
            
        }
    });
 });


      
