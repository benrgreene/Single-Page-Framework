<?php

function is_valid_token( $token ) {
  $query = DB_Query_Builder::select_query( 'tokens', array(
    'token' => $token
  ));
  $results = (new Database_Interface)->query( $query );
  // Check if there is a token to check
  if( false !== $results ) {
    // Now make sure it hasn't expired
    $expiration = $results['expiration'];
    $now        = date( "Y-m-d H:i:s", time() );
    if( $now < $expiration ) {
      return true;
    }
  }
  return false;
}