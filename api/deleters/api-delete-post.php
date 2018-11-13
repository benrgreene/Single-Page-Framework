<?php

API_Register::get_instance()->add_endpoint( 'delete/post', 'api_delete_post' );
function api_delete_post( $data ) {
  // Ensure that the poster has a valid token
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }
  
  $query = DB_Query_Builder::delete_query( 'posts', array(
    'ID' => $data['id']
  ) );
  $response = (new Database_Interface)->delete( $query );

  if( $response ) {
    API_Responses::send_response( array(
      'content' => 'successfully deleted',
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'Error deleting post',
    ), 500);
  }
}
