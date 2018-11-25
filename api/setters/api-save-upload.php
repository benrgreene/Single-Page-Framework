<?php

API_Register::get_instance()->add_endpoint( 
  'post/uploadMedia', 
  'api_save_upload' 
);
function api_save_upload( $data ) {
  if( !isset( $_POST['token'] ) || !is_valid_token( $_POST['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }
  $exists_in_db = false;
  if( isset( $_FILES['file'] ) ) {
    $file         = $_FILES['file'];
    $tmp_name     = $file["tmp_name"];
    $name         = basename( $file["name"] );
    $move_to      = get_base_path() . '/uploads';
    $was_uploaded = move_uploaded_file( $tmp_name, "$move_to/$name" );

    $query = DB_Query_Builder::select_query( 'uploads', array(
      'name' => $name
    ) );
    $exists_in_db = (new Database_Interface)->query( $query );

    // Create a DB entry to keep track of the media
    if( $was_uploaded && !$exists_in_db ) {
      $query = DB_Query_Builder::insert_query( 'uploads', array(
        'name' => $name
      ));
      $response = (new Database_Interface)->insert( $query );
      $latest_upload = db_get_latest_entry( 'uploads' );
      API_Responses::send_response( array(
        'content' => 'Media uploaded',
        'mediaID' => $latest_upload['ID']
      ), 200); 
    }
  }
  if ( $exists_in_db ) {
    API_Responses::send_response( array(
      'content' => 'Media already exists in database',
      'mediaID' => $exists_in_db['ID']
    ), 200);
  }
  API_Responses::send_response( array(
    'content' => 'No media uploaded',
  ), 400);
}