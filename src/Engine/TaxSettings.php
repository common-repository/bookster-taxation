<?php
namespace Bookster_Tax\Engine;

use Bookster_Tax\Utils\SingletonTrait;
use Bookster_Tax\Services\TaxesService;
use Bookster\Engine\BEPages\ManagerPage;
use Bookster\Features\Auth\Caps;

/**
 * Handle Settings hooks for TaxSettings
 */
class TaxSettings {
    use SingletonTrait;

    private $taxes_service;

    protected function __construct() {
        $this->taxes_service = TaxesService::get_instance();

        add_filter( 'bookster_public_data', [ $this, 'add_tax_public' ], 10, 1 );
        add_filter( 'bookster_manager_data', [ $this, 'add_tax_manager' ], 10, 1 );

        if ( current_user_can( Caps::MANAGE_SHOP_RECORDS_CAP ) ) {
            add_filter( 'plugin_action_links_' . plugin_basename( BOOKSTER_TAX_PLUGIN_FILE ), [ $this, 'add_action_links' ] );
        }
    }

    public function add_tax_public( $public_data ) {
        $public_data['taxesSettings'] = $this->taxes_service->get_settings();
        return $public_data;
    }

    public function add_tax_manager( $manager_data ) {
        $manager_data['taxesSettings'] = $this->taxes_service->get_settings();
        return $manager_data;
    }

    public function add_action_links( array $links ) {
        return array_merge(
            [
                'manage' => '<a href="' . admin_url( 'admin.php?page=' . ManagerPage::MENU_SLUG . '#/settings/tax' ) . '">' . __( 'Settings', 'bookster-tax' ) . '</a>',
            ],
            $links
        );
    }
}
