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
  public function add_action( $action, $callback, $priority=10 ) {
    if( !isset( $this->actions[$action] ) ) {
      $this->actions[$action] = array();
    }
    $this->actions[$action][] = array(
      'callback' => $callback,
      'priority' => $priority
    );
  }

  // perform action callbacks
  public function display_actions( $action, $to_return='' ) {
    // If there aren't any callbacks with an action, peace out
    if( ! isset( $this->actions[$action] ) ) {
      return;
    }
    $callbacks = $this->actions[$action];
    usort( $callbacks, array( $this, 'sort_callbacks' ) );
    foreach( $callbacks as $callback ) {
      $to_return = $callback['callback']($to_return);
    }
    return $to_return;
  }

  // callback for sorting callbacks
  public function sort_callbacks( $a, $b ) {
    return $a['priority'] - $b['priority'];
  }
}

// shortcut helper for getting action parts
function get_action_parts( $action ) {
  $helper = Actions::get_instance();
  return $helper->display_actions( $action );
}
// need a better name for adding filters
function filter( $action, $default=false ) {
  $helper = Actions::get_instance();
  return $helper->display_actions( $action, $default );
}

// shortcut helper for adding a action part
function add_filter( $action, $callback, $priority=10 ) {
  $helper = Actions::get_instance();
  $helper->add_action( $action, $callback, $priority );
}
function add_action( $action, $callback, $priority=10 ) {
  $helper = Actions::get_instance();
  $helper->add_action( $action, $callback, $priority );
}