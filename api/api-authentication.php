<?php

// These are all the authentication related API endpoints

// Add the login endpoint/callback
API_Register::get_instance()->add_endpoint( 'login', 'api_login' );
function api_login( $data ) {
  API_Responses::send_response( array(
    'content' => 'data recieved',
    'user' => $data['username']
  ) );
}