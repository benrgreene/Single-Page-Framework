<?php

// Custom error writing function to standardize logging
function write_log( $msg ) {
  if( 'string' == gettype( $msg ) ) {
    $msg = trim($msg);
  }
  error_log( print_r( $msg, true ) . "\n", 3, 'error.log' );
}

function get_base_path() {
  return __DIR__;
}

function ends_with( $haystack, $needle ) {
    $length = strlen( $needle );
    if( $length == 0 ) {
        return true;
    }

    return ( substr( $haystack, -$length ) === $needle );
}