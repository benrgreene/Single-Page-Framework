<?php

class Database_Installer {
  
  public function __construct() {
    $this->db_interface    = new Database_Interface();
    $this->table_interface = new Table_Interface();
  }

  // checks if the database is installed OR if it needs to be added
  public function should_install() {
    $have_results = $this->table_exists( 'options' );
    // if there are no results return true to indicate we need to install the DB
    return (false == $have_results);
  }

  // check if the tables exist
  public function table_exists( $table ) {
    $query        = "SHOW TABLES LIKE '" . $table . "'";
    $have_results = $this->db_interface->query( $query );
    // if there are no results return true to indicate we need to install the DB
    return (false != $have_results);
  }

  // check if the database is out of date and needs to be updated
  public function should_update() {
    $query   = "SELECT * FROM options WHERE options.name='table_version'";
    $results = $this->db_interface->query( $query );
    if( isset( $results['value'] ) && $results['value'] < DB_VERSION ) {
      return true;
    }
    return false;
  }

  public function update_database() {
    foreach( DB_SCHEMA as $name => $columns ) {
      if( $this->table_exists( $name ) ) {
        $this->table_interface->update_table( $name, $columns );  
      } else {
        $this->table_interface->create_table( $name, $columns );
      }
    }
  }
}