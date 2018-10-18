<?php

// Returns an array of the current post types in the DB
API_Register::get_instance()->add_endpoint( 'get/postTypes', 'api_get_post_types' );
function api_get_post_types( $data ) {
  // Select the distinct post types
  $query = DB_Query_Builder::select_query( 'posts', array(), 'DISTINCT type' );
  $results = (new Database_Interface)->query( $query );
  // set the default post types
  $post_types = array( 'post' );
  // get all unique post types and add to the returning post types
  if( false !== $results ) {
    // Each row should be just the string representing the type of the entry
    foreach( $results as $row ) {
      if( 'string' == gettype( $row ) && !in_array( $row, $post_types ) ) {
        $post_types[] = $row;
      } 
      else if( is_array( $row ) && isset( $row['type'] ) && !in_array( $row['type'], $post_types ) ) {
        $post_types[] = $row['type'];
      }
    }
  }
  // Add the post types array as the content for the response
  API_Responses::send_response( array(
    'content' => $post_types,
  ) );
}