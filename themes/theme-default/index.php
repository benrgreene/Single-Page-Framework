<?php

// want to set the meta data + load the styles
add_action('head', function() {
  echo sprintf( '<link rel="stylesheet" href="%s/build/main.css" />', get_theme_url() );
});

// add our base template containers
add_action('body', function() {
  include 'templates/body.php';
});

// add our theme scripts
add_action('scripts', function() {
  echo sprintf( '<script type="text/javascript" src="%s/build/index.build.js"></script>', get_theme_url() );
});