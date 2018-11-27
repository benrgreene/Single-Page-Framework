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
  $port        = $_SERVER['SERVER_PORT'];
  $prefix      = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off' ? 'https' : 'http';
  // Want to cut out any parameters (anything after the ?)
  $raw_request = $_SERVER['REQUEST_URI'];
  $end_pos     = strpos( $raw_request, '?' ) ? strpos( $raw_request, '?' ) : strlen( $raw_request );
  $request     = substr( $raw_request, 0, $end_pos );
  return sprintf( '%s://%s%s%s',
    $prefix,
    $_SERVER['SERVER_NAME'],
    (443 !== $port && 80 !== $port) ? ':' . $port : '',
    $request
  );
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

function remove_last_instance( $haystack, $needle ) {
  $last_occurance = strrpos( $haystack, $needle );
  return substr_replace( $haystack, '', $last_occurance );
}