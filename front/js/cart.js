// récupération du panier via le localstorage
let basket = JSON.parse(localStorage.getItem("panier"));
console.log(localStorage.getItem("panier"));
console.log(basket);

// récupération de la section ou je vais injecter le code HTML
let cart = document.getElementById("cart__items");

// si le panier est vide
if (basket === null || basket && basket.length == 0) {
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
    deleteItem();
}


//--------------------------------------------------------------
// FONCTION POUR MODIFIER LA QUANTITE DANS LE PANIER
//--------------------------------------------------------------
function modifQuantity() {
    const cartItem = document.querySelectorAll(".cart__item");
    cartItem.forEach((cart) => {
        // On regarde ce qu'il se passe dans le dataset
        console.log("item panier en dataset: " + " " + cart.dataset.id + " " + cart.dataset.color + " " + cart.dataset.quantity)
        cart.addEventListener("change", (e) => {
            // boucle pour modifier la quantité du produit du panier grace à la nouvelle valeur
            for (product in basket)
                if (
                    basket[product].id === cart.dataset.id &&
                    cart.dataset.color === basket[product].color
                ) {
                    basket[product].quantity = e.target.value;
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
function deleteItem() {
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
}

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

//--------------------------------------------------------------
// FONCTION POUR VALIDER LES DONNEES DU FORMULAIRE
//--------------------------------------------------------------

// récuperation de la balise HTML ou il y a le formulaire
let loginForm = document.querySelector(".cart__order__form");
//---------------------------------------
// Regex pour les champs prénom,nom,ville
//---------------------------------------
let regexText = new RegExp(/^[a-záàâäãå'çéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i);
//---------------------------------------
// Regex pour le champs Adresse
//---------------------------------------
let addressRegex = new RegExp(/^[a-z0-9'áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i);
//---------------------------------------
// Regex pour le champs email
//---------------------------------------
let emailRegex = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
//---------------------------------------
// Fonction pour tester les champs input grâce au regex definis
//---------------------------------------
function testInput(formInput, errorId, inputId, regex) {
    if (formInput.value == "") {
        document.getElementById(errorId).textContent = "le champs est requis";
        document.getElementById(inputId).style.backgroundColor = "red";
        return false;
    } else if (regex.test(formInput.value)) {
        document.getElementById(errorId).textContent = "le champs est valide";
        document.getElementById(inputId).style.backgroundColor = "green";
        return true;
    } else {
        document.getElementById(errorId).textContent = "le champs contient des caractères incorrects ou n'est pas conforme";
        document.getElementById(inputId).style.backgroundColor = "red";
        return false;
    }
}

// testInput firstName
loginForm.firstName.addEventListener('input', () => {
    testInput(loginForm.firstName, "firstNameErrorMsg", "firstName", regexText)
});

// testInput lastName
loginForm.lastName.addEventListener('input', () => {
    testInput(loginForm.lastName, "lastNameErrorMsg", "lastName", regexText)
});

// testInput address
loginForm.address.addEventListener('input', () => {
    testInput(loginForm.address, "addressErrorMsg", "address", addressRegex)
});

// testInput city
loginForm.city.addEventListener('input', () => {
    testInput(loginForm.city, "cityErrorMsg", "city", regexText)
});

// testInput email
loginForm.email.addEventListener('input', () => {
    testInput(loginForm.email, "emailErrorMsg", "email", emailRegex)
});

//---------------------------------------
// Envoi des données avec la methode POST
//---------------------------------------
//let testCity = regexText.test(loginForm.city.value)
let submitOrder = document.getElementById("order")

submitOrder.addEventListener("click", (e) => {
    e.preventDefault();
    // si le panier est vide
    if (basket === null || basket && basket.length == 0) {
        alert("Votre panier est vide")
    } else {
        // sinon condition pour verifier si les champs sont correctement respectés
        if (testInput(loginForm.firstName, "firstNameErrorMsg", "firstName", regexText) &&
            testInput(loginForm.lastName, "lastNameErrorMsg", "lastName", regexText) &&
            testInput(loginForm.address, "addressErrorMsg", "address", addressRegex) &&
            testInput(loginForm.city, "cityErrorMsg", "city", regexText) &&
            testInput(loginForm.email, "emailErrorMsg", "email", emailRegex)) {

            //Construction d'un array d'id depuis le local storage
            let products = [];
            basket.forEach(item => {
                products.push(item.id)
            })
            console.log(products)

            // methode fetch (post) pour l'envoie des données à poster
            fetch("http://localhost:3000/api/products/order", {
                    method: "POST",
                    body: JSON.stringify({
                        contact: {
                            firstName: document.querySelector("#firstName").value,
                            lastName: document.querySelector("#lastName").value,
                            address: document.querySelector("#address").value,
                            city: document.querySelector("#city").value,
                            email: document.querySelector("#email").value
                        },
                        products
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }).then((res) => res.json())
                .then(data => {
                    // envoyé à la page confirmation, autre écriture de la valeur "./confirmation.html?commande=${data.orderId}"
                    document.location.href = `/front/html/confirmation.html?commande=${data.orderId}`;
                })
        } else {
            alert("Un champs est incorrect ou n'est pas rempli reformulez le")
        }
    }
})