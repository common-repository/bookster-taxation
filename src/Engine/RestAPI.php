<?php
namespace Bookster_Tax\Engine;

use Bookster_Tax\Controllers\TaxesController;
use Bookster_Tax\Utils\SingletonTrait;

/**
 * RestAPI
 */
class RestAPI {
    use SingletonTrait;

    protected function __construct() {
        add_action( 'rest_api_init', [ $this, 'add_tax_endpoint' ] );
    }

    public function add_tax_endpoint() {
        TaxesController::get_instance();
    }
}
