var enable_network = true;
var test_functionalities = true;

const web3 = new Web3(window.ethereum)
window.ethereum.enable().catch(error => {
  // User denied account access
  console.log(error)
})

console.log('Connected to Ropsten Testnet!');
console.log(web3);
web3.eth.getAccounts().then(console.log);
web3.eth.defaultAccount = web3.eth.accounts[0];
const network = new web3.eth.Contract(NetworkABI, NetworkAddress, {
    from: web3.eth.defaultAccount
});
console.log(`Default Account : ${web3.eth.defaultAccount}`);
console.log(`Network Address : ${NetworkAddress}`);

function registerPhyisician() {
  var _address = document.getElementById('address').value;
  var _dob = document.getElementById('dob').value;
  var _employed_since = document.getElementById('employed_since').value;
  var converted_dob = Math.floor(_dob / 1000);
  var converted_Emp_Since = Math.floor(_employed_since / 1000);
  var networkContract = new web3.eth.Contract(NetworkABI, NetworkAddress, {
    from: web3.eth.defaultAccount,
  });
  networkContract.methods.registerPhysician(_address, converted_dob, converted_Emp_Since, {from: _address,to: _NETWORK_ADDRESS, value: web3.utils.toWei(0.25, "ether")}).send();
}

function registerPatient(_address, _dob, _bloodGrp, _height, _weight) {
  
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.registerPatient(_address, _dob,_bloodGrp, _height, _weight).send();
  web3.eth.sendTransaction({from: _address,to: _NETWORK_ADDRESS, value: web3.utils.toWei(0.15, "ether")});
}

function createRecord(_date_time, _description, _physician_address, _symptoms) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.addRecord(_date_time, _description, _physician_address, _symptoms).send();
}

async function readRecord(_id) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.gR(_id).call();
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