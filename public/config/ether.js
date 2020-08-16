const NetworkAddress = "0xa7d29fd305d2b244eec75bb9f35c7d6c2e9dd9c8";
const NetworkABI = [
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_receiver",
        "type": "address"
      }
    ],
    "name": "sendAuthorizationEther",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      }
    ],
    "name": "isValidPatient",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      }
    ],
    "name": "isValidPhysician",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getUserType",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_requester",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_patient",
        "type": "string"
      }
    ],
    "name": "isAuthorized",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_DOB",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_employedSince",
        "type": "uint256"
      }
    ],
    "name": "registerPhysician",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_DOB",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bloodGrp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_height",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_weight",
        "type": "uint256"
      }
    ],
    "name": "registerPatient",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "pId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "patId",
        "type": "string"
      },
      {
        "internalType": "address payable",
        "name": "_pId",
        "type": "address"
      }
    ],
    "name": "authorizePhysician",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "pId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "patId",
        "type": "string"
      }
    ],
    "name": "removeAuthorization",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_address",
        "type": "string"
      }
    ],
    "name": "getPatient",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "id",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "DOB",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "bloodGrp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "height",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "weight",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "currentRecord",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "recordsCount",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "is_valid",
            "type": "bool"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "date_time",
                "type": "uint256"
              },
              {
                "internalType": "address",
                "name": "phyicianRef",
                "type": "address"
              },
              {
                "internalType": "string",
                "name": "description",
                "type": "string"
              },
              {
                "internalType": "bool",
                "name": "is_fault",
                "type": "bool"
              },
              {
                "internalType": "uint256[]",
                "name": "symptoms",
                "type": "uint256[]"
              }
            ],
            "internalType": "struct Network.Record[]",
            "name": "records",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Network.Patient",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_pId",
        "type": "string"
      }
    ],
    "name": "getPhysician",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "id",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "DOB",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "employedSince",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "is_valid",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "totalPatients",
            "type": "uint256"
          },
          {
            "internalType": "address[]",
            "name": "patients",
            "type": "address[]"
          }
        ],
        "internalType": "struct Network.Physician",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_patId",
        "type": "string"
      }
    ],
    "name": "deactivatePatient",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_pId",
        "type": "string"
      }
    ],
    "name": "deactivatePhysician",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_d_t",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_d",
        "type": "string"
      },
      {
        "internalType": "uint256[]",
        "name": "_sym",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "_patId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pId",
        "type": "string"
      }
    ],
    "name": "addRecord",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_d",
        "type": "string"
      },
      {
        "internalType": "uint256[]",
        "name": "_sym",
        "type": "uint256[]"
      },
      {
        "internalType": "string",
        "name": "_patId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pId",
        "type": "string"
      }
    ],
    "name": "updateRecord",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "internalType": "string",
        "name": "_patId",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_pId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "recId",
        "type": "uint256"
      }
    ],
    "name": "setRecordFault",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_patId",
        "type": "string"
      }
    ],
    "name": "getRecordsCount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "internalType": "string",
        "name": "_patId",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "recId",
        "type": "uint256"
      }
    ],
    "name": "getRecord",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "date_time",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "phyicianRef",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "is_fault",
            "type": "bool"
          },
          {
            "internalType": "uint256[]",
            "name": "symptoms",
            "type": "uint256[]"
          }
        ],
        "internalType": "struct Network.Record",
        "name": "",
        "type": "tuple"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTotalPhysicians",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTotalPatients",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTotalFaultRecords",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getTotalRecords",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]