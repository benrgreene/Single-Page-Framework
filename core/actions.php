<?php

// Load all the base scripts into the page
add_action( 'scripts', function() {
  $url            = get_site_base_url();
  $script_version = filemtime( 'assets/index.build.js' );
  echo sprintf( '<script type="text/javascript" src="%sassets/index.build.js?v=%s"></script>', $url, $script_version );
}, 1);

// Set base site header info (title)
add_action( 'head', function() {
  $base_url = get_site_base_url();
  echo sprintf( '<title>%s</title>', SITE_TITLE );
  echo sprintf( '<script type="text/javascript">const baseURL = "%s";</script>', $base_url );
});