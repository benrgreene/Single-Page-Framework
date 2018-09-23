<?php

class Database_Installer {
  
  public function __construct() {
    $this->db_interface    = new Database_Interface();
    $this->table_interface = new Table_Interface();
  }

  // checks if the database is installed OR if it needs to be added
  public function should_install() {
    $query        = "SHOW TABLES LIKE 'options'";
    $have_results = $this->db_interface->query( $query );
    // if there are no results return true to indicate we need to install the DB
    return (false === $have_results);
  }

  // check if the database is out of date and needs to be updated
  public function should_update() {
    $query   = "SELECT * FROM options WHERE options.name='table_version'";
    $results = $this->db_interface->query( $query );
    if( isset( $results['value'] ) && $results['value'] == DB_VERSION ) {
      return true;
    }
    return false;
  }

  // loop through the schema and build each table
  public function create_database() {
    foreach( DB_SCHEMA as $name => $columns ) {
      $this->table_interface->create_table( $name, $columns );
    }
  }

  public function update_database() {

  }
}