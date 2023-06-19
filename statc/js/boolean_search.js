$("#chat_form").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var id = getCookie("id");
  //   console.log(id);
  var input = document.getElementById("prompt").value;
  //   console.log(input);
  //   var doc = document.getElementById("attach_file").value;
  var form = new FormData();
  form.append("id", id);
  form.append("input", input);
  //   console.log(input);
  //   console.log(id);
  //   var data = JSON.stringify({

  //   });
  document.getElementById("loader1").style.visibility = "visible";
  //no attachment
  if (attach_file.files.length == 0) {
    var settings = {
      url: `${baseurl}/simple-open-ai-call`,
      method: "POST",
      data: { id: id, input: input },
    };

    $.ajax(settings).done(function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      console.log(response);
    });
  }
  ////with attachment
  if (attach_file.files.length == 1) {
    form.append("docs", attach_file.files[0]);
    var settings = {
      url: `${baseurl}/upload-documents-with-open-ai-call`,
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };

    $.ajax(settings).done(function (response) {
      document.getElementById("loader1").style.visibility = "hidden";
      console.log(response);
    });
  }
});
