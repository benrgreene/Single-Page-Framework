<?php

/**
 *  This is a helper class for building DB queries
 */

class DB_Query_Builder {

  // build a select query:
  //    $table: name of the table
  //    $where: array of table where keys are column names, and values are variables they should equal/
  public static function select_query( $table, $conditions, $selection='*' ) {
    $query = sprintf( 'SELECT %s FROM %s', $selection, $table );
    // if there are conditions, add them to the query
    if( 0 < count( $conditions ) ) {
      $query .= ' WHERE ';
      foreach( $conditions as $column => $variable ) {
        $query .= sprintf( '%s.%s="%s" AND ', $table, $column, $variable );
      }
      // We need to remove the last AND (since there's nothing after it)
      $last_and = strrpos( $query, 'AND' );
      $query    = substr_replace( $query, '', $last_and );
    }
    return $query;
  } 

  // Build an insertion query
  public static function insert_query( $table, $insertions ) {
    $query   = sprintf( 'INSERT INTO %s ', $table );
    $columns = '(';
    $values  = '(';
    foreach( $insertions as $column => $value ) {
      $columns .= sprintf('%s, ', $column);
      $values  .= sprintf("'%s', ", $value);
    }
    // remove trailing ',' for columns, values
    $last_comma = strrpos( $columns, ',' );
    $columns    = substr_replace( $columns, '', $last_comma );
    $last_comma = strrpos( $values, ',' );
    $values     = substr_replace( $values, '', $last_comma );
    // add the columns and values to the query
    $query .= sprintf('%s) VALUES %s)', $columns, $values);
    return $query;
  }

  public static function update_query() {

  }

  // build a deletion query
  public static function delete_query( $table, $conditions ) {
    $query = sprintf( 'DELETE FROM %s WHERE ', $table );
    foreach( $conditions as $column => $variable ) {
      $condition = '=';
      $value     = $variable;
      if( 'array' == gettype( $variable )) {
        $value     = $variable['value'];
        $condition = $variable['condition'];
      }
      $query .= sprintf( '%s.%s %s "%s" AND ', $table, $column, $condition, $value );
    }
    // We need to remove the last AND (since there's nothing after it)
    $last_and = strrpos( $query, 'AND' );
    $query    = substr_replace( $query, '', $last_and );
    return $query;
  } 
}