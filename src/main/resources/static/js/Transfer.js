const loadingElement = document.getElementById("loading");


function cfLogin() {
  
  var isAuthenticated = localStorage.getItem('isAuthenticated');
  console.log(isAuthenticated)
  if (isAuthenticated==='true') {
    tranfer();

  } else {
    var yn = confirm("Do you want to log in to receive rewards?")
    if (yn == true) {
      window.open("/login", '_blank')
    }
  }
}

async function tranfer() {
  showLoadingBox(3000);
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "network": "devnet",
    "token_address": "DapNSkcjiV2WnQEGtkrNk6tSTW7qPvSbsNsWUKAF3aqM",
    "from_address": "2vtr8kmgPFvYgDqhVCx1huhTJnJuvyT4w2ZbzHYYmkLH",
    "to_address": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ",
    "transfer_authority": true,
    "fee_payer": "2vtr8kmgPFvYgDqhVCx1huhTJnJuvyT4w2ZbzHYYmkLH"
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
        console.log(result.result.encoded_transaction)
        signTransaction(result.result.encoded_transaction)
      })
      .catch(error => console.log('error', error));
  } catch (error) {
    console.error('Lỗi trong quá trình thực hiện yêu cầu:', error);
  }
}

async function signTransaction(encode) {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "network": "devnet",
    "private_keys": [
      "3cTvP6RAEmnFQJVDrrZFwAXoiyNVyofqpPPqi5XHf5bYWwNzmu8gwdUcQ9BtL1Vj9BhkrZnK4LLDvFpw5Tr3ohPF"
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

function showLoadingBox(time) {
  loadingElement.style.display = "block";
  setTimeout(hideLoadingBox, time);
}
function hideLoadingBox() {
  loadingElement.style.display = "none";
}
