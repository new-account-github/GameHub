async function submitForm(event) {
  event.preventDefault();

  const walletAddress = document.getElementById("wallet-address").value;
  const nftName = document.getElementById("name-nft").value;
  const nftSymbol = document.getElementById("symbol-nft").value;
  const nftDescription = document.getElementById("description").value;
  const maxSupply = document.getElementById("max-supply").value;
  const royalty = document.getElementById("royalty").value;
  const fileNft = document.getElementById("file-nft").files[0];
  const fileName = fileNft.name;

  const selectElement = document.getElementById("nft-ranks");
  const ranks = selectElement.value;

  var myHeaders = new Headers();
  myHeaders.append("x-api-key", "0Bt3GbCL2ul_fOVH");


  var formdata = new FormData();
  formdata.append("network", "devnet");
  formdata.append(
    "creator_wallet",walletAddress
    
  );
  formdata.append("name", nftName);
  formdata.append("symbol", nftSymbol);
  formdata.append("description", nftDescription);
  formdata.append(
    "attributes",
    '[{"trait_type":"NFT","value":"Single NFT"}]'
  );
  formdata.append("external_url", "https://shyft.to");
  formdata.append("max_supply", maxSupply);
  formdata.append("royalty", royalty);
  formdata.append("image", fileNft, fileName);
  formdata.append("fee_payer", walletAddress);

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch("https://api.shyft.to/sol/v2/nft/create", requestOptions);
    const result = await response.json();
    
    if (response.ok) {
      const resultContainer = document.getElementById("result-container");


      await fetch("/nft/create",{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nftName,
          token: result.result.mint,
          encoded_transaction: result.result.encoded_transaction,
          ranks: ranks,
      }),
      });

         await signTransaction(result.result.encoded_transaction);

      resultContainer.innerHTML = `
        <p>Success: ${result.message}</p>
        <p>Token Address: ${result.result.mint}</p>
      `;
    } else {
      console.error("Error:", result.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

async function signTransaction(encode) {
    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "0Bt3GbCL2ul_fOVH");
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

    try {
        const response = await fetch("https://api.shyft.to/sol/v1/wallet/sign_transaction", requestOptions);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
}



async function deleteNFT() {

    const walletAddress = document.getElementById("address").value;
    const tokenAddress = document.getElementById("token-address").value;

    console.log(walletAddress);
    console.log(tokenAddress);

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "0Bt3GbCL2ul_fOVH");
    myHeaders.append("Content-Type", "application/json");

   var raw = JSON.stringify({
        "network": "devnet",
        "wallet": walletAddress,
        "token_address": tokenAddress
    });

    var requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch("https://api.shyft.to/sol/v1/nft/burn_detach", requestOptions);
        const result = await response.json();

        if(response.ok){
              await fetch("/nft/delete/" + tokenAddress ,{
                    method : 'DELETE',
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                       token: tokenAddress,
                    }),
                  });
          await signTransaction(result.result.encoded_transaction);
          alert("Success");
        }

        console.log(result);
    } catch (error) {
        console.log('error', error);
    }
}

function getTokenAddress(tokenAddress){
      document.getElementById("token-address").value = tokenAddress;
}