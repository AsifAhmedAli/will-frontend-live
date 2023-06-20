$("#chat_form").submit(function (event) {
  // Prevent default form submission
  event.preventDefault();
  var id = getCookie("id");
  //   var delayInMilliseconds = 3000; //1 second
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
      //   console.log(response.data);
      var as = JSON.parse(response.data);
      //   console.log(as.choices[0].message.content);
      //   setTimeout(function () {
      var today = new Date();
      var date =
        today.getDate() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getFullYear();

      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date + " " + time;
      //   console.log(response);
      document.getElementById(
        "chats_container"
      ).innerHTML += `<div class="chat me">
      <div class="chat-text-box">
        <p class="chat-response">
          ${input}
        </p>
        <p class="date-time">${dateTime}</p>
      </div>
      <button
        class="copy"
        data-bs-toggle="tooltip"
        title="Copy query"
      >
        <span class="material-symbols material-symbols-rounded"
          >content_copy</span
        >
      </button>
    </div>`;
      document.getElementById("chats_container").innerHTML += `
<div class="chat">
  <img
    src="./assets/images/pure_talent_logo.svg"
    class="ai-image"
    alt=""
  />
  <div class="chat-text-box">
    <p class="chat-response">
    ${as.choices[0].message.content}
    </p>
    <p class="date-time">${dateTime}</p>
  </div>
  <button
    class="copy"
    data-bs-toggle="tooltip"
    title="Copy response"
  >
    <span class="material-symbols material-symbols-rounded"
      >content_copy</span
    >
  </button>
</div>`;
      document.getElementById("prompt").value = "";
      document.getElementById("attach_file").value = ``;
      //   window.scrollTo(0, document.body.scrollHeight);

      document.getElementById("loader1").style.visibility = "hidden";
      //   }, delayInMilliseconds);

      //   alert(response.data);
      //   console.log(response);
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
      var as = JSON.parse(response);
      var file = as.file;
      //   console.log(as.file);
      as = JSON.parse(as.data);
      //   console.log(as);
      //   var as1 = JSON.parse(as);
      //   console.log(as1);
      //   console.log(as.choices[0].message.content);
      //   setTimeout(function () {
      // var x = JSON.parse(response);
      //   console.log(x.data.content);
      var today = new Date();
      var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      var time = today.getHours() + ":" + today.getMinutes();
      var dateTime = date + " " + time;

      document.getElementById(
        "chats_container"
      ).innerHTML += `<div class="chat me">
        <div class="chat-text-box">
          <p class="chat-response">
            ${input} <br><a href="${file}" target="_blank">Attachment</a>
          </p>
          <p class="date-time">${dateTime}</p>
        </div>
        <button
          class="copy"
          data-bs-toggle="tooltip"
          title="Copy query"
        >
          <span class="material-symbols material-symbols-rounded"
            >content_copy</span
          >
        </button>
      </div>`;
      document.getElementById("chats_container").innerHTML += `
      <div class="chat">
        <img
          src="./assets/images/pure_talent_logo.svg"
          class="ai-image"
          alt=""
        />
        <div class="chat-text-box">
          <p class="chat-response">
          ${as.choices[0].message.content}
          </p>
          <p class="date-time">${dateTime}</p>
        </div>
        <button
          class="copy"
          data-bs-toggle="tooltip"
          title="Copy response"
        >
          <span class="material-symbols material-symbols-rounded"
            >content_copy</span
          >
        </button>
      </div>`;
      //   prompt;
      document.getElementById("prompt").value = "";
      document.getElementById("attach_file").value = ``;
      //   window.scrollTo(0, document.body.scrollHeight);
      document.getElementById("loader1").style.visibility = "hidden";
      //   }, delayInMilliseconds);
    });
  }
});

function clearchat() {
  document.getElementById("chats_container").innerHTML = ``;
}

function getchathistory(x) {
  var id = getCookie("id");
  document.getElementById("loader1").style.visibility = "visible";
  $.ajax({
    type: "post",
    url: `${baseurl}/prompt-history/${id}`,
    data: {
      offset: x,
    },
    success: function (response) {
      console.log(response);
      var a = document.getElementById("history_chats");
      var anchora = "";
      var asas;
      response.data.forEach((element) => {
        asas = JSON.parse(element.response_from_ai);
        if (element.uploaded_file != null) {
          anchora = `<a href="${element.uploaded_file}" target="_blank">Attachment</a>`;
        } else {
          anchora = "";
        }
        a.innerHTML += `            
        <div class="chat me">
        <div class="chat-text-box">
          ${element.prompt}
          <br>${anchora}
          <p class="date-time">${element.timestamp}</p>
        </div>
        <button class="copy" data-bs-toggle="tooltip" title="Copy query">
          <span class="material-symbols material-symbols-rounded"
            >content_copy</span
          >
        </button>
      </div>
      <div class="chat">
        <img src="./assets/images/pure_talent_logo.svg" class="ai-image" alt="" />
        <div class="chat-text-box">
        ${asas.choices[0].message.content}
          <p class="date-time">${element.timestamp}</p>
        </div>
        <button
          class="copy"
          data-bs-toggle="tooltip"
          title="Copy response"
        >
          <span class="material-symbols material-symbols-rounded"
            >content_copy</span
          >
        </button>
      </div>`;
      });
      document.getElementById("loader1").style.visibility = "hidden";
    },
  });
}
