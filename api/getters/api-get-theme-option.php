<?php

// Get single theme option by name
API_Register::get_instance()->add_endpoint( 
  'get/themeOption/{name}', 
  'api_get_theme_option' 
);

function api_get_theme_option( $data ) {
  $query = DB_Query_Builder::select_query( 'theme_options', array(
    'name' => $data['parameters'][0]
  ) ); 
  $results = (new Database_Interface)->query( $query );
  API_Responses::send_response( array(
    'content' => $results ? $results : array(),
  ) );
}