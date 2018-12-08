<?php

// Add API endpoint to get a post by its slug
API_Register::get_instance()->add_endpoint( 
  'get/post/{slug}', 
  'api_get_post_by_slug'
);
function api_get_post_by_slug( $data ) {
  $slug = $data['parameters'][0];
  $query = DB_Query_Builder::join_query( 'posts', 
    array( 'posts.*', 'users.name', 'users.email' ), 
    array(
      array( 'users', 'posts.author', 'users.email' )
    ), array(
      'posts.slug' => $slug,
    ),
    array()
  );
  $results = (new Database_Interface)->query( $query );
  if( false !== $results ) {
    API_Responses::send_response( array(
      'content'  => $results
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'No results for the request.'
    ), 400 );
  }
}