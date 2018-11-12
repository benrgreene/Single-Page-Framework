<?php

// Get all theme options (no pagination or anything)
API_Register::get_instance()->add_endpoint( 'get/themeOptions', 'api_get_theme_options' );

function api_get_theme_options() {
  $query = DB_Query_Builder::select_query( 'theme_options', array() ); 
  $results = (new Database_Interface)->query( $query, false );
  API_Responses::send_response( array(
    'content' => $results ? $results : array(),
  ) );
}