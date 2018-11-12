<?php

define( 'BRG_THEME_OPTIONS', array(
  'footer_widget_one', 'footer_widget_two', 'footer_widget_three'
));

// Add our theme defaults
add_action( 'admin_set_defaults', 'brg_add_theme_options' );
function brg_add_theme_options() {
  foreach( BRG_THEME_OPTIONS as $option ) {
    if( !brg_does_theme_option_exist( $option ) ) {
      brg_add_empty_theme_option( $option );
    }
  }
}

// Check if a theme option exists in the DB
function brg_does_theme_option_exist( $option ) {
  $query = DB_Query_Builder::select_query( 'theme_options', array(
    'name' => $option
  ));
  $results = (new Database_Interface)->query( $query );
  return $results;
}

// Add an empty theme option to the database
// (ensure admins can see it)
function brg_add_empty_theme_option( $option ) {
  $query = DB_Query_Builder::insert_query( 'theme_options', array(
    'name'  => $option,
    'value' => ''
  ));
  $results = (new Database_Interface)->insert( $query );
  return $results;
}