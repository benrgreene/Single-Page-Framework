<?php

// want to set the meta data + load the styles
add_action('head', function() { ?>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="<?php echo get_theme_url(); ?>/build/main.css" />
  <script type="text/javascript">
    const siteTitle = "<?php echo SITE_TITLE; ?>";
    const siteUrl   = "<?php echo get_site_base_url(); ?>";
    const pageDefaults = <?php echo json_encode( $_GET ); ?>;
  </script>
<?php });

// add our base template containers
add_action('body', function() {
  include 'templates/body.php';
});

// This all gets loaded at the bottom of the page body
add_action('scripts', function() { ?>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css?family=Lato:400,900|Raleway:400" rel="stylesheet">
  <script type="text/javascript" src="<?php echo get_theme_url(); ?>/build/index.build.js"></script>
<?php });