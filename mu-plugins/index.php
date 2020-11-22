<?php

add_action( 'wp_authorize_application_password_request_errors', function ( WP_Error $error, $request ) {
  $host = wp_parse_url( $request['success_url'], PHP_URL_HOST );
  if ( $host === 'localhost' ) {
    $error->remove( 'invalid_redirect_scheme' );
  }
}, 10, 2 );


add_action( 'send_headers', function () {
  if ( ! did_action( 'rest_api_init' ) && $_SERVER['REQUEST_METHOD'] == 'HEAD' ) {
    header( 'Access-Control-Allow-Origin: *' );
  }
} );


add_filter( 'preview_post_link', function ( $preview_link, WP_Post $post ) {

  if ( $post->post_type === 'post' ) {
    return 'http://localhost:3000/archives/preview/' . $post->ID;
  }

  return $preview_link;
}, 10, 2 );


add_action( 'template_redirect', function () {
  /**
   * @var WP_Query;
   */
  global $wp_query;
  if ( $wp_query->is_preview ) {
    wp_redirect( get_preview_post_link( $wp_query->get_queried_object() ) );
  }

} );
