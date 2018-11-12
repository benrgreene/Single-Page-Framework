<?php

// Returns the last value entered into a db info
function db_get_latest_entry( $table ) {
  $query = DB_Query_Builder::select_query( $table, array(), array(
    'limit'     => 1,
    'order'     => 'ID',
    'direction' => 'DESC'
  ) );
  $results = (new Database_Interface)->query( $query );
  return $results;
}