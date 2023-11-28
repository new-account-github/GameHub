var listings;


window.addEventListener('DOMContentLoaded', async () => {
    var activeNav = document.getElementById('marketplace');
    activeNav.classList.add("active");
    getActiveListings();
});


function getActiveListings() {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
    var raw = "";
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(`https://api.shyft.to/sol/v1/marketplace/active_listings?network=devnet&marketplace_address=4Ytpat7HsFsme9FHupLN4YpAL1d7xQViEWyvN5x4H57F`, requestOptions)
        .then(response => response.json())
        .then(result => {
            listings = result.result;
            console.log(result.result);
            var nftsElement = document.getElementById("NFT-container");
            if (listings.length == 0) {
                nftsElement.innerHTML += `<h4 style="margin-top:40px">We don't have any NFTs being sold on GameHub</h4>`
            } else {
                for (let i = 0; i < listings.length; i++) {
                    nftsElement.innerHTML += 
                    `<div class="NFT-article">
                        <img src="${listings[i].nft.image_uri}" alt="" class="NFT-img" />
                        <div class="NFT-data">
                            <span class="NFT-price">Price : ${listings[i].price} SOL</span>
                            <h2 class="NFT-title">${listings[i].nft.name}</h2>
                            <a href="#" class="NFT-btn">Buy</a>
                        </div>
                    </div>`
                }
            }
        })
        .catch(error => console.log('error', error));
}

