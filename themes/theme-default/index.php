<?php

// want to set the meta data + load the styles
add_action('head', function() {
  echo sprintf( '<meta charset="utf-8" /><link rel="stylesheet" href="%s/build/main.css" />', get_theme_url() );
});

// add our base template containers
add_action('body', function() {
  include 'templates/body.php';
});

// add our theme scripts
add_action('scripts', function() { ?>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous">
  <script type="text/javascript" src="<?php echo  get_theme_url(); ?>/build/index.build.js"></script>
<?php });