<?php

// Get a page of results for a given post type
API_Register::get_instance()->add_endpoint( 
  'get/page/{post_type}/{page_number}', 
  'api_get_page_of_results'
);
function api_get_page_of_results( $data ) {
  $post_type   = $data['parameters'][0];
  $page_number = intval( $data['parameters'][1] );

  // Only proceed if there is a valid page number
  if( $page_number < 1 ) {
    API_Responses::send_response( array(
      'content' => 'Invalid page number'
    ), 400 );
  }
  
  $query = DB_Query_Builder::select_query( 'posts', array(
    'type' => $post_type
  ), array(
    'limit'  => PAGE_SIZE,
    'offset' => ($page_number - 1) * PAGE_SIZE,
  ) );
  
  $results = (new Database_Interface)->query( $query );
  
  if( false !== $results ) {
    API_Responses::send_response( array(
      'content' => $results
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'No results for the request.'
    ), 400 );
  }
}