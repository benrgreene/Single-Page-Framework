<!DOCTYPE html>
<html>
  <head>
    <title>Site Admin</title>
    <link rel="stylesheet" href="<?php echo get_site_base_url() . ADMIN_THEME; ?>/styles/admin.css" />
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css?family=Poppins|Roboto" rel="stylesheet">
    <script src="<?php echo get_site_base_url() . ADMIN_THEME; ?>/filters.js"></script>
    <script type="text/javascript">
      const baseURL = "<?php echo str_replace('admin/', '', get_site_base_url()); ?>";
      document.addEventListener('keydown', (event) => {
        if ('Escape' == event.key) {
          const dialog = document.querySelector('#js-dialog')
          dialog.close()
        }
      })
    </script>
  </head>
  <body>
    <?php get_action_parts( 'admin-before-body' ); ?>
    <div id="app"></div>
    <script src="<?php echo get_site_base_url() . ADMIN_THEME; ?>/index.build.js"></script>
    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css">
    <?php get_action_parts( 'admin-after-body' ); ?>
  </body>
</html>