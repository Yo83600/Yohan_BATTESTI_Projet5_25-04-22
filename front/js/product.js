// récuperation de l'id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id)

// recuperation des articles par l'api
fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json()
    })

    // récuperation des information des articles et on les ajoutes dans le code HTML
    .then(item => {

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

        //--------------------------------------------------------------
        // AU CLICK ON AJOUTE DANS LE PANIER
        //--------------------------------------------------------------

        let btnBasket = document.getElementById("addToCart");
        let itemQuantity = document.getElementById("quantity");

        btnBasket.addEventListener("click", () => {
            if (itemQuantity.value <= 0 ||
                itemQuantity.value > 100 ||
                itemQuantity.value === undefined ||
                itemColor.value === "" ||
                itemColor.value === undefined) {
                alert("Pour valider le choix de cet article, veuillez renseigner une couleur et une quantité valide entre 1 et 100");
            } 
            else 
            {
                // ------ Création du produit qui sera ajouté au panier
                let myProduit = {
                    id: item._id,
                    name: item.name,
                    img: item.imageUrl,
                    price : item.price,
                    alt: item.altTxt,
                    color: itemColor.value,
                    quantity: parseFloat(document.getElementById("quantity").value),
                };

                // récuperation du panier dans le localstorage
                let arrayProductsInCart = JSON.parse(localStorage.getItem("panier"));

                // si le panier n'est pas vide
                if (arrayProductsInCart !== null){

                    // variable qui permet de verifier si l'id et la couleur des articles sont les même 
                    let alreadyInCart = arrayProductsInCart.find((item => item.id === myProduit.id && item.color === myProduit.color))

                    if (alreadyInCart) {
                        // si la condition est remplie on additionne la quantité en +
                        alreadyInCart.quantity += myProduit.quantity
                        alert("L'article " + myProduit.name + " existe déja dans le panier , sa quantité a été modifié")
                    }
                    else{
                        // sinon on push le nouveau article
                        arrayProductsInCart.push(myProduit);
                        alert("L'article a été ajouté au panier")
                    }   

                    // on ajoute notre nouveau panier dans le local storage
                    localStorage.setItem("panier", JSON.stringify(arrayProductsInCart))
                } 

                // si le panier est vide on créer un nouveau tableau ou l'on mettra nos articles dedans
                else {
                    arrayProductsInCart = [];
                    arrayProductsInCart.push(myProduit);
                    localStorage.setItem("panier", JSON.stringify(arrayProductsInCart))
                    alert("L'article a été ajouté au panier")

                    console.log(arrayProductsInCart)
                }
            }
        });
    });
    