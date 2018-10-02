<?php

class API_Register {

  protected static $instance;
  
  public static function get_instance() {
    if( self::$instance === null ) {
      self::$instance = new API_Register();
    }
    return self::$instance;
  }
  
  private function __construct() { 
    $this->endpoints = array();
  }

  public function add_endpoint( $endpoint, $callback ) {
    if( !ends_with( $endpoint, '/' ) ) {
      $endpoint .= '/';
    }
    $this->endpoints[$endpoint] = $callback;
  }

  public function consume_endpoint( $endpoint, $data ) {
    $callback = false;
    // if the endpoint doesn't exist, throw a 404
    foreach( $this->endpoints as $registered_endpoint => $endpoint_callback ) {
      $var_position = strpos( $registered_endpoint, '{' );
      if( false !== $var_position ) {
        $registered_endpoint = substr( $registered_endpoint, 0, $var_position );
      }
      if( false !== strpos( $endpoint, $registered_endpoint ) ) {
        // Pass all the following as parameters in an array
        $data['parameters'] = explode('/', substr( $endpoint, $var_position ) );
        $callback           = $endpoint_callback;
        break;
      }
    }

    if( false === $callback ) {
      API_Responses::send_response( array(
        'content' => 'endpoint not found', 
      ), 404);
    }

    // if the endpoint callback doesn't exist, server error
    if( !function_exists( $callback ) ) {
      API_Responses::send_response( array(
        'content' => 'server could not complete the request', 
      ), 500);
    }

    // perform the endpoint callback
    $callback( $data );
  }
}