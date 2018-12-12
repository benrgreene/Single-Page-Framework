<?php

/**
 * This is the auto loader for the framework.
 * It will load all non-template PHP files.
 *
 * To declare a PHP file a template file, it should be placed under the 'template' directory.
 */

// given a directory, load that directory into the project.
// folders will always be loaded, but files are loaded if the 
//    'load_files' parameter is true
function load_directory( $directory, $skip_ignores=false ) { 
  $current_directory = scandir( $directory );
  foreach( $current_directory as $file ) {
    // skip the default system files
    if( 0 === strpos( $file, '.' ) ) {
      continue;
    }

    // skip current and parent directory references
    if( should_ignore_file( $file ) && !$skip_ignores ) {
      continue;
    }
    // if it's a directory, recursivley load it in
    if( is_dir( "{$directory}/{$file}" ) ) {
      load_directory( "{$directory}/{$file}", $skip_ignores );
    } else {
      $include_path = "{$directory}/{$file}";
      include $include_path;
    }
  }
}

// returns if the current file should be ignored in inclusion
function should_ignore_file( $file ) {
  $should_ignore = false;
  // any other files/directories to ignore
  //    exclude themes because we only want to load the current theme
  //    exclude API because we only want to load it if the current request is an API request
  if( in_array( $file, array( 
    'error.log', 'helpers.php', 'index.php', 'loader.php', 'templates', 'scripts', 'themes', 'api', 'admin', 'node_modules', 'assets', 'package.json', 'webpack.config.js', 'actions-loader.php', 'README.md', 'uploads', 'installed.php', 'example-config.php', 'sync-push', 'sync-push-excludes'
  ) ) ) {
    $should_ignore = true; 
  }

  return $should_ignore;
}