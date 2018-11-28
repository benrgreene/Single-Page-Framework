<?php

/**
 *  Get a list of all media associated with a post
 */

API_Register::get_instance()->add_endpoint( 
  'get/media/{post_id}',
  'api_get_post_media' 
);

function api_get_post_media( $data ) {
  $post_media = get_post_media( $data['parameters'][0] );

  if( $post_media ) {
    API_Responses::send_response( array(
      'content' => $post_media
    ) );
  }

  API_Responses::send_response( array(
    'content' => 'No media found'
  ), 400 );
}