<?php

class Htaccess_Installer {

  public $base_template = "
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase base_url
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule (.*) base_urlindex.php?request=$1 [L]
</IfModule>
Options All -Indexes";

  public function __construct( $base_dir ) {
    $this->base_url      = $_SERVER['REQUEST_URI'];
    $this->base_dir      = $base_dir . '/';
    $this->htaccess_file = $this->base_dir . '.htaccess';
  }

  // Checks that the .htaccess file is present
  public function should_istalll() {
    if( file_exists( $this->htaccess_file) ) {
      return false;
    }
    return true;
  }

  // install the .htaccess file
  public function install() {
    // Modify the base template to what we need
    $to_write = trim( $this->base_template );
    $to_write = str_replace( 'base_url', $this->base_url, $to_write );
    $to_write = str_replace( "\t", "", $to_write );
    // write the file
    $file = fopen( $this->htaccess_file, 'w' );
    fwrite( $file, $to_write );
    fclose( $file );
  }
}