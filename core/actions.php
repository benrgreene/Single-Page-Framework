<?php

// Load all the base scripts into the page
function load_base_scripts() {
  add_action( 'scripts', function() {
    $url = get_site_base_url();
    ob_start(); ?>
      <script type="text/javascript" src="<?php echo $url; ?>assets/index.build.js"></script>
    <?php echo ob_get_clean();
  });
}

