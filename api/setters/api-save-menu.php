<?php

/**
 *  Save a menu
 */
API_Register::get_instance()->add_endpoint( 
  'save/menu', 
  'api_save_menu'
);

function api_save_menu( $data ) {
  // Check there is proper authorization for the POST
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }
  // check there is a menu passed
  if( !isset( $data['menu'] ) ) {
    API_Responses::send_response( array(
      'content' => 'No menu passed',
    ), 400);
  }
  $menu        = json_encode( $data['menu'] );
  $results     = '';
  $menu_exists = get_site_menu();
  
  if( $menu_exists ) {
    $query = DB_Query_Builder::update_query( 'options', array(
        'value' => $menu
      ), 
      array(
        'name' => 'site_menu'
      ) 
    );
    $results = (new Database_Interface)->update( $query );
  } else {
    $query = DB_Query_Builder::insert_query( 'options', array(
        'name'  => 'site_menu',
        'value' => $menu
      )
    );
    $results = (new Database_Interface)->insert( $query );
  }

  if( $results ) {
    API_Responses::send_response( array(
      'content' => 'Post Meta Updated',
    ), 200); 
  } else {
    API_Responses::send_response( array(
      'content' => 'Server Error',
    ), 500); 
  }
}