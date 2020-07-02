// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract Network {
    mapping(string => Record) records;
    struct Record {
        string _id;
        string _clinic;
        string _physician;
        string _dateTime;
        string _symptom;
        string _severity;
        string _additional_notes;
        bool _isFault;
    }
    // Create a new record.
    function createRecord(string memory _id) internal {records[_id]._id = _id;}
    function setClinic(string memory _id, string memory _clinic) internal {records[_id]._clinic = _clinic;}
    function setPhysician(string memory _id, string memory _physician) internal {records[_id]._physician = _physician;}
    function setDateTime(string memory _id, string memory _dateTime) internal {records[_id]._dateTime = _dateTime;}
    function setSymptom(string memory _id, string memory _symptom) internal {records[_id]._symptom = _symptom;}
    function setSeverity(string memory _id, string memory _severity) internal {records[_id]._severity = _severity;}
    function setAdditionalNotes(string memory _id, string memory _add_notes) internal {records[_id]._additional_notes = _add_notes;}
    function nR(string memory id,string memory c,string memory p,string memory d,string memory s,string memory sev,string memory n) public {
        createRecord(id);
        setClinic(id, c);
        setPhysician(id, p);
        setDateTime(id, d);
        setSymptom(id, s);
        setSeverity(id, sev);
        setAdditionalNotes(id, n);
        records[id]._isFault = false;
    }
    // Get an existing Record
    function getClinic(string memory _id) internal view returns (string memory) {return records[_id]._clinic;}
    function getPhysician(string memory _id) internal view returns (string memory) {return records[_id]._physician;}
    function getDateTime(string memory _id) internal view returns (string memory) {return records[_id]._dateTime;}
    function getSymptom(string memory _id) internal view returns (string memory) {return records[_id]._symptom;}
    function getSeverity(string memory _id) internal view returns (string memory) {return records[_id]._severity;}
    function getAdditionalNotes(string memory _id) internal view returns (string memory) {return records[_id]._additional_notes;}
    function gR(string memory _id) public view returns(string memory,string memory,string memory,string memory,string memory,string memory) {
        string memory clinic = getClinic(_id);
        string memory physician = getPhysician(_id);
        string memory dateTime = getDateTime(_id);
        string memory symptom = getSymptom(_id);
        string memory severity = getSeverity(_id);
        string memory add_notes = getAdditionalNotes(_id);
        return(clinic, physician, dateTime, symptom, severity, add_notes);
    }
    // Setting Record as Fault
    function setAsFault(string memory _id) public {
        records[_id]._isFault = true;
    }
}