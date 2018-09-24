<?php

class API_Responses {

  // This is the function that turns the response into a message to return to the client.
  // $msg: array OR string of content to be passed. This will be the body of the response. 
  public static function create_response( $msg ) {
    $msg  = self::standardize( $msg );
    $json = json_encode( $msg );
    return $json;
  }

  // standardize the message to make sure it has the 'content' entry
  public static function standardize( $msg ) {
    if( 'string' == gettype( $msg ) ) {
      $msg = array( 'content' => $msg );
    }
    return $msg;
  }

  // returns a message to the client requesting the data
  public static function send_response( $msg, $code=200 ) {
    // ensure the data to send is JSON 
    $msg = self::create_response( $msg );
    // set our response headers
    header('Content-type: application/json');
    header('Cache-Control: no-cache, must-revalidate');
    http_response_code( $code );
    // die so as the framework doesn't continue processing, outputting the response JSON. 
    die( $msg );
  }
}