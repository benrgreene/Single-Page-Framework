<?php

// Load all the base scripts into the page
add_action( 'scripts', function() {
  $url = get_site_base_url();
  echo sprintf( '<script type="text/javascript" src="%sassets/index.build.js"></script>', $url );
}, 1);

// Set base site header info (title)
add_action( 'head', function() {
  echo sprintf( '<title>%s</title>', SITE_TITLE );
});