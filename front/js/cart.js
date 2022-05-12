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

// function callBack(nom){
//         console.log(nom + "Je suis le callback")
//     }

// function testCallBack(nom , callBack){
//     console.log(nom)
//     function callBack(nom){
//        return nom;
//     }
// }

// testCallBack("Thomas", () => {
//     console.log("Je suis le callBak Exterieur")
// })

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

    let prenom = document.querySelector("#firstName");
    prenom.classList.add("regexTxt");
    let nom = document.querySelector("#lastName");
    nom.classList.add("regexTxt");
    let ville = document.querySelector("#city");
    ville.classList.add("regexTxt");

    let txtLetters = document.querySelectorAll(".regexTxt");

    //---------------------------------------
    // Regex pour les champs prénom,nom,ville
    //---------------------------------------
    let regexText = /^[a-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,31}$/i;

    txtLetters.forEach((txtLetter) =>
        txtLetter.addEventListener('input', () => {
            if (firstName.value == "") {
                document.getElementById("firstNameErrorMsg").textContent = "le champs prénom est requis";
                document.getElementById("lastNameErrorMsg").textContent = "le champs nom est requis";
                document.getElementById("cityErrorMsg").textContent = "le champs ville est requis";
            } else if (regexText.test(txtLetter.value) == false) {
                document.getElementById("firstNameErrorMsg").textContent = "le champs prénom doit contenir un prénom valide";
                document.getElementById("lastNameErrorMsg").textContent = "le champs nom doit contenir un nom valide";
                document.getElementById("cityErrorMsg").textContent = "le champs ville doit contenir un ville valide";
            } else {
                document.getElementById("firstNameErrorMsg").textContent = "le champs prénom est bon";
                document.getElementById("lastNameErrorMsg").textContent = "le champs nom est bon";
                document.getElementById("cityErrorMsg").textContent = "le champs ville est bon";
            }
        })
    )

    //---------------------------------------
    // Regex pour le champs Adresse
    //---------------------------------------
    let addressRegex = /^[a-z0-9áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ\s-]{1,60}$/i;

    testInput(loginForm.address, "addressErrorMsg", "address" , addressRegex )
    // ajout de l'evenement sur le input de l'email
    loginForm.address.addEventListener('input', () => {

        // si le champs email ne contient rien
        if (loginForm.address.value == "") {
            document.getElementById("addressErrorMsg").textContent = "le champs adresse est requis";
            document.getElementById("address").style.backgroundColor = "red";
            //e.preventDefault()
        }
        // si le le champs email n'est pas valide 
        else if (addressRegex.test(loginForm.address.value) == false) {
            document.getElementById("addressErrorMsg").textContent = "le champs adresse doit contenir une adresse valide";
            document.getElementById("address").style.backgroundColor = "red";
            //e.preventDefault()
        }
        // si le champs email est valide
        else {
            document.getElementById("addressErrorMsg").textContent = "le champs adresse est bon";
            document.getElementById("address").style.backgroundColor = "green";
        }
    })

    //---------------------------------------
    // Regex pour le champs email
    //---------------------------------------
    let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    // ajout de l'evenement sur le input de l'email
    loginForm.email.addEventListener('input', () => {

        // si le champs email ne contient rien
        if (loginForm.email.value == "") {
            document.getElementById("emailErrorMsg").textContent = "le champs email est requis";
            document.getElementById("email").style.backgroundColor = "red";
            //e.preventDefault()
        }
        // si le le champs email n'est pas valide 
        else if (emailRegex.test(loginForm.email.value) == false) {
            document.getElementById("emailErrorMsg").textContent = "le champs email doit contenir une adresse email valide";
            document.getElementById("email").style.backgroundColor = "red";
            //e.preventDefault()
        }
        // si le champs email est valide
        else {
            document.getElementById("emailErrorMsg").textContent = "le champs email est bon";
            document.getElementById("email").style.backgroundColor = "green";
        }
    })

    function testInput(formInput , errorId, inputId, regex , message = `le champs est requis`){
        if (formInput.value == "") {
            document.getElementById(errorId).textContent = message;
            document.getElementById(inputId).style.backgroundColor = "red";
            //e.preventDefault()
            console.log('ok test')
        }
    }

    testInput(loginForm.email, "emailErrorMsg", "email" , emailRegex , "Je t'aime pas ahaha" )
    // testInput(loginForm.email, emailRegex)

    function testEmail(){
        // si le champs email ne contient rien
        if (loginForm.email.value == "") {
        //     document.getElementById("emailErrorMsg").textContent = "le champs email est requis";
        //     document.getElementById("email").style.backgroundColor = "red";
        //     //e.preventDefault()
            return false;
        }
        // si le le champs email n'est pas valide 
        else if (emailRegex.test(loginForm.email.value) == false) {
            document.getElementById("emailErrorMsg").textContent = "le champs email doit contenir une adresse email valide";
            document.getElementById("email").style.backgroundColor = "red";
            //e.preventDefault()
            return false;
        }
        // si le champs email est valide
        else {
            document.getElementById("emailErrorMsg").textContent = "le champs email est bon";
            document.getElementById("email").style.backgroundColor = "green";
            return true;
        }
    }

    //---------------------------------------
    // Envoi des données avec la methode POST
    //---------------------------------------

    let submitOrder = document.getElementById("order")
    submitOrder.addEventListener("click", () => {

        loginForm.addEventListener("submit", (e) => {e.preventDefault()})

        if(testEmail()){
            console.log('Email vérifie')
        }
        
        //Construction d'un array d'id depuis le local storage
        let products = [];
        basket.forEach(item => {
            products.push(item.id)
        })
        console.log(products)

        fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify({
                contact : {
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
    })


