// Generating QRCode
var qrcode = new QRCode("qrcode");

function makeCode() {
  var elm = document.getElementById("user_key");

  if (!elm.value) {
    alert("Input a text");
    elm.focus();
    return;
  }

  qrcode.makeCode(elm.value);
}

makeCode();

// Generating PDF
function createPDF() {
    var html_width = $(".saveAsPDF").width();
    var html_height = $(".saveAsPDF").height();
    var top_left_margin = 15;
    var pdf_width = html_width + top_left_margin * 2.5;
    var pdf_height = pdf_width * 2 + top_left_margin * 2.5;
    var canvas_image_width = html_width;
    var canvas_image_height = html_height;
  
    var totalPDFPages = Math.ceil(html_height / pdf_height) - 1;
  
    html2canvas($(".saveAsPDF")[0]).then(function (canvas) {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF("p", "pt", [pdf_width, pdf_height]);
      pdf.addImage(
        imgData,
        "JPG",
        top_left_margin,
        top_left_margin,
        canvas_image_width,
        canvas_image_height
      );
      for (var i = 1; i <= totalPDFPages; i++) {
        pdf.addPage(pdf_width, pdf_height);
        pdf.addImage(
          imgData,
          "JPG",
          top_left_margin,
          -(pdf_height * i) + top_left_margin * 4,
          canvas_image_width,
          canvas_image_height
        );
      }
      pdf.save("Klinka_userkey.pdf");
    });
  }
  