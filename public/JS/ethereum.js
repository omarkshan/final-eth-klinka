var enable_network = true;
var test_functionalities = true;

// {value: web3.toWei(2, 'ether')}

const web3 = new Web3(window.ethereum)
window.ethereum.enable().catch(error => {
  // User denied account access
  console.log(error)
})

console.log('Connected to Ropsten Testnet!');
console.log(web3);
web3.eth.getAccounts().then(console.log);
const _ACCOUNT_ADDRESS = web3.eth.defaultAccount = web3.eth.accounts[0];
const network = new web3.eth.Contract(NetworkABI, NetworkAddress, {
    from: _ACCOUNT_ADDRESS
});
console.log(`Default Account : ${web3.eth.defaultAccount}`);
console.log(`Network Address : ${NetworkAddress}`);

// Smart Contract Functionalities Integeration
function registerPhyisician() {
  var _address = document.getElementById('address').value;
  var _dob = document.getElementById('dob').value;
  var converted_dob = Math.floor(_dob / 1000);
  var _employed_since = document.getElementById('employed_since').value;
  var converted_Emp_Since = Math.floor(_employed_since / 1000);
  var networkContract = new web3.eth.Contract(NetworkABI, NetworkAddress, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.registerPhysician(_address, converted_dob, converted_Emp_Since, { value: web3.toWei(0.25, "ether")}).send();
}

function registerPatient(_address, _dob, _bloodGrp, _height, _weight) {
  var _address = document.getElementById('address').value;
  var _dob = document.getElementById('dob').value;
  var converted_dob = Math.floor(_dob / 1000);
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.registerPatient(_address, converted_dob,_bloodGrp, _height, _weight, { value: web3.toWei(0.15, "ether") }).send();
}

async function isValidPatient(_address) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.isValidPatient(_address).call();
  return `${JSON.stringify(result)}`;
}

async function isValidPhysician(_address) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.isValidPhysician(_address).call();
  return `${JSON.stringify(result)}`;
}

async function isAuthorized(_requester, _patient) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.isAuthorized(_requester, _patient).call();
  return `${JSON.stringify(result)}`;
}

async function getUserType() {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getUserType().call();
  return `${JSON.stringify(result)}`;
}

async function getTotalRecords() {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getTotalRecords().call();
  return `${JSON.stringify(result)}`;
}

async function getTotalFaultRecords() {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getTotalFaultRecords().call();
  return `${JSON.stringify(result)}`;
}

async function getTotalPatients() {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getTotalPatients().call();
  return `${JSON.stringify(result)}`;
}

async function getTotalPhysicians() {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getTotalPhysicians().call();
  return `${JSON.stringify(result)}`;
}

async function getRecord(_patId, recId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getRecord().call();
  return `${JSON.stringify(result)}`;
}

async function getRecordsCount(_patId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getRecordsCount().call();
  return `${JSON.stringify(result)}`;
}

function setRecordFault(_patId, _pId, recId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.setRecordFault(_patId, pId, recId, {value: web3.toWei(0.005, "ether")}).send();
}

function updateRecord(_id, _d, _sym, _patId, _pId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.updateRecord(_id, _d, _sym, _patId, _pId, {value: web3.toWei(0.005, "ether")}).send();
}

function addRecord(_d_t, _d, _sym, _patId, _pId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.addRecord(_d_t, _d, _sym, _patId, _pId, {value: web3.toWei(0.005, "ether")}).send();
}

function deactivatePhysician(_pId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.deactivatePhysician( _patId).send();
}

function deactivatePatient(_patId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.deactivatePatient(_patId).send();
}

async function getPhysician(_address) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getPhysician(_address).call();
  return `${JSON.stringify(result)}`;
}

async function getPatient(_address) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  let result = await networkContract.methods.getPatient(_address).call();
  return `${JSON.stringify(result)}`;
}

function removeAuthorization(pId, patId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.removeAuthorization(pId, patId).send();
}

function authorizePhysician(pId, patId, _pId) {
  var networkContract = new web3.eth.Contract(_ABI, _NETWORK_ADDRESS, {
    from: _ACCOUNT_ADDRESS,
  });
  networkContract.methods.authorizePhysician(pId, patId, _pId, {value: web3.toWei(0.025, "ether")}).send();
}