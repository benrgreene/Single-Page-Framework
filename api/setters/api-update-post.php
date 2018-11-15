<?php 

// Endpoint for updating a post
// Requires token and a post ID
API_Register::get_instance()->add_endpoint( 'post/editPost', 'api_update_post' );
function api_update_post( $data ) {
  // Ensure that the poster has a valid token
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }
  // Need a post ID to update a post...
  if( !isset( $data['postID'] ) ) {
    API_Responses::send_response( array(
      'content' => 'No post ID passed',
    ), 400); 
  }

  // build data array for query
  $post_data = array(
    'title'   => isset( $data['title'] ) ? $data['title'] : '',
    'content' => isset( $data['content'] ) ? $data['content'] : '',
    'author'  => isset( $data['author'] ) ? $data['author'] : '',
    'type'    => isset( $data['type'] ) ? $data['type'] : '',
  );
  $post_data['slug'] = slugify( $post_data['title'] );
  // Build the query (use the post ID as the conditional)
  $query = DB_Query_Builder::update_query( 'posts', $post_data, array(
    'ID'  => $data['postID'],
  ));  
  $response = (new Database_Interface)->insert( $query );

  if( $response ) {
    API_Responses::send_response( array(
      'content' => 'Post Updated',
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'Error saving post',
    ), 500);
  }
}