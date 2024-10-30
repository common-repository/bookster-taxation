<?php
namespace Bookster_Tax;

use Bookster_Tax\Utils\SingletonTrait;
use Bookster\Features\Enums\AddonStatusEnum;

/** Bookster Tax Initialize */
class Initialize {
    use SingletonTrait;

    /** The Constructor that load the engine classes */
    protected function __construct() {
        \Bookster_Tax\Engine\ActDeact::get_instance();
        \Bookster_Tax\Engine\Enqueue::get_instance();
        \Bookster_Tax\Engine\RestAPI::get_instance();

        \Bookster_Tax\Engine\TaxLogic::get_instance();
        \Bookster_Tax\Engine\TaxSettings::get_instance();

        add_filter( 'bookster_addon_infos', [ $this, 'add_activated_addons' ] );
    }

    public function add_activated_addons( $addon_infos ) {
        $addon_infos = array_map(
            function( $addon_info ) {
                if ( 'bookster-tax' === $addon_info['slug'] ) {
                    $addon_info['installStatus']  = AddonStatusEnum::ACTIVATED;
                    $addon_info['currentVersion'] = BOOKSTER_TAX_VERSION;
                }
                return $addon_info;
            },
            $addon_infos
        );

        return $addon_infos;
    }
}
