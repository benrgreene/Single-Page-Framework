<?php

API_Register::get_instance()->add_endpoint( 'delete/themeOption', 'api_delete_theme_option' );
function api_delete_theme_option( $data ) {
  // Ensure that the poster has a valid token
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }

  $query = DB_Query_Builder::delete_query( 'theme_options', array(
    'ID' => $data['id']
  ) );
  $response = (new Database_Interface)->delete( $query );

  if( $response ) {
    API_Responses::send_response( array(
      'content' => 'Option successfully deleted',
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'No option deleted. Please check your parameters.',
    ), 400 );
  }
}