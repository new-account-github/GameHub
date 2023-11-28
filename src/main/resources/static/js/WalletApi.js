var phantomInstalled = window.isPhantomInstalled;
var walletAddress;
var SOL;
var NFTs;

var saleContainerElement = document.getElementById('sale-container');
var loading;

var cancelButton = document.getElementById('sf-cancel');

//Check phantom installed
if (typeof phantomInstalled == 'undefined') {
    let insPhantom = confirm('Bạn chưa cài đặt tiện ích Phantom trên Google Chrome hoặc chưa đăng nhập tài khoản Phantom, bạn có muốn cài ngay không?');
    if (insPhantom) {
        window.open('https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa', '_blank');
        window.location.href = "/wallet";
    } else {
        window.location.href = "/home";
    }
}

//load page
window.addEventListener('DOMContentLoaded', async () => {
    await connect();
    loading = document.getElementById("loading");
    await getBalances();
    await getNFTs()
    console.log(SOL);
});

//Connect to Phantom
async function connect() {
    try {
        await window.phantom.solana.connect();
        walletAddress = window.phantom.solana.publicKey.toBase58();
    } catch (error) {
        window.location.href = "http://localhost:8080/home";
        console.log(error);
    }
}

//Get balances
async function getBalances() {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    await fetch(`https://api.shyft.to/sol/v1/wallet/balance?network=devnet&wallet=${walletAddress}`, requestOptions)
        .then(response => response.json()) // Sử dụng response.json() để chuyển đổi JSON response thành đối tượng JavaScript
        .then(result => {
            console.log(result);
            SOL = result.result.balance; // Lấy giá trị balance từ result và lưu vào biến SOL
            // Cập nhật giá trị của biến Thymeleaf SOLValue
            var solValueElement = document.querySelector(".num-token");
            if (solValueElement) {
                solValueElement.textContent = SOL;
            }
        })
        .catch(error => console.log('error', error));
}

//Get NFTs of GameHub
async function getNFTs() {

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        accept: 'application/json',
        redirect: 'follow'
    };

    // Hàm fetch được đặt trong hàm setTimeout để chạy sau 1 giây
    setTimeout(() => {
        fetch(`https://api.shyft.to/sol/v1/nft/search?network=devnet&creators=J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ&wallet=${walletAddress}&page=1&size=10`, requestOptions)
            .then(response => response.json())
            .then(result => {
                NFTs = result.result.nfts;
                console.log(result.result)
                var nftsElement = document.querySelector(".list-nft");
                if (NFTs.length == 0) {
                    nftsElement.innerHTML += `<h4 style="margin-top:40px">You don't own any NFTs at GameHub yet</h4>`
                } else {
                    for (let i = 0; i < NFTs.length; i++) {
                        nftsElement.innerHTML += `<div class="item">
                        <img src=${NFTs[i].image_uri} alt="" ondblclick="doubleClickNft(${i})"/>
                        <div class="name-nft">${NFTs[i].name}</div>
                    </div>`
                    }
                }
            })
            .catch(error => console.log('error', error));
    }, 1000); // 1000 miligiây = 1 giây
}
function cancelSale() {
    saleContainerElement.style.display = "none";
}

function doubleClickNft(i) {
    saleContainerElement.style.display = "flex";
    saleContainerElement.innerHTML = `
    <div class="sale-form">
        <div id="sf-id" style="display: none;">${i}</div>
        <i class='bx bx-x sf-cancel' onclick="cancelSale()"></i>
        <img class="sf-img"
            src=${NFTs[i].image_uri} alt="">
        <div class="sf-name-nft">${NFTs[i].name}</div>
        <input type="number" reqired min="0" max="1000000000" class="sf-price" id="sf-price" placeholder="Ask price ?"></input><br>
        <input type="text" class="sf-price" id="sf-privatecode" placeholder="Private Code ?"></input><br>
        <button onclick="listNft()" class="sf-list-btn">List</button>
    </div>
    `;
}
function listNft() {
    var price = document.getElementById('sf-price').value;
    var privateCode = document.getElementById('sf-privatecode').value;
    var id = document.getElementById('sf-id').innerText;
    loading.style.display="block";

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "network": "devnet",
        "marketplace_address": "4Ytpat7HsFsme9FHupLN4YpAL1d7xQViEWyvN5x4H57F",
        "nft_address": NFTs[id].mint,
        "price": parseInt(price, 10),
        "seller_wallet": walletAddress
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.shyft.to/sol/v1/marketplace/list", requestOptions)
        .then(response => response.json())
        .then(result => {
            if(!result.success){
                alert("Incorrectly entered Private Address or this NFT has been listed")
                window.location.href="/wallet"
            }
            console.log(result.success)
            signTransaction(privateCode, result.result.encoded_transaction);
            loading.style.display="none";
            alert("Listed successfully")
        })
        .catch(error => console.log('error', error));
}


/*async function createMarket() {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "network": "devnet",
        "transaction_fee": 5,
        "currency_address": "4TLk2jocJuEysZubcMFCqsEFFu5jVGzTp14kAANDaEFv",
        "fee_payer": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ",
        "fee_recipient": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ",
        "creator_wallet": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.shyft.to/sol/v1/marketplace/create", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}*/
async function signTransaction(privatecode, encode) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "network": "devnet",
        "private_keys": [
            privatecode
        ],
        "encoded_transaction": encode
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    await fetch("https://api.shyft.to/sol/v1/wallet/sign_transaction", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(privatecode)
            console.log(encode)
            console.log(result)
        })
        .catch(error => console.log('error', error));
}

