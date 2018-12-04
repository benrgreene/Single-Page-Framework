<?php

API_Register::get_instance()->add_endpoint( 
  'post/themeOptions', 
  'api_save_theme_options' 
);

function api_save_theme_options( $data ) {
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }

  $option    = $data['option'];
  $option_id = isset( $option['ID'] ) ? $option['ID'] : false;
  if( theme_option_exists( $option_id ) ) {
    $query = DB_Query_Builder::update_query( 'theme_options', array(
        'name'  => $option['name'],
        'value' => $option['value']
      ), array(
        'ID' => $option['ID']
      ) 
    );
    $results = (new Database_Interface)->update( $query );
  } else {
    $query = DB_Query_Builder::insert_query( 'theme_options', array(
        'name'  => $option['name'],
        'value' => $option['value']
      )
    );
    $results = (new Database_Interface)->insert( $query );
  }

  API_Responses::send_response( array(
    'content' => 'Option saved',
    'ID'      => db_get_latest_entry( 'theme_options' )['ID']
  ) );
}

function theme_option_exists( $option_id ) {
  $query = DB_Query_Builder::select_query( 'theme_options', array(
    'ID' => $option_id
  ) );
  $results = (new Database_Interface)->query( $query );
  return $results;
}