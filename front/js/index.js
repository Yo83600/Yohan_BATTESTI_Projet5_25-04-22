// recupération des produits par l'url
fetch("http://localhost:3000/api/products")
    .then(data => {
        return data.json()
    }).then(products => {

        // variable pour recuperer le nom de la section en HTML
        let HTML = document.getElementById("items")

        // création de la card produit 
        products.forEach(product => {

            let card = document.createElement("a");
            card.href = `./product.html?id=${product._id}`

            let cardArticle = document.createElement("article");

            // création de l'element image 
            let cardImg = document.createElement("img");
            cardImg.src = product.imageUrl;
            cardImg.alt = product.altTxt;
            cardArticle.appendChild(cardImg)

            // création du titre
            let cardTitle = document.createElement("h3");
            cardTitle.textContent = `${product.name}`

            cardArticle.appendChild(cardTitle)

            // création de la description
            let cardDescription = document.createElement("p");
            cardDescription.textContent = `${product.description}`

            // ajout des éléments avec appenchild
            cardArticle.appendChild(cardDescription)

            card.appendChild(cardArticle)

            HTML.appendChild(card)
        });
    })