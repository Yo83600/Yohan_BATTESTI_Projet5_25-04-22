// récuperation de l'id
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id)

// recuperation des articles par l'api
fetch(`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json()
    })

    // récuperation des information des articles
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

        // au clic on ajoute dans le panier

        let btnPanier = document.getElementById("addToCart");
        let itemQuantity = document.getElementById("quantity");

        btnPanier.addEventListener("click", () => {
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

                let arrayProductsInCart = JSON.parse(localStorage.getItem("panier"));

                if (arrayProductsInCart !== null){

                    let alreadyInCart = arrayProductsInCart.find((item => item.id === myProduit.id && item.color === myProduit.color))
                    // console.log(alreadyInCart)
                    if (alreadyInCart) {
                        console.log("J'ai trouvé mon produit " + myProduit.id)
                         // alreadyInCart.quantity = 15; Modifier la quantité avec la quantité nouvelle
                        alreadyInCart.quantity += myProduit.quantity
                        alert("L'article " + myProduit.name + " existe déja dans le panier , sa quantité a été modifié")
                    }
                    else{
                        arrayProductsInCart.push(myProduit);
                        alert("L'article a été ajouté au panier")
                    }
                    localStorage.setItem("panier", JSON.stringify(arrayProductsInCart))

                    console.log(arrayProductsInCart)
                } 
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
    