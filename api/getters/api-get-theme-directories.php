<?php

// Get all the selectable themes AND the selected theme

API_Register::get_instance()->add_endpoint( 
  'get/themeDirectories', 
  'api_get_theme_directories' 
);

function api_get_theme_directories( $data ) {
  // get our selected theme
  $selected_theme = db_get_first_entry( 'options', array(
    'name' => 'selected_theme'
  ));
  $selected_theme = is_array( $selected_theme ) ? $selected_theme['value'] : $selected_theme;
  // get all our selectable themes
  $selectable_themes = array();
  $theme_dir         = scandir( './themes/' );
  foreach( $theme_dir as $directory ) {
    if( '.' == $directory || '..' == $directory ) {
      continue;
    }
    if( is_dir( "./themes/{$directory}" ) ) {
      $selectable_themes[] = $directory;
    }
  }

  API_Responses::send_response( array(
    'content' => array(
      'selectedTheme' => $selected_theme,
      'themes'        => $selectable_themes
    )
  ) );
}