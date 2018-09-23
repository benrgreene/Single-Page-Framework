<?php 

/**
 * Adds a system for users to be able to include 
 */
class Actions {
  
  protected static $instance;
  // The actions to be displayed
  public $actions = array();
  
  public static function get_instance() {
    if( self::$instance === null ) {
      self::$instance = new Actions();
    }
    return self::$instance;
  }
  
  private function __construct() { }

  public function set_base_path( $base_dir ) {
    $this->base_dir = $base_dir;
  }

  // Add a action to be displayed
  public function add_action( $action, $callback ) {
    if( !isset( $this->actions[$action] ) ) {
      $this->actions[$action] = array();
    }
    $this->actions[$action][] = $callback;
  }

  // perform action callbacks
  public function display_actions( $action ) {
    // If there aren't any callbacks with an action, peace out
    if( ! isset( $this->actions[$action] ) ) {
      return;
    }
    $callbacks = $this->actions[$action];
    foreach( $callbacks as $callback ) {
      $callback();
    }
  }
}

// shortcut helper for getting action parts
function get_action_parts( $action ) {
  $helper = Actions::get_instance();
  $helper->display_actions( $action );
}

// shortcut helper for adding a action part
function add_action( $action, $callback ) {
  $helper = Actions::get_instance();
  $helper->add_action( $action, $callback );
}