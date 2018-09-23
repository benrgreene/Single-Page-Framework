<?php

// Set the error log for the framework
ini_set('error_log', __DIR__ . '/error.log');

// include all the library stuffs
include 'helpers.php';
include 'loader.php';

// run the setup process
setup_site( get_base_path() );

// Check if this is an API request, or a user hitting the page
if( isset( $_GET['request'] ) ) {
  include 'api/api.php';
  proccess_api_request( $_GET['request'] );
} else {
  // Base template includes
  include 'templates/base.php';
}