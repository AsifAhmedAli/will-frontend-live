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
      var randoa = Math.random();
      var randoa1 = Math.random();
      var newinput = input.replace(/'/g, "\\'");
      newinput = newinput.replace(/"/g, "\\'");
      console.log(newinput);
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
      onclick="myFunction('${newinput}', '${randoa}')"
        class="copy"
        data-bs-toggle="tooltip"
        title="Copy query"
        id="${randoa}"
      >
        <span class="material-symbols material-symbols-rounded"
          >content_copy</span
        >
      </button>
    </div>`;
      var newinput1 = as.choices[0].message.content.replace(/'/g, "\\'");
      newinput1 = newinput1.replace(/"/g, "\\'");
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
  onclick="myFunction('${newinput1}', '${randoa1}')"
    class="copy"
    data-bs-toggle="tooltip"
    title="Copy response"
    id = "${randoa1}"
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
      // console.log(as);
      // console.log(as.data)
      var randoa2 = Math.random();
      var randoa3 = Math.random();
      as = JSON.parse(as.data);
      // console.log();
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
      if (as.error) {
        Swal.fire({
          title: "Error!",
          text: as.error.message,
          icon: "error",
        });
      } else {
        var newinput2 = input.replace(/'/g, "\\'");
        newinput2 = newinput2.replace(/"/g, "\\'");
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
        onclick="myFunction('${newinput2}', '${randoa2}')"
          class="copy"
          data-bs-toggle="tooltip"
          title="Copy query"
          id="${randoa2}"
        >
          <span class="material-symbols material-symbols-rounded"
            >content_copy</span
          >
        </button>
      </div>`;
        var newinput3 = as.choices[0].message.content.replace(/'/g, "\\'");
        newinput3 = newinput3.replace(/"/g, "\\'");

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
        onclick="myFunction('${newinput3}', '${randoa3}')"
          class="copy"
          data-bs-toggle="tooltip"
          title="Copy response"
          id="${randoa3}"
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
      }
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
      // console.log(response);
      var newinput4, newinput5;
      var a = document.getElementById("history_chats");
      var anchora = "";
      var asas;
      var randoa4 = Math.random();
      var randoa5 = Math.random();
      if (response.data.length > 0) {
        response.data.forEach((element) => {
          randoa4 = Math.random();
          randoa5 = Math.random();
          asas = JSON.parse(element.response_from_ai);
          // console.log(asas);
          if (asas.error) {
          } else {
            if (element.uploaded_file != null) {
              anchora = `<a href="${element.uploaded_file}" target="_blank">Attachment</a>`;
            } else {
              anchora = "";
            }
            newinput4 = element.prompt.replace(/'/g, "\\'");
            newinput4 = newinput4.replace(/"/g, "\\'");
            newinput5 = asas.choices[0].message.content.replace(/'/g, "\\'");
            newinput5 = newinput5.replace(/"/g, "\\'");
            a.innerHTML += `            
        <div class="chat me">
        <div class="chat-text-box">
          ${element.prompt}
          <br>${anchora}
          <p class="date-time">${element.timestamp}</p>
        </div>
        <button onclick="myFunction('${newinput4}', '${randoa4}')" id="${randoa4}" class="copy" data-bs-toggle="tooltip" title="Copy query" >
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
        onclick="myFunction('${newinput5}', '${randoa5}')" id="${randoa5}"
          class="copy"
          data-bs-toggle="tooltip"
          title="Copy response"
        >
          <span class="material-symbols material-symbols-rounded"
            >content_copy</span
          >
        </button>
      </div>`;
          }
        });
      }
      document.getElementById("loader1").style.visibility = "hidden";
    },
  });
}

function myFunction(input, randoa) {
  // Get the text field
  // Copy the text inside the text field
  navigator.clipboard
    .writeText(input)
    .then(() => {
      // alert("successfully copied");
      document.getElementById(
        randoa
      ).innerHTML = `<span class="material-symbols material-symbols-outlined">
    done
    </span>`;
      const myTimeout = setTimeout(myGreeting, 2000);
    })
    .catch(() => {
      alert("something went wrong");
    });
  function myGreeting() {
    document.getElementById(
      randoa
    ).innerHTML = `    <span class="material-symbols material-symbols-rounded"
    >content_copy</span
  >`;
  }
  // Alert the copied text
  // alert("Copied the text: " + input);
}

var input = document.getElementById("prompt");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  // showChar(event);
  if (event.key === "Enter" && event.shiftKey) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    // if (evt.keyCode == 13 && !evt.shiftKey) {

    input.value += "\r\n";
    // }
  } else if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    // if (evt.keyCode == 13 && !evt.shiftKey) {
    // }
    document.getElementById("submit_button").click();
  }
});
