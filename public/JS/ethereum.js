var enable_network = true;
var test_functionalities = true;

var web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:7545")
);
console.log("Connected to Ethereum network");

console.log(web3);

web3.eth.getAccounts().then(console.log);

web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(`Default Account : ${web3.eth.defaultAccount}`);
console.log(`Account Address : ${_ACCOUNT_ADDRESS}`);
console.log(`Network Address : ${_NETWORK_ADDRESS}`);

// const _id = "xxafx-xxxxx87xxx-x5xx-xxxxx56xxxjk";

function createRecord(_id, _record) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.createRecord(_id).send();
}

async function readRecord(_id, _pid) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getClinic(_id).call();
  return `${JSON.stringify(result)}`
}

function updateRecord(_id, _record) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.createRecord(_id).send();
}

function deleteRecord(_id, _record) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.deleteRecord(_id).send();
}