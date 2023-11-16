
async function tranfer() {
  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "dSnKuP1zRWaJQur7");
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    "network": "devnet",
    "token_address": "DapNSkcjiV2WnQEGtkrNk6tSTW7qPvSbsNsWUKAF3aqM",
    "from_address": "J6sjUjD1zjiTyHikdukcCdJJ8VWkayx1n9k367EdE8oQ",
    "to_address": "2vtr8kmgPFvYgDqhVCx1huhTJnJuvyT4w2ZbzHYYmkLH",
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
    const response = await fetch("https://api.shyft.to/sol/v1/nft/transfer_detach", requestOptions)
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
