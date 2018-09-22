<?php

// run the setup proccess for the site
function setup_site( $base_path ) {
  $ht_installer = new Htaccess_Installer( $base_path );
  if( $ht_installer->should_istalll() ) {
    $ht_installer->install();
  }

  $db_installer = new Database_Installer();
}
