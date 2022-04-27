const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

console.log(id)

fetch (`http://localhost:3000/api/products/${id}`)
    .then(data => {
        return data.json()
    })
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
       
        console.log(item.name)
       
    });

   
      
