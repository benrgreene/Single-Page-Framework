<?php

// This will take in new post data, and if the auth token is valid, save the post data
API_Register::get_instance()->add_endpoint( 
  'post/newPost', 
  'api_save_post' 
);

function api_save_post( $data ) {
  // Ensure that the poster has a valid token
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }

  $post_data = array(
    'title'    => isset( $data['title'] ) ? $data['title'] : '',
    'content'  => isset( $data['content'] ) ? $data['content'] : '',
    'author'   => isset( $data['author'] ) ? $data['author'] : '',
    'excerpt'  => isset( $data['excerpt'] ) ? $data['excerpt'] : '',
    'type'     => isset( $data['type'] ) ? $data['type'] : '',
  );

  $post_data['slug']    = slugify( $post_data['title'] );
  $post_data['content'] = str_replace("'", "’", $post_data['content']);
  $post_data['excerpt'] = str_replace("'", "’", $post_data['excerpt']);
  
  // This should be a default in the DB
  if( !isset( $data['date'] ) ) {
    $post_data['date'] = date( "Y-m-d H:i:s", time() );
  }

  // Attempt to insert the post in the DB
  $query     = DB_Query_Builder::insert_query( 'posts', $post_data );  
  $response  = (new Database_Interface)->insert( $query );
  $last_post = db_get_latest_entry( 'posts', array( 
    'type'   => $post_data['type']
  ));
  // Let the client know if the post was successful
  if( $response ) {
    API_Responses::send_response( array(
      'content' => 'Post added',
      'ID'      => isset( $last_post['ID'] ) ? $last_post['ID'] : 0
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => 'Error saving post',
    ), 500);
  }
}