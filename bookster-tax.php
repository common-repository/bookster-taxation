<?php
/**
 * Bookster Tax
 *
 * @package             Bookster_Tax
 * @author              WPBookster
 * @copyright           Copyright 2023-2024, Bookster
 *
 * @wordpress-plugin
 * Plugin Name:         Bookster Tax
 * Plugin URI:          https://wpbookster.com/
 * Requires Plugins:    bookster
 * Description:         Official Bookster Tax addon - Add tax to your Bookings.
 * Version:             2.0.0
 * Requires at least:   6.2
 * Requires PHP:        7.4
 * Author:              WPBookster
 * Author URI:          https://wpbookster.com/about
 * Text Domain:         bookster-tax
 */

if ( ! defined( 'ABSPATH' ) ) {
    die( 'We\'re sorry, but you can not directly access this file.' );
}

define( 'BOOKSTER_TAX_VERSION', '2.0.0' );

define( 'BOOKSTER_TAX_PLUGIN_FILE', __FILE__ );
define( 'BOOKSTER_TAX_PLUGIN_PATH', plugin_dir_path( BOOKSTER_TAX_PLUGIN_FILE ) );
define( 'BOOKSTER_TAX_PLUGIN_URL', plugin_dir_url( BOOKSTER_TAX_PLUGIN_FILE ) );
define( 'BOOKSTER_TAX_PLUGIN_BASENAME', plugin_basename( BOOKSTER_TAX_PLUGIN_FILE ) );

add_action(
    'init',
    function() {
        load_plugin_textdomain( 'bookster-tax', false, dirname( BOOKSTER_TAX_PLUGIN_BASENAME ) . '/languages' );
    }
);

function bookster_tax_activate( bool $network_wide ) {
    if ( class_exists( '\Bookster_Tax\Engine\ActDeact' ) ) {
        \Bookster_Tax\Engine\ActDeact::activate( $network_wide );
    }
}
function bookster_tax_deactivate( bool $network_wide ) {
    if ( class_exists( '\Bookster_Tax\Engine\ActDeact' ) ) {
        \Bookster_Tax\Engine\ActDeact::deactivate( $network_wide );
    }
}
function bookster_tax_uninstall() {
    if ( class_exists( '\Bookster_Tax\Engine\ActDeact' ) ) {
        \Bookster_Tax\Engine\ActDeact::uninstall();
    }
}
register_activation_hook( BOOKSTER_TAX_PLUGIN_FILE, 'bookster_tax_activate' );
register_deactivation_hook( BOOKSTER_TAX_PLUGIN_FILE, 'bookster_tax_deactivate' );
register_uninstall_hook( BOOKSTER_TAX_PLUGIN_FILE, 'bookster_tax_uninstall' );

require_once BOOKSTER_TAX_PLUGIN_PATH . 'vendor/autoload.php';
if ( ! wp_installing() ) {
    add_action(
        'plugins_loaded',
        function () {
            /** Require Dependencies: (min.any < ver < max.any) => OK */
            $max_bookster_version = '3.0';
            $min_bookster_version = '2.0';

            if ( ! defined( 'BOOKSTER_VERSION' ) ) {
                add_action(
                    'admin_notices',
                    function() {
                        echo wp_kses_post(
                            sprintf(
                                '<div class="notice notice-error"><p>%s</p></div>',
                                __( '"Bookster - Tax" requires Bookster plugin installed and activated.', 'bookster-tax' )
                            )
                        );
                    }
                );

                return;
            }

            if ( ! version_compare( $min_bookster_version . '.any', BOOKSTER_VERSION, '<' ) ) {
                add_action(
                    'admin_notices',
                    function() use ( $min_bookster_version ) {
                        $notice = sprintf(
                            /* translators: %1$s - Bookster Tax Version. %2$s - Minimum Supporting Bookster Version */
                            __( '"Bookster - Tax %1$s" requires Bookster version %2$s. Please update Bookster plugin!', 'bookster-tax' ),
                            BOOKSTER_TAX_VERSION,
                            $min_bookster_version
                        );

                        echo wp_kses_post(
                            sprintf(
                                '<div class="notice notice-error"><p>%s</p></div>',
                                $notice
                            )
                        );
                    }
                );

                return;
            }//end if

            if ( ! version_compare( BOOKSTER_VERSION, $max_bookster_version . '.any', '<' ) ) {
                add_action(
                    'admin_notices',
                    function() {
                        $notice = sprintf(
                            /* translators: %s - Bookster Version */
                            __( '"Bookster %s" requires new addon version. Please update Bookster Tax!', 'bookster-tax' ),
                            BOOKSTER_VERSION
                        );

                        echo wp_kses_post(
                            sprintf(
                                '<div class="notice notice-error"><p>%s</p></div>',
                                $notice
                            )
                        );
                    }
                );

                return;
            }//end if

            // Make sure Bookster classes loaded.
            if ( class_exists( '\Bookster\Initialize' ) ) {
                \Bookster_Tax\Initialize::get_instance();
            }
        }
    );
}//end if
