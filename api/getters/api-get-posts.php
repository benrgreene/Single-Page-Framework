<?php

API_Register::get_instance()->add_endpoint( 
  'get/posts/{post_type}', 
  'api_get_posts' 
);

function api_get_posts( $data ) {
  // use the parameter as the post type.
  $post_type = str_replace( '/', '', $data['parameters'][0] );
  $query = DB_Query_Builder::select_query( 'posts', array(
    'type' => $post_type,
  ));
  $results = (new Database_Interface)->query( $query, false );
  API_Responses::send_response( array(
    'content' => $results ? $results : array(),
  ) );  
}