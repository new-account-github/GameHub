var fullWalletAddress;
var walletAddress;

var addressElement  = document.getElementById('address');

window.addEventListener('DOMContentLoaded', async () => {
    await connect();
});

async function connect() {
    try {
        await window.phantom.solana.connect();
        fullWalletAddress = window.phantom.solana.publicKey.toBase58();
        walletAddress=fullWalletAddress.substring(0, 5);
        walletAddress+="......"
        var numC =  fullWalletAddress.length;
        walletAddress += fullWalletAddress.slice(numC-5);
        addressElement.innerText=walletAddress;
    } catch (error) {
        window.location.href = "http://localhost:8080/home";
        console.log(error);
    }
}