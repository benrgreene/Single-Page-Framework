<?php

/**
 *  This is a helper class for building DB queries
 */

class DB_Query_Builder {

  // build a select query:
  //    PARAMETERS 
  //      $table: name of the table
  //      $conditions: array of table where keys are column names, and values are variables they should equal/
  //      $selection: a string of the values to be returned
  public static function select_query( $table, $conditions, $options=array() ) {
    // set the default options
    $options = array_merge( array(
      'selection' => '*',
      'limit'     => '',
      'order'     => false,
      'offset'    => false,
    ), $options );
    // now build our query
    $query = sprintf( 'SELECT %s FROM %s ', $options['selection'], $table );
    // if there are conditions, add them to the query
    if( 0 < count( $conditions ) ) {
      $query .= ' WHERE ';
      foreach( $conditions as $column => $variable ) {
        $query .= sprintf( '%s.%s="%s" AND ', $table, $column, $variable );
      }
      $query = remove_last_instance( $query, 'AND' );
    }
    // Add any order command present
    if( $options['order'] ) {
      $direction = isset( $options['direction'] ) ? $options['direction'] : 'ASC';
      $query .= sprintf( ' ORDER BY %s %s', $options['order'] , $direction );
    }
    // If there is a limit, add it to the query
    if( $options['limit'] ) {
      $query .= sprintf( ' LIMIT %s', $options['limit'] );
    }

    return $query;
  } 

  // Build a select query that joins tables
  //    PARAMETERS
  //      $table: base table to build the query from
  //      $selects: the different columns to be returned (need to include tables!)
  //      $joins: an array of arrays containing the table and columns to join on:
  //        array(
  //          join-table, join-table column, base-table column
  //        )
  public static function join_query( $table, $selects, $joins, $conditions=false ) {
    $query = sprintf( 'SELECT %s FROM %s ',  implode( ', ', $selects ), $table );
    foreach( $joins as $join ) {
      if( 3 >= count( $join ) ) {
        $query .= sprintf( 'INNER JOIN %s ON %s=%s ', $join[0], $join[1], $join[2] );
      }
    }
    if( $conditions ) {
      $query .= ' WHERE '; 
      foreach( $conditions as $condition => $value ) {
        $query .= sprintf( '%s = %s AND ', $condition, $value );
      }  
      $query = remove_last_instance( $query, 'AND' );
    }
    
    return $query;
  }

  // Build an insertion query
  //    PARAMETERS 
  //      $table: name of the table
  //      $insertions: array of values to insert, where keys are column names, and values are variables to be added
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

  // Update a row in the table
  //    PARAMETERS 
  //      $table: name of the table
  //      $insertions: array of values to insert, where keys are column names, and values are variables to be added
  //      $conditions: array of table where keys are column names, and values are variables they should equal
  public static function update_query( $table, $insertions, $conditions=false ) {
    $query   = sprintf( 'UPDATE %s SET ', $table );
    foreach( $insertions as $column => $value ) {
      $query .= sprintf( '%s=\'%s\', ', $column, $value );
    }
    // remove trailing ',' for columns, values
    $last_comma = strrpos( $query, ',' );
    $query      = substr_replace( $query, '', $last_comma );

    // Need to check if there are any conditions to add
    if( is_array( $conditions ) ) {
      $query .= ' WHERE ';
      foreach( $conditions as $column => $value ) {
        $query .= sprintf( '%s=\'%s\' AND ', $column, $value );
      }
      // remove trailing ',' for columns, values
      $last_and = strrpos( $query, 'AND' );
      $query    = substr_replace( $query, '', $last_and );
    }
    // add the columns and values to the query
    return $query;
  }

  // build a deletion query
  //    PARAMETERS 
  //      $table: name of the table
  //      $conditions: array of table where keys are column names, and values are variables they should equal/
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