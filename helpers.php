<?php

// Custom error writing function to standardize logging
function write_log( $msg ) {
  if( 'string' == gettype( $msg ) ) {
    $msg = trim($msg);
  }
  error_log( print_r( $msg, true ) . "\n", 3, 'error.log' );
}

// want the base path to the site direectory
function get_base_path() {
  return __DIR__;
}

// Check if a string ends with a specific needle
function ends_with( $haystack, $needle ) {
  $length = strlen( $needle );
  if( $length == 0 ) {
      return true;
  }
  return ( substr( $haystack, -$length ) === $needle );
}

// Base URL for the site
function get_site_base_url() {
  $path = db_get_latest_entry( 'options', array(
    'name' => 'site_url'
  ));
  if( !$path ) {
    $path = set_site_base_url();
  }
  return $path['value'];
}

function set_site_base_url() {
  $dir_end     = substr(__DIR__, strrpos(__DIR__, '/'));
  $port        = $_SERVER['SERVER_PORT'];
  $prefix      = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
  // Want to cut out any parameters (anything after the ?)
  $raw_request = $_SERVER['REQUEST_URI'];
  $end_pos     = strpos( $raw_request, '?' ) ? strpos( $raw_request, '?' ) : strlen( $raw_request );
  $request     = substr( $raw_request, 0, $end_pos );
  // remove any API requests
  $api_pos     = strpos( $request, '/api' );
  if( -1 < $api_pos ) {
    $request = substr( $request, 0, $api_pos );
  }
  $path = sprintf( '%s://%s%s%s',
    $prefix,
    $_SERVER['SERVER_NAME'],
    (443 !== $port && 80 !== $port) ? ':' . $port : '',
    $request
  );
  // save to database
  add_option( 'site_url', $path );
  return $path;
}

// load the theme for setting up custom actions/scripts/css
function load_theme( $base_path ) {
  include get_theme_path() . 'index.php';
}

// get the plugin URL
function get_plugin_url() {
  $base_path = get_site_base_url();
  if( ends_with( $base_path, 'admin/' ) ) {
    $base_path = str_replace( 'admin/', '', $base_path );
  }
  return "{$base_path}plugins/";
}

function get_theme_name() {
  $theme = db_get_first_entry( 'options', array( 'name' => 'selected_theme' ) );
  return is_array( $theme ) ? $theme['value'] : 'theme-default';
}

// return the current theme base path
function get_theme_path() {
  $theme_name = get_theme_name();
  $base_path  = get_base_path();
  return "{$base_path}/themes/{$theme_name}/";
}

function get_theme_url() {
  $theme_name = get_theme_name();
  return get_site_base_url() . "themes/{$theme_name}";
}

function remove_last_instance( $haystack, $needle ) {
  $last_occurance = strrpos( $haystack, $needle );
  return substr_replace( $haystack, '', $last_occurance );
}