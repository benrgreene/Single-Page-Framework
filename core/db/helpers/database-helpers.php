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

function does_row_exist( $table, $column, $value ) {
  $query = DB_Query_Builder::select_query( $table, array(
    $column => $value
  ));
  $results = (new Database_Interface)->query( $query );
  return $results;
}

function slugify( $text ) {
  $text = strtolower( $text );
  $text = preg_replace("/\pP+/", "", $text );
  $text = str_replace( ' ', '-', $text);
  return $text;
}

// Add a single option to the options table
function add_option( $name, $value ) {
  return add_generic_option( 'options', $name, $value );
}

// Adds a single options to the theme options
function add_theme_option( $name, $value ) {
  return add_generic_option( 'theme_options', $name, $value );
}

// adds a single option one of the options table (defined by the $table var)
function add_generic_option( $table, $name, $value ) {
  $query = DB_Query_Builder::insert_query( $table, array(
    'name'  => $name,
    'value' => $value
  ) );
  $results = (new Database_Interface)->insert( $query );
  return $results;
}

// adds a single option one of the options table (defined by the $table var)
function update_generic_option( $table, $name, $value ) {
  $query = DB_Query_Builder::update_query( $table, array(
    'value' => $value
  ), array(
    'name'  => $name,
  ) );
  $results = (new Database_Interface)->insert( $query );
  return $results;
}