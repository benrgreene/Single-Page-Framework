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
define( 'PAGE_SIZE', 4 );
// Secret key for the API. YOU SHOULD CHANGE THIS!!!!!
define( 'SECRET_KEY', 'NFENCSUA(C9dNCW-@992>M' );
// Database server
define( 'DB_SERVER', 'localhost' );
// Database name
define( 'DB_NAME', 'spa_db' );
// Database user name
define( 'DB_USERNAME', 'root' );
// Database user password
define( 'DB_PASSWORD', 'root' );

/**
 * ------------------------------------------------
 * Database Schema (DON'T EDIT)
 * ------------------------------------------------
 */
// Database version
define( 'DB_VERSION', 7 );
// Schema
define( 'DB_SCHEMA', array(
  'users' => array(
    'email'    => 'varchar(60)',
    'name'     => 'varchar(60)',
    'password' => 'varchar(255)',
    'level'    => 'varchar(20)'
  ),
  'posts' => array(
    'slug'      => 'varchar(60)',
    'type'      => 'varchar(60)',
    'title'     => 'varchar(60)',
    'author'    => 'varchar(60)',
    'excerpt'   => 'longtext',
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
    'value' => 'longtext',
  ),
  'tokens'  => array(
    'token'      => 'varchar(60)',
    'expiration' => 'datetime',
  ),
  'theme_options' => array(
    'name'  => 'varchar(60)',
    'value' => 'longtext',
  ),
  'uploads' => array(
    'name'  => 'varchar(60)',
  ),
  'related_upload' => array(
    'post_id'   => 'bigint(20)',
    'upload_id' => 'bigint(20)',
  )
) );