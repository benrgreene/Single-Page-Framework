<?php

// generic proccessing of the API request.
function proccess_api_request( $request ) {
  // get the different API request pieces.
  $api_request = explode( '/', $request );
  
  // check if this is an API request, or something else entirely
  if( 0 === count( $api_request ) || $api_request[0] != 'api' ) {
    API_Responses::send_response( array(
      'content' => 'bad request'
    ), 400 );
  }
  
  // build the callback from the pieces of the request
  unset( $api_request[0] );
  $endpoint = implode( '/', $api_request ) . '/';

  // Get the client data passed to the endpoint
  $raw_input = file_get_contents('php://input');
  $input     = json_decode( $raw_input, true );

  // Consume the endpoint
  API_Register::get_instance()->consume_endpoint( $endpoint, $input );
}