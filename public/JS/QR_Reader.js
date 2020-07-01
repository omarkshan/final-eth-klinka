// Read QRCode using Instascan
var scanner = new Instascan.Scanner({
    video: document.getElementById("preview"),
    scanPeriod: 1,
    mirror: false,
  });
  
  function start() {
    scanner.addListener("scan", function (content) {
      var keyHolder = document.getElementById("user_key");
      keyHolder.value = content;
      console.log("Scanned Successfully");
      document.getElementById("closeReader").click();
      //window.location.href=content;
    });
    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
          scanner.start(cameras[0]);
        } else {
          console.log("No cameras found..");
          // alert('No cameras found.');
        }
      })
      .catch(function (e) {
        console.error(e);
        alert(e);
      });
  }
  
  function stop() {
    scanner.stop();
  }
  