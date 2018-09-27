<?php

class DB_Cleanup {

  // Clean the old/expired tokens out of the database
  public static function clean_tokens() {
    $query = DB_Query_Builder::delete_query( 'tokens', array(
      'expiration' => array(
        'value'     => date("Y-m-d H:i:s"),
        'condition' => '<'
      )
    ));
    write_log( $query );
    $results = (new Database_Interface)->delete( $query );
  }
}