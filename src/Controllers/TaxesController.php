<?php
namespace Bookster_Tax\Controllers;

use Bookster\Controllers\BaseRestController;
use Bookster\Features\Auth\RestAuth;
use Bookster_Tax\Utils\SingletonTrait;
use Bookster_Tax\Services\TaxesService;

/**
 * TaxesController
 *
 * @method static TaxesController get_instance()
 */
class TaxesController extends BaseRestController {
    use SingletonTrait;

    /** @var TaxesService */
    private $taxes_service;

    protected function __construct() {
        $this->taxes_service = TaxesService::get_instance();
        $this->init_hooks();
    }

    protected function init_hooks() {
        register_rest_route(
            self::REST_NAMESPACE,
            '/settings/taxes',
            [
                [
                    'methods'             => 'PATCH',
                    'callback'            => [ $this, 'exec_patch_taxes_settings' ],
                    'permission_callback' => [ RestAuth::class, 'require_manage_shop_settings_cap' ],
                ],
            ]
        );
    }

    public function patch_taxes_settings( \WP_REST_Request $request ) {
        $payload = $request->get_json_params();
        $this->taxes_service->patch_settings( $payload );
    }

    public function exec_patch_taxes_settings( $request ) {
        return $this->exec_write( [ $this, 'patch_taxes_settings' ], $request );
    }
}
