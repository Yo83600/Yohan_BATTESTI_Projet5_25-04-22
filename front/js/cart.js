// récupération du panier via le localstorage
let basket = JSON.parse(localStorage.getItem("panier"));
console.log(localStorage.getItem("panier"));
console.log(basket);

// récupération de la section ou je vais injecter le code HTML
let cart = document.getElementById("cart__items");

// si le panier est vide
if (basket === null) {
    let emptyBasket = document.createElement("h3");
    emptyBasket.style.textAlign = "center";
    emptyBasket.textContent = `votre panier est vide :(`
    cart.appendChild(emptyBasket)
} else {
    // boucle pour pouvoir afficher les produits ainsi que leurs description
    for (let product in basket) {
        cart.innerHTML += `<article class="cart__item" data-id="${basket[product].id}" data-color="${basket[product].color}" data-quantity="${basket[product].quantity}">
             <div class="cart__item__img">
              <img src="${basket[product].img}" alt=${basket[product].alt}> 
               </div>
             <div class="cart__item__content">
                 <div class="cart__item__content__description">
                <h2>${basket[product].name}</h2>
                     <p>${basket[product].color} </p>
                     <p>${basket[product].price} €</p>
                </div>
                 <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                     <p>Qté : </p> 
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[product].quantity}"> 
                 </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
               </div>
             </div>
         </article>`
    }
    modifQuantity();
    calculatorTotalPrice();
}


//--------------------------------------------------------------
// FONCTION POUR MODIFIER LA QUANTITE DANS LE PANIER
//--------------------------------------------------------------
function modifQuantity () {
  const cartItem = document.querySelectorAll(".cart__item");
  cartItem.forEach((cart) => {
       // On regarde ce qu'il se passe dans le dataset
       console.log("item panier en dataset: " + " " + cart.dataset.id + " " + cart.dataset.color + " " + cart.dataset.quantity)
    cart.addEventListener("change", (eq) => {
      // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
      for (product in basket)
        if (
          basket[product].id === cart.dataset.id &&
          cart.dataset.color === basket[product].color
        ) {
          basket[product].quantity = eq.target.value;
          localStorage.setItem("panier", JSON.stringify(basket))
          console.log(localStorage.panier)
          // on joue la fonction pour actualiser les données
          calculatorTotalPrice();
        }
    });
  });
}

//--------------------------------------------------------------
// AU CLICK ON VIDE UN ARTICLE DU PANIER
//--------------------------------------------------------------
deleteSelection = Array.from(document.querySelectorAll('.deleteItem'));

// supprimer element
for (let i = 0; i < deleteSelection.length; i++) {

    deleteSelection[i].parentElement.addEventListener('click', () => {
            
        basket.splice([i], 1);
        location.reload();
        alert("L'article a été supprimé")
        basket = localStorage.setItem('panier', JSON.stringify(basket));
    });
};
 
//--------------------------------------------------------------
// FONCTION POUR AFFICHER LE TOTAL DES QUANTITES ET DU PRIX TOTALS
//--------------------------------------------------------------
function calculatorTotalPrice() {
    // déclaration variable en tant que nombre
    let totalArticle = 0;
    // déclaration variable en tant que nombre
    let priceCombined = 0;
    // déclaration variable en tant que nombre
    let totalPrice = 0;
    // j'ajoute toutes les quantités d'article du panier et calcule la somme/prix total
    for (let product in basket) {
        totalArticle += JSON.parse(basket[product].quantity);
        priceCombined = JSON.parse(basket[product].quantity) * JSON.parse(basket[product].price);
        totalPrice += priceCombined;
    }
    // je pointe l'endroit d'affichage nombre d'article
    document.getElementById("totalQuantity").textContent = totalArticle;
    // je pointe l'endroit d'affichage du prix total
    document.getElementById("totalPrice").textContent = totalPrice;
}





