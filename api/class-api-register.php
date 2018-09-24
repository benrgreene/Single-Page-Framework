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
    $this->endpoints[$endpoint] = $callback;
  }

  public function consume_endpoint( $endpoint, $data ) {
    // if the endpoint doesn't exist, throw a 404
    if( !isset( $this->endpoints[$endpoint] ) ) {
      API_Responses::send_response( array(
        'content' => 'endpoint not found', 
      ), 404);
    }

    // retrieve the callback for the endpoint
    $function = $this->endpoints[$endpoint];

    // if the endpoint callback doesn't exist, server error
    if( !function_exists( $function ) ) {
      API_Responses::send_response( array(
        'content' => 'server could not complete the request', 
      ), 500);
    }

    // perform the endpoint callback
    $function( $data );
  }
}