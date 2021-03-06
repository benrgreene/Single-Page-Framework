<?php

// load in the framework
include '../core/actions-loader.php';
include '../helpers.php';
include '../loader.php';

// load the currennt directory (don't want to load the files in the base directory)
load_plugins( '../plugins' );
load_directory( '../' );

// load our theme admin settings
$theme_path = get_theme_path();
include $theme_path . 'admin.php';

// active admin theme path
$admin_theme_path = ADMIN_THEME . '/admin.php';

// fire action for any pre admin page settings
get_action_parts( 'admin_set_defaults' );

$query   = DB_Query_Builder::select_query( 'users', array() );
$results = (new Database_Interface)->query( $query );

if( is_array( $results ) || file_exists( "../installed.php" ) ) {
  include $admin_theme_path;
} else {
  /**
   * Check if there is a new user to add to the DB
   */
  if( isset( $_POST['username'] ) &&
      isset( $_POST['password'] ) &&
      isset( $_POST['email'] ) ) {
    // save new user
    $insert_query = DB_Query_Builder::insert_query( 'users', array(
      'name'     => $_POST['username'],
      'email'    => $_POST['email'],
      'password' => md5( $_POST['password'] ),
      'level'    => 'admin'
    ) );
    (new Database_Interface)->insert( $insert_query );
    $file = fopen( "../installed.php", 'w' );
    fwrite( $file, '<?php // silence is the best' );
    fclose( $file );
    include $admin_theme_path;
  } else {
    include 'install.php';
  }
}