<?php

// importFile
API_Register::get_instance()->add_endpoint( 
  'post/importFile', 
  'api_import_content_file' 
);
function api_import_content_file( $data ) {
  if( !isset( $_POST['token'] ) || !is_valid_token( $_POST['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }

  if( isset( $_FILES['file'] ) ) {
    $uploaded = false;
    $file = $_FILES['file'];
    if( $file['error'] == UPLOAD_ERR_OK ) {
      $raw_file_contents = file_get_contents( $file['tmp_name'] );
      $file_contents     = json_decode( $raw_file_contents, true );
      if( false != $file_contents ) {
        foreach( $file_contents as $post ) {
          import_post( $post );
        }
        $uploaded = true;
      }
    }

    if( $uploaded ) {
      API_Responses::send_response( array(
        'content' => 'File imported',
      ));
    }
  }

  API_Responses::send_response( array(
    'content' => 'No file passed',
  ), 400);
}

// TODO: add some error catching here
function import_post( $post_object ) {
  // insert the post
  $post_query = DB_Query_Builder::insert_query( 'posts', array(
    'type'    => $post_object['post_info']['type'],
    'title'   => $post_object['post_info']['title'],
    'content' => $post_object['post_info']['content'],
    'date'    => $post_object['post_info']['date'],
    'author'  => $post_object['post_info']['author'],
    'slug'    => slugify($post_object['post_info']['title'])
  ) );
  (new Database_Interface)->insert( $post_query );
  // get the post object
  $post = db_get_latest_entry( 'posts', array(
    'type' => $post_object['post_info']['type']
  ) );
  // Only want to try and upload the media if there is media to upload
  if( isset($post_object['uploads']['file']) &&
      false != $post_object['uploads']['file'] && 
      '' != $post_object['uploads']['file'] ) {
    // add the post media
    $media_query = DB_Query_Builder::insert_query( 'uploads', array(
      'name' => $post_object['uploads']['file']
    ) );
    (new Database_Interface)->insert( $media_query );
    // get the media object
    $upload = db_get_latest_entry( 'uploads' );
    // tie the media to the post
    $query = DB_Query_Builder::insert_query( 'related_upload', array(
      'post_id'   => $post['ID'],
      'upload_id' => $upload['ID']
    ) );
    $results = (new Database_Interface)->insert( $query );
  }
}