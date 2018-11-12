<?php

// Set the error log for the framework
ini_set('error_log', __DIR__ . '/error.log');

// include all the critical library stuffs
include 'core/actions-loader.php';
include 'helpers.php';
// all non-critical files to load
include 'loader.php';

// load the currennt directory
load_directory( '.', false );

// run the setup process
setup_site( get_base_path() );
// Load the current theme.
$base_path = get_base_path();
load_theme( $base_path );

// Check if this is an API request, or a user hitting the page
if( isset( $_GET['request'] ) ) {
  // Load the API files/endpoints
  load_directory( './api', true);
  // proccess the API request
  proccess_api_request( $_GET['request'] );
} else {
  // Base template includes
  include 'templates/base.php';
}