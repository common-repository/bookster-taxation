<?php
namespace Bookster_Tax\Services;

use Bookster\Services\BaseService;
use Bookster_Tax\Utils\SingletonTrait;

/**
 * TaxesService
 *
 * @method static TaxesService get_instance()
 */
class TaxesService extends BaseService {
    use SingletonTrait;

    public const SETTINGS_TAXES_OPTION = 'bookster_tax_settings';

    public function patch_settings( $settings ) {
        update_option( self::SETTINGS_TAXES_OPTION, $settings );
    }

    public function get_settings() {
        return get_option( self::SETTINGS_TAXES_OPTION, [ 'taxes' => [] ] );
    }
}
