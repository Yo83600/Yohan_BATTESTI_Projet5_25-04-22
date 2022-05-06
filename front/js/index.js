// recupération des produits par l'url
fetch("http://localhost:3000/api/products")
    .then(data => {
        return data.json()
    }).then(products => {

        // variable pour recuperer le nom de la section en HTML
        let HTML = document.getElementById("items")

        //let myHTML = ""

        // création de la card produit 
        products.forEach(product => {

            let card = document.createElement("a");
            card.href = `./product.html?id=${product._id}`

            let cardArticle = document.createElement("article");

            let cardImg = document.createElement("img");
            cardImg.src = product.imageUrl;
            cardImg.alt = product.altTxt;
            cardArticle.appendChild(cardImg)

            let cardTitle = document.createElement("h3");
            cardTitle.textContent = `${product.name}`

            cardArticle.appendChild(cardTitle)

            let cardDescription = document.createElement("p");
            cardDescription.textContent = `${product.description}`

            cardArticle.appendChild(cardDescription)

            card.appendChild(cardArticle)

            HTML.appendChild(card)


            //  myHTML += `<a href="./product.html?id=${product._id}">
            //   <article>
            //     <img src="${product.imageUrl}" alt="${product.name}">
            //     <h3 class="productName">${product.name}</h3>
            //     <p class="productDescription">${product.price} €</p>
            //   </article>
            // </a>`
        });

        //HTML.innerHTML = myHTML
    })