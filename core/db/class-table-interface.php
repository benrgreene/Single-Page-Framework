<?php

// This is a class made to help update/create single tables within the database.

class Table_Interface {

  public function __construct() {
    $this->interface = new Database_Interface();
  }

  public function create_table( $table_name, $table_columns ) {
    $query = "CREATE TABLE {$table_name} ( ID mediumint NOT NULL AUTO_INCREMENT, ";
    foreach( $table_columns as $name => $type ) {
      $query .= sprintf( '%s %s NOT NULL, ', $name, $type );
    }
    $query .= "PRIMARY KEY (ID) );";
    
    $this->interface->query( $query );
  }

  public function update_table( $table_name, $table_columns ) {
    $line_prefix = sprintf( 'ALTER TABLE %s ', $table_name );
    $columns     = $this->column_names( $table_name );
    foreach( $table_columns as $column_name => $col_type ) {
      // update or add based on if the column exists
      $col_exists = in_array( $column_name, $columns );
      $cmd = $col_exists ? 'MODIFY COLUMN' : 'ADD';
      // TODO: Defaults of the columns
      $default = null;
      // TODO: set if the column can be null
      $not_null = 'NOT NULL';
      // build the 
      $sql = sprintf( '%s %s %s %s %s %s;', $line_prefix, $cmd, $column_name, $col_type, $not_null, $default);
      $this->interface->insert( $sql );
    }
  }

  // Check if a single column exists
  public function column_names( $table ) { 
    $query     = sprintf( 'SHOW COLUMNS FROM %s', $table );
    $results   = $this->interface->query( $query );
    $to_return = array();
    if( is_array( $results ) ) {
      foreach( $results as $column ) {
        $to_return[] = $column['Field'];
      }
    }
    return $to_return;
  }
}