<?php

// These are all the authentication related API endpoints
function api_login( $data ) {
  API_Responses::send_response( array(
    'content' => 'data recieved',
    'user' => $data['username']
  ) );
}