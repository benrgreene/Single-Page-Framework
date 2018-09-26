<?php

/**
 *  This is a helper class for building DB queries
 */

class DB_Query_Builder {
  // build a select query:
  //    $table: name of the table
  //    $where: array of table where keys are column names, and values are variables they should equal/
  public static function select_query( $table, $where ) {
    $query = sprintf( 'SELECT * FROM %s', $table );
    // if there are conditions, add them to the query
    if( 0 < count( $where ) ) {
      $query .= ' WHERE ';
      foreach( $where as $column => $variable ) {
        $query .= sprintf( '%s.%s="%s" AND ', $table, $column, $variable );
      }
      // We need to remove the last AND (since there's nothing after it)
      $last_and = strrpos( $query, 'AND' );
      $query    = substr_replace( $query, '', $last_and );
    }
    return $query;
  } 
}