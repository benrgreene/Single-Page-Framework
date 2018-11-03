<?php

/**
 * ------------------------------------------------
 * Base site info (should be updated per site)
 * ------------------------------------------------
 */
// Base site info
define( 'SITE_TITLE', 'My Personal Site');
define( 'THEME_NAME', 'theme-default' );
// This is the number of posts per page
define( 'PAGE_SIZE', 10 );

// Secret key for the API. YOU SHOULD CHANGE THIS!!!!!
define( 'SECRET_KEY', 'NFENCSUA(C9dNCW-@992>M' );

/**
 * ------------------------------------------------
 * Database info (DON'T EDIT)
 * ------------------------------------------------
 */
// Database server
define( 'DB_SERVER', 'localhost' );
// Database name
define( 'DB_NAME', 'spa_db' );
// Database user name
define( 'DB_USERNAME', 'root' );
// Database user password
define( 'DB_PASSWORD', 'root' );
// Database version
define( 'DB_VERSION', '2' );
// Schema
define( 'DB_SCHEMA', array(
  'users' => array(
    'email'    => 'varchar(60)',
    'name'     => 'varchar(60)',
    'password' => 'varchar(255)',
    'level'    => 'varchar(20)'
  ),
  'posts' => array(
    'type'      => 'varchar(60)',
    'title'     => 'varchar(60)',
    'author'    => 'varchar(60)',
    'content'   => 'longtext',
    'published' => 'varchar(20)',
    'date'      => 'datetime',
  ),
  'post_meta' => array(
    'post_id' => 'bigint(20)',
    'content' => 'longtext',
  ),
  'options' => array(
    'name'  => 'varchar(20)',
    'value' => 'varchar(60)',
  ),
  'tokens'  => array(
    'token'      => 'varchar(60)',
    'expiration' => 'datetime',
  )
) );