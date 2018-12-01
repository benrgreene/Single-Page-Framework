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
  
  $page_on = max((($page_number - 1) * PAGE_SIZE), 0);
  $query = DB_Query_Builder::join_query( 'posts', 
    array( 'posts.*', 'users.name', 'users.email' ), 
    array(
      array( 'users', 'posts.author', 'users.name' )
    ), array(
      'posts.type' => $post_type,
    ), array(
      'order'     => 'posts.ID',
      'direction' => 'DESC',
      'limit'     => $page_on . ',' . PAGE_SIZE,
    )
  );
  $results = (new Database_Interface)->query( $query ); 
  // Want to get the first post's ID, and check if that is in
  // the returning results.
  $first          = db_get_first_entry( 'posts', array(
    'type'   => $post_type
  ) );
  $contains_first = false;
  if( $results ) {
    foreach( $results as $post ) {
      if( $post['ID'] == $first['ID'] ) {
        $contains_first = true;
      }
    }  
  } 
  
  if( false !== $results ) {
    API_Responses::send_response( array(
      'content'  => $results,
      'haveMore' => !$contains_first
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'No results for the request.'
    ), 400 );
  }
}