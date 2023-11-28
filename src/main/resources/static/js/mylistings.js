var listings;
var fullWalletAddress;


window.addEventListener('DOMContentLoaded', async () => {
    var activeNav = document.getElementById('mylisting');
    activeNav.classList.add("active");
    await connect();
    getMyListings();
});

async function connect() {
    try {
        await window.phantom.solana.connect();
        fullWalletAddress = window.phantom.solana.publicKey.toBase58();
    } catch (error) {
        window.location.href = "http://localhost:8080/home";
        console.log(error);
    }
}

function getMyListings() {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(`https://api.shyft.to/sol/v2/marketplace/active_listings?network=devnet&marketplace_address=4Ytpat7HsFsme9FHupLN4YpAL1d7xQViEWyvN5x4H57F&seller_address=${fullWalletAddress}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            listings = result.result.data;
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
                        </div>
                    </div>`
                }
            }
        })
        .catch(error => console.log('error', error));
}

