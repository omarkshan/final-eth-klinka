// Using Mocha Truffle Test to Test Interactions with the Smart Contract..
const Network = artifacts.require("Network");
// Addresses from the Ganache local development testing environment..
const _address = '0x2F00040B3021DF55fDA03C7E9f46E694Bf0760db';
const _address_physician = '0xF548E46256EAA7Bb9a789b61A32A39a9A139b6e7';

contract("Network", () => {
  it('Should Deploy Smart Contract', async () => {
      const network = await Network.deployed();
      console.log(network.address);
      assert(network.address !== '');
  });

  it('Should Register a Patient', async () => {
      const network = await Network.deployed();
      await network.registerPatient(_address,
      920066400,
      2,
      173,
      77);
      console.log(await network.getPatient(_address));
      assert(network.getPatient(_address) !== '');
  });

  it("Should NOT Re-register the Patient", async () => {
    const network = await Network.deployed();
    try {
        await network.registerPatient(
          _address,
          920066400,
          2,
          173,
          77
        );
    } catch (e) {
        assert(e.message.includes('You are already registered'));
        return;
    }
    assert(false);
  });

  it("Should NOT Re-register the Patient with the same address as a Physician", async () => {
    const network = await Network.deployed();
    console.log(await network.getPatient(_address));
    try {
        await network.registerPhysician(
          _address,
          920066400,
          1582754400
        );
    } catch (e) {
        assert(e.message.includes('You are already registered'));
        return;
    }
    assert(false);
  });

  it("Should Deactivate the Patient account", async () => {
    const network = await Network.deployed();
    console.log(await network.getPatient(_address));
    await network.deactivatePatient(
        _address
    );
    console.log('Patient Deactivated!');
    assert(network.isValid(_address), false);
  });


  // ____________________________
  // Physician Functionalities Tests />>
  // __________________________________________
  // ____________________________________________________
  
//   it('Should Register a Physician', async () => {
//       const network = await Network.deployed();
//       await network.registerPhysician(_address_physician,
//         920066400,
//         1582754400);
//       console.log(await network.getPhysician(_address_physician));
//       assert(network.getPhysician(_address_physician) !== '');
//   });

//   it("Should NOT Re-register the Physician", async () => {
//     const network = await Network.deployed();
//     try {
//         await network.registerPhysician(
//           _address_physician,
//           920066400,
//           1582754400,
//         );
//     } catch (e) {
//         assert(e.message.includes('You are already registered'));
//         return;
//     }
//     assert(false);
//   });

//   it("Should NOT Re-register the Physician with the same address as a Patient", async () => {
//     const network = await Network.deployed();
//     console.log(await network.getPhysician(_address_physician));
//     try {
//         await network.registerPatient(
//           _address_physician,
//           920066400,
//           2,
//           173,
//           77
//         );
//     } catch (e) {
//         assert(e.message.includes('You are already registered'));
//         return;
//     }
//     assert(false);
//   });



});
