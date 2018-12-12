<!DOCTYPE html>
<html>
  <head>
    <title>Site Admin</title>
    <link rel="stylesheet" href="styles/admin.css" />
    <script type="text/javascript">
      const baseURL = "<?php echo str_replace('admin/', '', get_site_base_url()); ?>";
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script src="index.build.js"></script>
    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
  </body>
</html>