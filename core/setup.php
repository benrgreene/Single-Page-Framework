<?php

// run the setup proccess for the site
function setup_site( $base_path ) {
  // setup the template loader's base info
  $actions = Actions::get_instance();
  $actions->set_base_path( $base_path );
  // add the htaccess
  $ht_installer = new Htaccess_Installer( $base_path );
  if( $ht_installer->should_istalll() ) {
    $ht_installer->install();
  }

  $db_installer = new Database_Installer();

  load_theme( $base_path );
}

// load the theme for setting up custom actions/scripts/css
function load_theme( $base_path ) {
  include get_theme_path() . "index.php";
}

function get_current_theme() {
  return 'theme-default';
}

// get the current theme base path
function get_theme_path() {
  $theme_name = get_current_theme();
  $base_path  = get_base_path();
  return "{$base_path}/themes/{$theme_name}/";
}