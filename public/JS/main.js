// Generating QRCode
var qrcode = new QRCode("qrcode");

function makeCode1() {
  var elm = document.getElementById("user_key");

  if (!elm.value) {
    alert("Input a text");
    elm.focus();
    return;
  }

  qrcode.makeCode(elm.value);
}

makeCode1();

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

var qrcode2 = new QRCode("qrcode2");
function makeCode2() {
  var elm2 = document.getElementById("PID");

  if (!elm2.value) {
    alert("Input a text");
    elm2.focus();
    return;
  }

  qrcode2.makeCode(elm2.value);
}

makeCode2();

// Generating PDF
function createPDF2() {
  var html_width2 = $(".saveAsPDF2").width();
  var html_height2 = $(".saveAsPDF2").height();
  var top_left_margin2 = 15;
  var pdf_width2 = html_width2 + top_left_margin2 * 2.5;
  var pdf_height2 = pdf_width2 * 2 + top_left_margin2 * 2.5;
  var canvas_image_width2 = html_width2;
  var canvas_image_height2 = html_height2;

  var totalPDFPages2 = Math.ceil(html_height2 / pdf_height2) - 1;

  html2canvas($(".saveAsPDF2")[0]).then(function (canvas) {
    var imgData2 = canvas.toDataURL("image/jpeg", 1.0);
    var pdf2 = new jsPDF("p", "pt", [pdf_width2, pdf_height2]);
    pdf2.addImage(
      imgData2,
      "JPG",
      top_left_margin2,
      top_left_margin2,
      canvas_image_width2,
      canvas_image_height2
    );
    for (var i = 1; i <= totalPDFPages2; i++) {
      pdf2.addPage(pdf_width2, pdf_height2);
      pdf2.addImage(
        imgData2,
        "JPG",
        top_left_margin2,
        -(pdf_height2 * i) + top_left_margin2 * 4,
        canvas_image_width2,
        canvas_image_height2
      );
    }
    pdf2.save("Klinka_PID.pdf");
  });
}

