<?php

// for localhost.
add_action( 'wp_authorize_application_password_request_errors', function ( WP_Error $error, $request ) {
  $host = wp_parse_url( $request['success_url'], PHP_URL_HOST );
  if ( $host === 'localhost' ) {
    $error->remove( 'invalid_redirect_scheme' );
  }
}, 10, 2 );

add_action( 'template_redirect', function () {
  /**
   * @var WP_Query;
   */
  global $wp_query;
  if ( $wp_query->is_preview ) {
    if ( get_queried_object()->post_type === 'page' ) {
      wp_redirect( 'http://localhost:3000/page/preview/' . get_queried_object_id() );
    } else {
      wp_redirect( 'http://localhost:3000/archives/preview/' . get_queried_object_id() );
    }
  }
} );
