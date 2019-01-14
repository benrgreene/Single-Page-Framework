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
      'condition' => 'AND'
    ), $options );
    // now build our query
    $query = sprintf( 'SELECT %s FROM %s ', $options['selection'], $table );
    // if there are conditions, add them to the query
    if( 0 < count( $conditions ) ) {
      $query .= ' WHERE ';
      $con    = (new Database_Interface)->connect();
      foreach( $conditions as $condition => $value ) {
        // If there only one value for the conditional, add it. 
        // else, then loop through each value it should equal and add
        // conditionals for each
        if( 'string' == gettype( $value ) ) {
          $query .= self::build_condition($con, $table, $condition, $value, $options);
        } else if( is_array( $value ) ) {
          foreach( $value as $single_variable ) {
            $query .= self::build_condition($con, $table, $condition, $single_variable, $options);
          }
        }
      }
      $con->close();
      $query = remove_last_instance( $query, $options['condition'] );
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
  public static function join_query( $table, $selects, $joins, $conditions=false, $options=array() ) {
    // set the default options
    $options = array_merge( array(
      'limit'     => '',
      'order'     => false,
      'offset'    => false,
      'condition' => 'AND'
    ), $options );

    $con   = (new Database_Interface)->connect();
    $query = sprintf( 'SELECT %s FROM %s ',  implode( ', ', $selects ), $table );
    foreach( $joins as $join ) {
      if( 3 >= count( $join ) ) {
        $query .= sprintf( 'LEFT JOIN %s ON %s=%s ', $join[0], $join[1], $join[2] );
      }
    }
    if( $conditions ) {
      $query .= ' WHERE '; 
      foreach( $conditions as $condition => $value ) {
        // If there only one value for the conditional, add it. 
        // else, then loop through each value it should equal and add
        // conditionals for each
        if( 'string' == gettype( $value ) ) {
          $query .= self::build_condition($con, $table, $condition, $value, $options);
        } else if( is_array( $value ) ) {
          foreach( $value as $single_variable ) {
            $query .= self::build_condition($con, $table, $condition, $single_variable, $options);
          }
        }
      }  
      $con->close();
      $query = remove_last_instance( $query, $options['condition'] );
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

  // Build an insertion query
  //    PARAMETERS 
  //      $table: name of the table
  //      $insertions: array of values to insert, where keys are column names, and values are variables to be added
  public static function insert_query( $table, $insertions ) {
    $query   = sprintf( 'INSERT INTO %s ', $table );
    $columns = '(';
    $values  = '(';
    $con     = (new Database_Interface)->connect();
    foreach( $insertions as $column => $value ) {
      $c_column = Database_Interface::clean_variable( $con, $column );
      $c_value  = Database_Interface::clean_variable( $con, $value );
      $columns  .= sprintf('%s, ', $c_column);
      $values   .= sprintf("'%s', ", $c_value);
    }
    $con->close();
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
    $con     = (new Database_Interface)->connect();
    $query   = sprintf( 'UPDATE %s SET ', $table );
    foreach( $insertions as $column => $value ) {
      $c_column = Database_Interface::clean_variable( $con, $column );
      $c_value  = Database_Interface::clean_variable( $con, $value );
      $query    .= sprintf( '%s=\'%s\', ', $c_column, $c_value );
    }
    // remove trailing ',' for columns, values
    $last_comma = strrpos( $query, ',' );
    $query      = substr_replace( $query, '', $last_comma );

    // Need to check if there are any conditions to add
    if( is_array( $conditions ) ) {
      $query .= ' WHERE ';
      foreach( $conditions as $column => $value ) {
        $c_column = Database_Interface::clean_variable( $con, $column );
        $c_value  = Database_Interface::clean_variable( $con, $value );
        $query .= sprintf( '%s=\'%s\' AND ', $c_column, $c_value );
      }
      $con->close();
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
    $con   = (new Database_Interface)->connect();
    $query = sprintf( 'DELETE FROM %s WHERE ', $table );
    foreach( $conditions as $column => $variable ) {
      $c_column    = Database_Interface::clean_variable( $con, $column );
      $c_value     = '';
      $c_condition = '=';
      if( 'array' == gettype( $variable )) {
        $c_value     = Database_Interface::clean_variable( $con, $variable['value'] );
        $c_condition = Database_Interface::clean_variable( $con, $variable['condition'] );
      } else {
        $c_value = Database_Interface::clean_variable( $con, $variable );
      }
      $query .= sprintf( '%s.%s %s "%s" AND ', $table, $c_column, $c_condition, $c_value );
    }
    $con->close();
    // We need to remove the last AND (since there's nothing after it)
    $last_and = strrpos( $query, 'AND' );
    $query    = substr_replace( $query, '', $last_and );
    return $query;
  } 

  // Build a conditional
  public static function build_condition($con, $table, $column, $variable, $options) {
    $c_column   = Database_Interface::clean_variable( $con, $column );
    $c_variable = Database_Interface::clean_variable( $con, $variable );
    return sprintf( '%s="%s" %s ', $c_column, $c_variable, $options['condition'] );
  }
}