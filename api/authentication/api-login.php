<?php

// These are all the authentication related API endpoints

// Add the login endpoint/callback
API_Register::get_instance()->add_endpoint( 
  'login', 
  'api_login' 
);
// This will check that the sent user/password are in the database. If they are, send back an auth token for their use. 
// Tokens should be given an expiration date and added to the tokens table.
function api_login( $data ) {
  // Clean out the old tokens. THIS SHOULD END UP AS A CRON JOB
  DB_Cleanup::clean_tokens();

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
      'content' => 'Sad Login'
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
  $date  = new DateTime();
  $token = md5( $email . SECRET_KEY . $date->format( 'YmdHis' ) );

  // need to save token for checking / tracking expiration
  $tomorrow  = time() + (12 * 60 * 60);
  $insertion = DB_Query_Builder::insert_query( 'tokens', array(
    'token'      => $token,
    'expiration' => date( "Y-m-d H:i:s", $tomorrow )
  ));
  $inserted = (new Database_Interface)->insert( $insertion );
  // Send token back
  API_Responses::send_response( array(
    'content'    => $token,
    'expiration' => $tomorrow
  ) );
}