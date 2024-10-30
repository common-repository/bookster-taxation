const global = "";
function getManagerData() {
  return window.booksterManagerData;
}
function getPublicData() {
  return window.booksterPublicData;
}
var _bookster_decimal = booksterModules.decimal;
var _bookster_utils = booksterModules.utils;
function makeTaxBlueprint(taxesSettings) {
  return {
    items: taxesSettings.taxes.filter((tax) => tax.enabled).map((tax) => ({
      id: _bookster_utils.genUniqueId(),
      title: tax.name,
      formula: [tax.formula, tax.operand],
      amount: _bookster_decimal.ZERO
    })),
    total: _bookster_decimal.ZERO
  };
}
export {
  _bookster_utils as _,
  getPublicData as a,
  getManagerData as g,
  makeTaxBlueprint as m
};
