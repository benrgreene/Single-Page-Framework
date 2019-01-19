<?php

// importFile
API_Register::get_instance()->add_endpoint( 
  'post/saveTheme', 
  'api_save_active_theme' 
);

function api_save_active_theme( $data ) {
  if( !isset( $data['token'] ) || !is_valid_token( $data['token'] ) ) {
    API_Responses::send_response( array(
      'content' => 'Invalid Credentials',
    ), 400);
  }

  // Check if we need to add the option for selected theme, or update it.
  $selected_theme = db_get_first_entry( 'options', array(
    'name' => 'selected_theme'
  ));
  if( $selected_theme ) {
    update_generic_option( 'options', 'selected_theme', $data['selectedTheme'] );
  } else {
    add_option( 'selected_theme', $data['selectedTheme'] );
  }

  API_Responses::send_response( array(
    'content' => 'Theme updated',
  ));
}