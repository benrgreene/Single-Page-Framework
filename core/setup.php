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
    $db_installer->update_database();
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
}

// load the theme for setting up custom actions/scripts/css
function load_theme( $base_path ) {
  include get_theme_path() . 'index.php';
}

// return the current theme base path
function get_theme_path() {
  $theme_name = THEME_NAME;
  $base_path  = get_base_path();
  return "{$base_path}/themes/{$theme_name}/";
}

function get_theme_url() {
  $theme_name = THEME_NAME;
  return get_site_base_url() . "themes/{$theme_name}";
}