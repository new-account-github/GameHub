var nft;
var wallet;

const loadingElement = document.getElementById("loading");

window.addEventListener('DOMContentLoaded', async () => {
  await connect();
});

//Connect to Phantom
async function connect() {
  try {
    await window.phantom.solana.connect();
    wallet = window.phantom.solana.publicKey.toBase58();
  } catch (error) {
    window.location.href = "http://localhost:8080/home";
  }
}

async function cfLogin() {
  var isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log(isAuthenticated)
  if (isAuthenticated === 'true') {
    var loginPhantom=confirm("Make sure you have logged in to the correct account to receive rewards on Phantom. Continue to receive rewards?")
    if(loginPhantom){
      await randomNftAjax();
      tranfer(nft, wallet);
    }
  } else {
    var yn = confirm("Do you want to log in to receive rewards?")
    if (yn == true) {
      window.open("/login", '_blank')
    }
  }
}

async function tranfer(nft, wallet) {
  showLoadingBox();
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "network": "devnet",
    "token_address": nft,
    "from_address": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ",
    "to_address": wallet,
    "transfer_authority": true,
    "fee_payer": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ"
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  try {
    await fetch("https://api.shyft.to/sol/v1/nft/transfer_detach", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        signTransaction(result.result.encoded_transaction)
        hideLoadingBox()
        var gotoWallet = confirm("The reward has been received, do you want to go to your wallet to check the reward? ")
        if (gotoWallet) {
          window.location.href="/wallet";
        } else {
          rewardButton.style.display("none");
        }
      })
      .catch(error => console.log('error', error));
  } catch (error) {
    console.error('Lỗi trong quá trình thực hiện yêu cầu:', error);
  }
}

async function randomNftAjax() {
  await $.ajax({
    type: "GET",
    url: "/randomnft", // Thay thế bằng đường dẫn của controller của bạn
    success: function (data) {
      nft = getCookie("adresstoken");
    },
    error: function (error) {
      console.log("Lỗi khi gọi controller: " + error);
    }
  });
}

// Định nghĩa hàm getCookie
function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var cookieArray = decodedCookie.split(';');

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

async function signTransaction(encode) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "network": "devnet",
    "private_keys": [
      "4FD6moh65ACxDv8cjLz8LVUSaX5ywij8av8iw2nr4RD22zm3y38isg6f62gRDKKLsfbTUc9i3QQuJiLMx1soGTwC"
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
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function showLoadingBox() {
  loadingElement.style.display = "block";
}
function hideLoadingBox() {
  loadingElement.style.display = "none";
}
