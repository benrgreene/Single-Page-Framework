<?php 

// Get the meta related to a post
API_Register::get_instance()->add_endpoint( 
  'get/meta/{post_id}', 
  'api_get_post_meta' 
);

function api_get_post_meta( $data ) {
  // passed ID
  $post_id = intval( $data['parameters'][0] );

  $query = DB_Query_Builder::select_query( 'post_meta', array(
    'post_id' => $post_id
  ) );

  $results = (new Database_Interface)->query( $query );
  
  if( false !== $results && isset( $results['content'] ) ) {
    API_Responses::send_response( array(
      'content' => $results['content']
    ) );
  } else {
    API_Responses::send_response( array(
      'content' => json_encode( array() )
    ) );
  }
}