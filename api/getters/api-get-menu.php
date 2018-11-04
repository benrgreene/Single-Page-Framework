<?php

// Get a page of results for a given post type
API_Register::get_instance()->add_endpoint( 
  'get/menu', 
  'api_get_menu'
);

function api_get_menu( $data ) {
  $menu = get_site_menu();  

  if( false !== $results ) {
    API_Responses::send_response( array(
      'content' => $results
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'No menu found.'
    ), 400 );
  }
}

// return the menu
function get_site_menu() {
  $query = DB_Query_Builder::select_query( 'options', array(
    'name' => 'site_menu'
  ) );
  $results = (new Database_Interface)->query( $query );
  return $results;
}