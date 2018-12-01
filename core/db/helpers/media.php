<?php

/**
 *  functions for interacting with the DB for media go here
 */

// get all the media associated with a post
function get_post_media( $post_id ) {
  $query = DB_Query_Builder::join_query( 'uploads', 
    // selections
    array( 'uploads.name' ),
    // joins
    array(
      // table, table join, original table join
      array( 'related_upload', 'related_upload.upload_id', 'uploads.ID' ),
    ), 
    // conditions
    array( 'related_upload.post_id' => $post_id ) 
  );
  $results = (new Database_Interface)->query( $query, false );
  // make sure there are paths set for all the media
  $site_url = get_site_base_url();
  if( $results ) {
    foreach( $results as $key => $media ) {
      $results[$key]['path'] =  sprintf( '%s/uploads/' , $site_url );
    }
  }
  return $results;
}