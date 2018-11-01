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
  // ensure DB exists
  $db_installer = new Database_Installer();
  if( $db_installer->should_install() ) {
    $db_installer->create_database();
    // set the DB version
    $query = DB_Query_Builder::insert_query( 'options', array(
      'name'  => 'table_version',
      'value' => DB_VERSION
    ) );
    $response = (new Database_Interface)->insert( $query );
  } else if( $db_installer->should_update() ) {
    $db_installer->update_database();
    // Update the DB
    $query = DB_Query_Builder::update_query( 'options', array(
      'name'  => 'table_version',
      'value' => DB_VERSION
    ), array(
      'name'  => 'table_version'
    ) );
    $response = (new Database_Interface)->update( $query );
  }
  // Add action for loading base scripts
  load_base_scripts();
  // Load the current theme.
  load_theme( $base_path );
}

// load the theme for setting up custom actions/scripts/css
function load_theme( $base_path ) {
  include get_theme_path() . "index.php";
}

function get_current_theme() {
  return 'theme-default';
}

// return the current theme base path
function get_theme_path() {
  $theme_name = get_current_theme();
  $base_path  = get_base_path();
  return "{$base_path}/themes/{$theme_name}/";
}