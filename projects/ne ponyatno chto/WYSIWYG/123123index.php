<?php
  header('Content-type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="ru">
  <head>
    <title>TextBook - Redactor</title>
    <meta charset="UTF-8">
    <meta name="keywords" content="учебник, редактор, текст, интерактивный, конструктор">
    <meta name="description" content="Конструктор интерактивных учебников">
    <link rel="shortcut icon" href="..//image/Terminal.ico">
    <link  id="link-style"rel="stylesheet" type="text/css" href="..//style/style.css">
  
    <!-- https://www.tiny.cloud/get-tiny/ -->
    <!-- <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script> -->
    <!-- <script src="https://cdn.tiny.cloud/1/2f5rt1lejjibchrt25bkp2s0s9c6cpe3cvbm2phrnolvzo7r/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script> -->
    <script src="tinymce/tinymce.min.js"></script>
    </script>

    <script>
      window.addEventListener('DOMContentLoaded', function() {
        let textForm = document.querySelector('form'),
            textForm1 = document.querySelector('#full-featured-non-premium');
          textForm1.value = localStorage.getItem("form");
        console.log(textForm);
        console.log(textForm1);
      });

        tinymce.init({
          selector: 'textarea#full-featured-non-premium',
          language: 'ru',
          plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
          imagetools_cors_hosts: ['picsum.photos'],
          menubar: 'file edit view insert format tools table help',
          toolbar: 'fullscreen  preview save print | undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | insertfile image media template link anchor codesample | ltr rtl',
          save_onsavecallback: function () {
            localStorage.setItem("form", textForm1.value);
          },
          toolbar_sticky: true,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tiny.cloud/css/codepen.min.css'
          ],
          link_list: [
            { title: 'My page 1', value: 'http://www.tinymce.com' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_list: [
            { title: 'My page 1', value: 'http://www.tinymce.com' },
            { title: 'My page 2', value: 'http://www.moxiecode.com' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          height: 400,
          file_picker_callback: function (callback, value, meta) {
            /* Provide file and text for the link dialog */
            if (meta.filetype === 'file') {
              callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === 'image') {
              callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === 'media') {
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
            }
          },
          templates: [
                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
            { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
            { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
          ],
          template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
          template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
          height: 600,
          image_caption: true,
          quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
          noneditable_noneditable_class: "mceNonEditable",
          toolbar_drawer: 'sliding',
          contextmenu: "link image imagetools table",
        });
    </script>

  </head>

  <body>
    <header>
      <div class="menu">
        <a href="../index.html" class="logo">TextBook - Redactor</a>
        <ul class="main-menu">
          <li class="main"><a href="../index.html">Главная</a></li>
          <li class="info"><a href="../info.html">Информация</a></li>
          <li class="feedback"><a href="feedback.html">Обратная связь</a></li>
          <!-- <li class="account"><a href="../login.html">Мой Аккаунт</a></li> -->
        </ul>
      </div>
    </header>

    <form method="post">
      <textarea id="full-featured-non-premium">
    </form>

    
  </body>
</html>
