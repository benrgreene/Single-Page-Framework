<?php

// These are all the authentication related API endpoints

// Add the login endpoint/callback
API_Register::get_instance()->add_endpoint( 'login', 'api_login' );
// This will check that the sent user/password are in the database. If they are, send back an auth token for their use. 
// Tokens should be given an expiration date and added to the tokens table.
function api_login( $data ) {
  // check if the login info is correct
  $email           = $data['email'];
  $password        = $data['password'];
  $hashed_password = md5( $password );
  // Build our select query for getting the requested user's info
  $query = DB_Query_Builder::select_query( 'users', array(
    'email' => $email
  ));
  // Get the current user
  $results   = (new Database_Interface)->query( $query );
  // check there are results, if none return a not allowed response
  if(!$results ) {
    return API_Responses::send_response( array(
      'content' => 'Bad Login'
    ), 400 );
  }
  // let's check the password!
  $real_pass = $results['password'];
  if( $hashed_password !== $real_pass ) {
    // naughty naughty. give them a not allowed response.
    return API_Responses::send_response( array(
      'content' => 'Bad Login'
    ), 400 );
  }
  // They have proper access! Let's give them a token.
  $token = md5( $email . SECRET_KEY );

  // need to save token for checking / tracking expiration

  // Send token back
  API_Responses::send_response( array(
    'content' => $token,
  ) );
}