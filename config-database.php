<?php

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