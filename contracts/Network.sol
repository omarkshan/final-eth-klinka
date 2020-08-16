// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
// ABIEncoder used for returning Objects of structs
pragma experimental ABIEncoderV2;

// The smart contract defines a list of Patients and Physicians
// Patients have a list of their own EHR
// Physicians have a list of Patients' keys used for manipulating Patients' EHRs
// A Patient must provide authorization for the Physician before being able to
// manipulate the Patient's EHRs..
contract Network {
    // Keeps track of the Total Physicians and Patients on the Network
    uint256 totalPhysicians = 0;
    uint256 totalPatients = 0;

    uint256 totalInvalidPhysicians = 0;
    uint256 totalInvalidPatients = 0;

    uint256 totalRecords = 0;
    uint256 totalFaultRecords = 0;

    struct Record {
        uint256 id;
        uint256 date_time;
        address phyicianRef;
        string description;
        bool is_fault;
        uint256[] symptoms;
        // Setting a record as fault is equivalent to deleting it
        // Records should not be removed compelety and the ledger
        // should contain the faulty and verified Records, only that
        // the faulty Record will be invisible to users..
    }

    // Patient:
    // ID which is the address of the ethereum account
    // CurrentRecord to keep track of the records to be able to add and remove records
    // RecordsCount to show the total number of Records available for a Patient
    // is_valid to check whether the Patient is existing on the network or banned
    // Array of Records Objects from the Record Struct
    struct Patient {
        address id;
        uint256 DOB;
        uint256 bloodGrp;
        uint256 height;
        uint256 weight;
        uint256 currentRecord;
        uint256 recordsCount;
        bool is_valid;
        Record[] records;
    }

    // Physician:
    // ID which is the address of the ethereum account
    // Each Physician has his/her own patient
    // totalPatients to keep track of the patients available
    // is_valid to check whether the Physician is existing on the network or banned
    struct Physician {
        address id;
        uint256 DOB;
        uint256 employedSince;
        bool is_valid;
        uint256 totalPatients;
        address[] patients;
    }

    mapping (address => Patient) patients;
    mapping (address => Physician) physicians;
    // Storing addresses as strings for later reference..
    mapping (string => address) refAddresses;

    uint recordFees = 0.01 ether; // Equivalent to 10000000000000000 wei
    uint authFees = 0.025 ether; // Equivalent to 25000000000000000 wei
    uint updateFees = 0.005 ether; // Equivalent to 5000000000000000 wei
    uint patientRegistrationFees = 0.15 ether; // Equivalent to 150000000000000000 wei
    uint physicianRegistrationFees = 0.25 ether; // Equivalent to 250000000000000000 wei

    function sendAuthorizationEther(address payable _receiver) public {
        _receiver.transfer(0.025 ether);
    }

    // Verifies the Validity/Existance of the Sender on the Network..
    function isValidPatient(string memory _address) public view returns (bool) {
        address _add = refAddresses[_address];
        return patients[_add].is_valid;
    }

    // Verifies the Validity/Existance of the Sender on the Network..
    function isValidPhysician(string memory _address) public view returns (bool) {
        address _add = refAddresses[_address];
        return physicians[_add].is_valid;
    }

    // Checks User Type for providing the correct Dashboard according to the User Type..
    function getUserType() public view returns (uint256) {
        if (patients[msg.sender].is_valid) {
            return 0;
        }
        if (physicians[msg.sender].is_valid) {
            return 1;
        }
        // Invalid or Non-existing Account
        return 2;
    }

    // Checks whether the physician is authorized to manipulate a patient's records..
    function isAuthorized(string memory _requester, string memory _patient) public view returns (bool) {
        address _requester_address = refAddresses[_requester];
        address _patient_address = refAddresses[_patient];

        // If the Requester is a Patient not a Physician..
        require(physicians[_requester_address].is_valid, "Error: You should be a Physician!");
        // If an injected value is discovered instead of the actual sender..
        require(msg.sender == _requester_address, "Error: Invalid Requester ID!");

        if (physicians[_requester_address].is_valid) {
            for (uint256 i = 0; i < physicians[_requester_address].totalPatients; i++) {
                if (physicians[_requester_address].patients[i] == _patient_address) {
                    return true;
                }
            }
            return false;
        }
    }

    // Registering a Physician using his/her wallet address after verifying his practicing lisence..
    function registerPhysician(string memory _address, uint256 _DOB, uint256 _employedSince) public payable {
        require(!patients[msg.sender].is_valid, 'You are already registered as a Patient!');
        require(!physicians[msg.sender].is_valid, 'You are already registered as a Physician!');
        if (msg.value != physicianRegistrationFees) {
            revert('The Record Addition transaction costs 0.25 ethers!');
        }
        physicians[msg.sender].id = msg.sender;
        physicians[msg.sender].DOB = _DOB;
        physicians[msg.sender].employedSince = _employedSince;
        physicians[msg.sender].is_valid = true;
        physicians[msg.sender].totalPatients = 0;
        totalPhysicians++;

        // Add the Physician Address as a String format for later access..
        refAddresses[_address] = msg.sender;
    }

    // Registering a Patient using his/her wallet address
    function registerPatient(string memory _address, uint256 _DOB, uint256 _bloodGrp, uint256 _height, uint256 _weight) public payable {
        require(!patients[msg.sender].is_valid, 'You are already registered as a Patient!');
        require(!physicians[msg.sender].is_valid, 'You are already registered as a Physician!');
        if (msg.value != patientRegistrationFees) {
            revert('The Record Addition transaction costs 0.15 ethers!');
        }
        patients[msg.sender].id = msg.sender;
        patients[msg.sender].DOB = _DOB;
        patients[msg.sender].bloodGrp = _bloodGrp;
        patients[msg.sender].height = _height;
        patients[msg.sender].weight = _weight;
        patients[msg.sender].is_valid = true;
        patients[msg.sender].currentRecord = 0;
        patients[msg.sender].recordsCount = 0;
        totalPatients++;

        // Add the Patient Address as a String format for later access..
        refAddresses[_address] = msg.sender;
    }

    // A patient could authorize the physician to manipulate his/her EHR..
    function authorizePhysician(string memory pId, string memory patId, address payable _pId) public payable {
        address _physician_address = refAddresses[pId];
        address _patient_address = refAddresses[patId];
        require(physicians[_physician_address].is_valid, "Error: You are not a Patient!");
        require(patients[_patient_address].is_valid, "Error: You are not registered!");
        if (msg.value != authFees) {
            revert('The Authorization costs 0.025 ethers!');
        }
        physicians[_physician_address].patients.push(_patient_address);
        physicians[_physician_address].totalPatients++;
        sendAuthorizationEther(_pId);
    }

    // Removing the authorization of the physician when modification happens to a patient's records..
    function removeAuthorization(string memory pId, string memory patId) public {
        address _physician_address = refAddresses[pId];
        address _patient_address = refAddresses[patId];
        require(physicians[_physician_address].is_valid, "Error: You are not a Patient!");
        require(patients[_patient_address].is_valid, "Error: You are not registered!");
        require(isAuthorized(pId, patId), "Error: You are not authorized to do this action!");
        for (uint256 i = 0; i < physicians[_physician_address].totalPatients; i++) {
            if (physicians[_physician_address].patients[i] == _patient_address) {
                delete physicians[_physician_address].patients[i];
                return;
            }
        }
    }

    function getPatient(string memory _address) public view returns (Patient memory) {
        address _patient_address = refAddresses[_address];
        require(patients[_patient_address].is_valid, "Invalid Account");
        return patients[_patient_address];
    }

    function getPhysician(string memory _pId) public view returns (Physician memory) {
        address _physician_address = refAddresses[_pId];
        require(physicians[_physician_address].is_valid, "Invalid Account");
        return physicians[_physician_address];
    }

    // Deactivating a Patient or a Physician is equivelant to Deleting his/her account..
    function deactivatePatient(string memory _patId) public {
        address _patient_address = refAddresses[_patId];
        require(patients[_patient_address].id == msg.sender, "You are not the owner of the account!");
        require(patients[_patient_address].is_valid, "The Account is already invalid!");
        patients[_patient_address].is_valid = false;
        totalInvalidPatients++;
        totalPatients--;
    }
    function deactivatePhysician(string memory _pId) public {
        address _physician_address = refAddresses[_pId];
        require(physicians[_physician_address].id == msg.sender, "You are not the owner of the account!");
        require(physicians[_physician_address].is_valid, "The Account is already invalid!");
        physicians[_physician_address].is_valid = false;
        totalInvalidPhysicians++;
        totalPhysicians--;
    }

    // Adds New Record to the Records Array by referring to the Patient ID and Physician ID for later reference
    function addRecord(uint256 _d_t, string memory _d, uint256[] memory _sym, string memory _patId, string memory _pId) public payable {
        address _patient_address = refAddresses[_patId];
        address _physician_address = refAddresses[_pId];
        require(msg.sender == _physician_address, "Error: Invalid Physician ID!");
        require(patients[_patient_address].is_valid, "Error: Invalid Patient ID!");
        if (msg.value != recordFees) {
            revert('The Record Addition transaction costs 0.01 ethers!');
        }
        if (isAuthorized(_pId, _patId)) {
            uint256 _a = patients[_patient_address].currentRecord;
            Record memory record = Record(_a, _d_t, _physician_address, _d, false, _sym);
            patients[_patient_address].records.push(record);
            patients[_patient_address].currentRecord++;
            patients[_patient_address].recordsCount++;
            totalRecords++;
            removeAuthorization(_pId, _patId);
        }
        else {
            revert("You are not authorized to manipulate this patient's records");
        }
    }

    // Updates Existing Record by referring to the patient ID along with the record position in the records array
    function updateRecord(uint256 _id, string memory _d, uint256[] memory _sym, string memory _patId, string memory _pId) public payable {
        address _patient_address = refAddresses[_patId];
        address _physician_address = refAddresses[_pId];
        require(msg.sender == _physician_address, "Error: Invalid Physician ID!");
        require(patients[_patient_address].is_valid, "Error: Invalid Patient ID!");
        if (msg.value != updateFees) {
            revert('The Update costs 0.005 ethers!');
        }
        if (isAuthorized(_pId, _patId)) {
            patients[_patient_address].records[_id].symptoms = _sym;
            patients[_patient_address].records[_id].description = _d;
            removeAuthorization(_pId, _patId);
        }
    }

    // Setting the record as Fault is equivalent to marking the record as deleted..
    function setRecordFault(string memory _patId, string memory _pId, uint256 recId) public payable {
        address _patient_address = refAddresses[_patId];
        address _physician_address = refAddresses[_pId];
        require(msg.sender == _physician_address, "Error: Invlaid Physician ID!");
        require(patients[_patient_address].is_valid, "Error: Invalid Patient ID!");
        if (msg.value != updateFees) {
            revert('The Update costs 0.005 ethers!');
        }
        require(!patients[_patient_address].records[recId].is_fault, "Error: Record is already Inlvalid!");
        if (isAuthorized(_pId, _patId)) {
            patients[_patient_address].records[recId].is_fault = true;
            patients[_patient_address].recordsCount--;
            totalFaultRecords++;
            removeAuthorization(_pId, _patId);
        }
    }

    // Returns the total Records count of the patient execluding the faulty ones..
    function getRecordsCount(string memory _patId) public view returns (uint256) {
        address _patient_address = refAddresses[_patId];
        return patients[_patient_address].recordsCount;
    }

    // Solidity can not return array of objects or strings, could only return array of bytes
    // Returning in solidity does not consume fees for a single or multiple transactions done unless modification
    // of data stored is made..
    // Retreiving All Records is handled in the middleware
    function getRecord(string memory _patId, uint256 recId) public view returns (Record memory) {
        address _patient_address = refAddresses[_patId];
        return patients[_patient_address].records[recId];
    }

    // Get the current network state..
    function getTotalPhysicians() public view returns (uint256) {
        return totalPhysicians;
    }
    function getTotalPatients() public view returns (uint256) {
        return totalPatients;
    }
    function getTotalFaultRecords() public view returns (uint256) {
        return totalFaultRecords;
    }
    function getTotalRecords() public view returns (uint256) {
        return totalRecords;
    }
}