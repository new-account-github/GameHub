   async function submitForm(event) {
        event.preventDefault();


        const walletAddress = document.getElementById('wallet-address').value;
        const nftName = document.getElementById('name-nft').value;
        const nftSymbol = document.getElementById('symbol-nft').value;
        const nftDescription = document.getElementById('description').value;
        const maxSupply = document.getElementById('max-supply').value;
        const royalty = document.getElementById('royalty').value;
        const fileNft = document.getElementById('file-nft').files[0];
        const attributes = [
          { "trait_type": "edification", "value": "100" },
        ];

        const url = 'https://api.shyft.to/sol/v1/nft/create_detach';
        const formData = new FormData();
        formData.append('network','devnet');
        formData.append('wallet', walletAddress);
        formData.append('receiver', walletAddress);
        formData.append('name', nftName);
        formData.append('symbol', nftSymbol);
        formData.append('description', nftDescription);
        formData.append('max_supply', maxSupply);
        formData.append('royalty', royalty);
        formData.append('file', fileNft);
        formData.append('external_url','https://shyft.to')
        formData.append('data','')
        formData.append('service_charge','')
        attributes.forEach((attribute, index) => {
          const traitTypeKey = `attributes[${index}][trait_type]`;
          const valueKey = `attributes[${index}][value]`;

          formData.append(traitTypeKey, attribute.trait_type);
          formData.append(valueKey, attribute.value);
        });


        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
            } else {
                console.error('Error:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }