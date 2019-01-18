<!DOCTYPE html>
<html>
  <head>
    <title>Site Admin</title>
    <link rel="stylesheet" href="<?php echo get_site_base_url() . ADMIN_THEME; ?>/styles/admin.css" />
    <script type="text/javascript">
      const baseURL = "<?php echo str_replace('admin/', '', get_site_base_url()); ?>";
    </script>
  </head>
  <body>
    <div id="app"></div>
    <script src="<?php echo get_site_base_url() . ADMIN_THEME; ?>/index.build.js"></script>
    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
    <?php get_action_parts( 'admin-after-body' ); ?>
  </body>
</html>