<?php 

API_Register::get_instance()->add_endpoint( 
  'post/tieMediaToPost', 
  'api_tie_post_to_media'
);
function api_tie_post_to_media( $data ) {
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }
  
  $media_id = $data['mediaID'];
  $post_id  = $data['postID'];

  $results = false;
  $query   = DB_Query_Builder::select_query( 'related_upload', array(
    'post_id'   => $post_id,
    'upload_id' => $media_id
  ) );
  // only insert if there are no related results already
  if( !(new Database_Interface)->query( $query ) ) {
    $query = DB_Query_Builder::insert_query( 'related_upload', array(
      'post_id'   => $post_id,
      'upload_id' => $media_id
    ) );
    $results = (new Database_Interface)->insert( $query );
  }

  API_Responses::send_response( array(
    'content' => 'Media attached to post',
  ), 200);
}