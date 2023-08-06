<?php
/**
 * Plugin Name:       [Hart] Custom Showcase Block
 * Description:       A customized lightweight and flexible showcase block.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Hart Pableo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hart-showcase-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_hart_showcase_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_hart_showcase_block_block_init' );

/**
 * Custom Image Sizes
 */
function hp_add_image_sizes() {
	if ( ! current_theme_supports( 'post-thumbnails' ) ) {
		add_theme_support( 'post-thumbnails' );
	}
  add_image_size('showcase_block_bg_tablet', 1000, 600, true);
	add_image_size('showcase_block_bg_mobile', 600, 450, true);
}
add_action( 'after_setup_theme', 'hp_add_image_sizes' );

function hp_custom_sizes( $sizes ) {
  return array_merge( $sizes, array(
    'showcase_block_bg_tablet' => 'Showcase Background Image: Tablet',
    'showcase_block_bg_mobile' => 'Showcase Background Image: Mobile',
  ) );
}
add_filter( 'image_size_names_choose', 'hp_custom_sizes' );