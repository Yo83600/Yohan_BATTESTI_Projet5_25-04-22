// récupératiion du panier via le localstorage
let baskets = JSON.parse(localStorage.getItem("panier"));
console.log(localStorage.getItem("panier"));
console.log(baskets);

// récupération de la section ou je vais injecter le code HTML
let cart = document.getElementById("cart__items");

// si le panier est vide
if(baskets === null){
    let emptyBasket = document.createElement("h3");
    emptyBasket.style.textAlign = "center";
    emptyBasket.textContent = `votre panier est vide :(`
    cart.appendChild(emptyBasket)
} else {
  // boucle pour pouvoir afficher les produits ainsi que leurs description
  for (let product in baskets){
    cart.innerHTML += `<article class="cart__item" data-id="${baskets[product].id}" data-color="${baskets[product].color}">
             <div class="cart__item__img">
              <img src="${baskets[product].img}" alt=${baskets[product].alt}> 
               </div>
             <div class="cart__item__content">
                 <div class="cart__item__content__description">
                <h2>${baskets[product].name}</h2>
                     <p>${baskets[product].color} </p>
                     <p>${baskets[product].price * baskets[product].quantity} €</p>
                </div>
                 <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                     <p>Qté : </p> 
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${baskets[product].quantity}"> 
                 </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
               </div>
             </div>
         </article>`
  }
}
//--------------------------------------------------------------
// AU CLICK ON VIDE LE PANIER
//--------------------------------------------------------------

deleteSelection = Array.from(document.querySelectorAll('.deleteItem'));

  // supprimer element
    for (let i = 0; i < deleteSelection.length; i++) {

      deleteSelection[i].parentElement.addEventListener('click', () => {
                
        let tab = [];
        tab = baskets;
        tab.splice([i], 1);
        location.reload();
        alert("L'article a été supprimé")
                
        baskets = localStorage.setItem('panier', JSON.stringify(tab));

      });
    };
 

//--------------------------------------------------------------
// FONCTION POUR AFFICHER LE TOTAL DES QUANTITES ET DU PRIX TOTALS
//--------------------------------------------------------------

// déclaration variable en tant que nombre
let totalArticle = 0;
// déclaration variable en tant que nombre
let priceCombined = 0;
// déclaration variable en tant que nombre
let totalPrice = 0;
// j'ajoute toutes les quantités d'article du panier et calcule la somme/prix total
for (let product in baskets) {
  totalArticle += baskets[product].quantity;
  priceCombined = baskets[product].quantity * baskets[product].price;
  totalPrice += priceCombined;
}
// je pointe l'endroit d'affichage nombre d'article
document.getElementById("totalQuantity").textContent = totalArticle;
// je pointe l'endroit d'affichage du prix total
document.getElementById("totalPrice").textContent = totalPrice;




  
