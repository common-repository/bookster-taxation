import { a as getPublicData, m as makeTaxBlueprint } from "./taxDetails-b2c842b3.js";
var _bookster_booking = booksterModules.booking;
function loadTaxBookingForm() {
  addBookingTaxDetails();
}
function addBookingTaxDetails() {
  _bookster_booking.extendBlueprintBooking("bookster-tax", (blueprint) => {
    const taxesSettings = getPublicData().taxesSettings || { taxes: [] };
    const taxBlueprint = makeTaxBlueprint(taxesSettings);
    return { ...blueprint, tax: taxBlueprint };
  });
}
function loadScript() {
  loadTaxBookingForm();
}
loadScript();
