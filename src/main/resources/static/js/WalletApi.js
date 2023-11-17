var phantomInstalled = window.isPhantomInstalled;
var walletAddress;
var SOL;
var NFTs;

//Check phantom installed
if (typeof phantomInstalled == 'undefined') {
    let insPhantom = confirm('Bạn chưa cài đặt tiện ích Phantom trên Google Chrome hoặc chưa đăng nhập tài khoản Phantom, bạn có muốn cài ngay không?');
    if (insPhantom) {
        window.open('https://chrome.google.com/webstore/detail/phantom/bfnaelmomeimhlpmgjnjophhpkkoljpa', '_blank');
        window.location.href = "/wallet";
    }else{
        window.location.href = "/home";
    }
}

//load page
window.addEventListener('DOMContentLoaded', async () => {
    await connect();
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
                console.log(NFTs )
                var nftsElement = document.querySelector(".list-nft");
                if(NFTs.length == 0){
					nftsElement.innerHTML +=`<h4 style="margin-top:40px">You don't own any NFTs at GameHub yet</h4>`
				}else{
					for (let i = 0;i < NFTs.length; i++) {
                    nftsElement.innerHTML +=`<div class="item">
                        <img src=${NFTs[i].image_uri} alt=""/>
                        <div class="name-nft">${NFTs[i].name}</div>
                    </div>`
                }
				}
            })
            .catch(error => console.log('error', error));
    }, 1000); // 1000 miligiây = 1 giây
}

