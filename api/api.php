<?php

include 'class-api-responses.php';
include 'api-authentication.php';

// generic proccessing of the API request.
function proccess_api_request( $request ) {
  // get the different API request pieces.
  $api_request = explode( '/', $request );
  // check if this is an API request, or something else entirely
  if( 1 >= count( $api_request ) || $api_request[0] != 'api' ) {
    die('bad request');
  }

  // Get the client data passed to the endpoint
  $raw_input = file_get_contents('php://input');
  $input     = json_decode( $raw_input, true );

  // if the requested function exists, attempt to call it.
  $function_callback = 'api_' . $api_request[1];
  if( function_exists( $function_callback ) ) {
    $function_callback( $input );
  }
}