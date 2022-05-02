// récupératiion du panier via le localstorage
let baskets = JSON.parse(localStorage.getItem("panier"));
console.log(localStorage.getItem("panier"));
console.log(baskets);

// si le panier est vide
if(baskets === null){
    let emptyBasket = document.createElement("h3");
    emptyBasket.textContent = `votre panier est vide`
    cart.appendChild(emptyBasket)
} else {
  // récupération de la section ou je vais injecter le code HTML
  let cart = document.getElementById("cart__items");
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
                     <p>${baskets[product].price} €</p>
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
         console.log(baskets[product].imageUrl)
  }
} 


