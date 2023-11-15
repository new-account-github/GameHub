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

  console.log(walletAddress);
  console.log(nftName);
  console.log(nftSymbol);
  console.log(nftDescription);
  console.log(maxSupply);
  console.log(royalty);
  console.log(fileNft);

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
    '[{"trait_type":"dev power","value":"over 900"}]'
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

  fetch("https://api.shyft.to/sol/v2/nft/create", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}
