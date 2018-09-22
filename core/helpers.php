<?php

// Custom error writing function to standardize logging
function write_log( $msg ) {
  if( 'string' == gettype( $msg ) ) {
    $msg = trim($msg);
  }
  error_log( print_r( $msg, true ) . "\n", 3, 'error.log' );
}