<?php
namespace Bookster_Tax\Engine;

use Bookster_Tax\Utils\SingletonTrait;
use Bookster\Features\Utils\Decimal;
use Bookster\Features\Booking\Details;
use Bookster\Features\Booking\Details\TaxItem;
use Bookster\Features\Booking\Details\Formula;
use Bookster\Features\Utils\RandomUtils;
use Bookster_Tax\Services\TaxesService;

/**
 * Tax Logic
 *
 * @method static TaxLogic get_instance()
 */
class TaxLogic {
    use SingletonTrait;

    private $taxes_service;

    protected function __construct() {
        $this->taxes_service = TaxesService::get_instance();

        add_filter( 'bookster_make_booking_details', [ $this, 'add_booking_tax' ], 10, 1 );
    }

    /**
     * @param Details $blueprint
     *
     * @return Details
     */
    public function add_booking_tax( $blueprint ) {
        $taxes_settings = $this->taxes_service->get_settings();
        $taxes          = [];
        foreach ( $taxes_settings['taxes'] as $tax ) {
            if ( $tax['enabled'] ) {
                $taxes[] = $tax;
            }
        }

        if ( empty( $taxes ) ) {
            return $blueprint;
        }

        $blueprint->tax->items = array_map(
            function( array $tax ) {
                return new TaxItem(
                    RandomUtils::gen_unique_id(),
                    $tax['name'],
                    new Formula( $tax['formula'], $tax['operand'] ),
                    Decimal::zero()
                );
            },
            $taxes
        );

        return $blueprint;
    }
}
