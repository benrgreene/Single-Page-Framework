<?php

// This will take in new post data, and if the auth token is valid, save the post data
API_Register::get_instance()->add_endpoint( 'post/newPost', 'api_save_post' );
function api_save_post( $data ) {

}