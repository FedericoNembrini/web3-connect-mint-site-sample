const contract_abi = '';
const contract_address = '';

const connectWallet = async function () {
	const connectButton = document.getElementById("connectButton");
	const mintButton = document.getElementById("mintButton");

	connectButton.disabled = true;

	try {
		if (window.ethereum) {
			const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

			window.web3 = new Web3(window.ethereum);

			connectButton.hidden = true;
			mintButton.hidden = false;
		}
	}
	catch (ex) {
		console.log(ex);
	}

	connectButton.disabled = false;
};

const mintNft = async function () {
	if (!contract_abi)
		alert("Contract ABI is empty");

	if (!contract_address)
		alert("Contract Address is empty");

	if (!window.ethereum.selectedAddress)
		alert("Ethereum Selected Address is empty");

	const mintButton = document.getElementById("mintButton");
	mintButton.disabled = true;

	const mintNumber = 1;
	var mintPrice = 10000000000000000; // Price in gwei
	try {
		const contract = new window.web3.eth.Contract(JSON.parse(contract_abi), contract_address);

		// Get actual price from contract "SellPrice" method
		if (contract.methods.SellPrice)
			mintPrice = await contract.methods.SellPrice().call();

		contract.methods.mint(mintNumber).send({ from: window.ethereum.selectedAddress, value: mintPrice * mintNumber })
			.then(function (receipt) {
				console.log(receipt)
			}
			).catch(function (error) {
				console.log(error);
			});
	}
	catch (ex) {
		console.log(ex);
	}

	mintButton.disabled = false;
};

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("mintButton").onclick = mintNft;