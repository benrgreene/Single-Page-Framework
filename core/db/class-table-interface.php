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

  public function update_table( $table_name, $table_options ) {

  }
}