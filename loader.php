<?php

/**
 * This is the auto loader for the framework.
 * It will load all non-template PHP files.
 *
 * To declare a PHP file a template file, it should be placed under the 'template' directory.
 */

// load the currennt directory (don't want to load the files in the base directory)
load_directory( '.', false );

// given a directory, load that directory into the project.
// folders will always be loaded, but files are loaded if the 
//    'load_files' parameter is true
function load_directory( $directory, $load_files=true ) {
  $current_directory = scandir( $directory );
  foreach( $current_directory as $file ) {
    // skip current and parent directory references
    if( should_ignore_file( $file ) ) {
      continue;
    }
    // if it's a directory, recursivley load it in
    if( is_dir( "{$directory}/{$file}" ) ) {
      load_directory( "{$directory}/{$file}" );
    } else {
      // want to skip the './' at the beginning (needed for reading through directories)
      $include_path = substr( "{$directory}/{$file}", 2);
      include $include_path;
    }
  }
}

// returns if the current file should be ignored in inclusion
function should_ignore_file( $file ) {
  $should_ignore = false;
  // exclude all files starting with a '.' (hidden files)
  if( 0 === strpos( $file, '.' ) ) {
    $should_ignore = true;
  }
  // any other files/directories to ignore
  if( in_array( $file, array( 
    'error.log', 'helpers.php', 'index.php', 'loader.php', 'templates'
  ) ) ) {
    $should_ignore = true; 
  }

  return $should_ignore;
}