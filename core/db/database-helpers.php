<?php

// Returns the last value entered into a db info
function db_get_latest_entry( $table, $conditions=array() ) {
  $query = DB_Query_Builder::select_query( $table, $conditions, array(
    'limit'     => 1,
    'order'     => 'ID',
    'direction' => 'DESC'
  ) );
  $results = (new Database_Interface)->query( $query );
  return $results;
}

// Returns the first value entered into a db info
function db_get_first_entry( $table, $conditions=array() ) {
  $query = DB_Query_Builder::select_query( $table, $conditions, array(
    'limit'     => 1,
    'order'     => 'ID',
    'direction' => 'ASC'
  ) );
  $results = (new Database_Interface)->query( $query );
  return $results;
}

function slugify( $text ) {
  $text = strtolower( $text );
  $text = preg_replace("/\pP+/", "", $text );
  $text = str_replace( ' ', '-', $text);
  return $text;
}