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
    const response =await fetch("https://api.shyft.to/sol/v1/nft/transfer_detach", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  
    if (!response.ok) {
      console.error('Lỗi từ máy chủ:', response.status);
    } else {
      const data = await response.json();
      console.log('Dữ liệu trả về:', data);
    }
  } catch (error) {
    console.error('Lỗi trong quá trình thực hiện yêu cầu:', error);
  }
  
  
  
  
  
    
}
