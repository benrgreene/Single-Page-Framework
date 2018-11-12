<?php
  include '../core/actions-loader.php';
  include '../helpers.php';
  include '../loader.php';

  // load the currennt directory (don't want to load the files in the base directory)
  load_directory( '..', false );
  // load our theme admin settings
  $theme_path = get_theme_path();
  include $theme_path . 'admin.php';
  // fire action for any pre admin page settings
  get_action_parts( 'admin_set_defaults' );
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Site Admin</title>
    <link rel="stylesheet" href="styles/admin.css" />
  </head>
  <body>
    <div id="app"></div>
    <script src="index.build.js"></script>
    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
  </body>
</html>