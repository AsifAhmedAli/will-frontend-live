var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("interview_question_select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
document.addEventListener("click", closeAllSelect);


//dropdown
// $(".service_input_desc_header_menu_icon").click(function () {
//   $(".drop_down_conatiner").toggle("slow");
//   $('.text_editor_container').css('position', '');
// });


//ckeditor
// CKEDITOR.replace( 'editor', {
//   filebrowserBrowseUrl: '/browser/browse.php?type=Files',
//   filebrowserUploadUrl: '/uploader/upload.php?type=Files'
// });




// CKEDITOR.replace('editor', { 
//   toolbar: [ 
//       { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] }, 


//       { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', 'align' ] },
//       { name: 'JustifyLeft', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },



//       { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] }, 
//       { name: 'insert', items: [ 'Image'] }, 
//       '/',  



//   ], 
//   removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor,Strike,Subscript,Superscript' 
// }); 


// CKEDITOR.replace('editor', {}); 

//editor
// var quill = new Quill('#editor-container', {
//   modules: {
//     toolbar: [
//       ['bold', 'italic', 'underline'],
//       ['image'],
//       [{ 'align': [] }],
//       [{ 'list': 'ordered' }, { 'list': 'bullet' }],
//       ['link'],
//       ['clean']

//     ],
//     'text-align': true,
//     'link-tooltip': true,
//     'link': true,

//   },
//   placeholder: 'Compose an epic...',
//   theme: 'snow'
// });
// oke = document.querySelector(".editor-container").addEventListener("change", function () {
//   document.querySelector(".inter_font").innerHTML = oke
// })




var quill = new Quill('#editor-container', {
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline'],
      ['image'],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link'],
      ['clean'],
      ['file']
    ],
  },
  placeholder: '',
  theme: 'snow'
});

quill.on('text-change', function () {
  var text = quill.getText();
  var wordCount = text.split(/\s+/).length - 1;
  var charCount = text.length;
  $('.word-count').text('Words ' + wordCount);
  $('.char-count').text('Characters ' + charCount);
});