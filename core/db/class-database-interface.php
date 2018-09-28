<?php

class Database_Interface {
  
  // clean a query out to be safe for the DB
  public function clean_query( $query ) {
    return $query;
  }

  // perform a query on the database and return results
  public function query( $query ) {
    $con     = $this->connect();
    $query   = $this->clean_query( $query );
    $results = $con->query( $query );

    // check if there was a query error, if so we return false
    if( !$results || 0 == $results->num_rows ) {
      return false;
    }
    
    // want to return the results purely as an array
    $to_return = array();
    while( $row = $results->fetch_array() ) {
      $to_return[] = $row;
    }
    $this->close( $con );
    // if there is one row in the results, just return the one row
    if( 1 == count( $to_return ) ) {
      return $to_return[0];
    }
    return $to_return;
  }

  // perform an update on the DB
  public function update() {

  }

  // perform instertion on the DB
  public function insert( $query ) {
    $con     = $this->connect();
    $query   = $this->clean_query( $query );
    $results = $con->query( $query );
    $this->close( $con );
    return $results;
  }

  // insert/delete is the same code, just want to add an alias 
  // for easier reading elsewhere
  public function delete( $query ) {
    return $this->insert( $query );
  }

  // connect to the DB
  private function connect() {
    $con = new mysqli( DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME );
    if( $con->connect_error ) {
      $this->throw_connection_error();
    }
    return $con;
  }

  // close connection to the database
  private function close( $con ) {
    $con->close();
  }

  private function throw_connection_error() {
    die( "Connection failed: could not connect to the server. Please contect the server admin if the problem persists");
  }
}
