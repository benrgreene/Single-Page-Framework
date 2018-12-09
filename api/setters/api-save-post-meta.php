<?php

API_Register::get_instance()->add_endpoint( 
  'post/postMeta', 
  'api_save_post_meta' 
);

function api_save_post_meta( $data ) {
  // Check there is proper authorization for the POST
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }
  // Check there is a post to update
  if( !isset( $data['ID'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Request: no ID given',
    ), 400);
  }

  $post_id = intval( $data['ID'] );
  $meta    = isset( $data['meta'] ) ? $data['meta'] : array();
  $exists  = does_row_exist( 'post_meta', 'post_id', $post_id );
  $to_save = array( 
    'content' => json_encode( $meta )
  );
  $query   = '';
  $results = false;

  if( $exists ) {
    $query = DB_Query_Builder::update_query( 'post_meta', $to_save, array(
      'post_id' => $post_id
    ) );
    $results = (new Database_Interface)->update( $query );
  } else {
    $to_save['post_id'] = $post_id;
    $query = DB_Query_Builder::insert_query( 'post_meta', $to_save );
    $results = (new Database_Interface)->insert( $query );
  }
  write_log($results);

  API_Responses::send_response( array(
    'content' => 'Post Meta Updated',
  ), 200); 
}