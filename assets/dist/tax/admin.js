import { _ as _bookster_utils, g as getManagerData, a as getPublicData, m as makeTaxBlueprint } from "./taxDetails-b2c842b3.js";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var react = React;
const React$1 = /* @__PURE__ */ getDefaultExportFromCjs(react);
var _bookster_hooks = booksterModules.hooks;
var _bookster_antd = booksterModules.antd;
var _bookster_components = booksterModules.components;
var _bookster_icons = booksterModules.icons;
const INIT_TAX = {
  name: "New Tax",
  formula: "rate",
  operand: 4.99,
  enabled: true
};
function mergeTaxesSettings(taxesSettings) {
  Object.assign(window.booksterManagerData, { taxesSettings });
  Object.assign(window.booksterPublicData, { taxesSettings });
}
async function updateTaxesSettings(taxesSettings) {
  await _bookster_utils.api.patch("settings/taxes", { json: taxesSettings });
  mergeTaxesSettings(taxesSettings);
}
const description = /* @__PURE__ */ React$1.createElement(React$1.Fragment, null, /* @__PURE__ */ React$1.createElement("span", null, "You might need to Refresh the page to see the changes."), " ");
const action = /* @__PURE__ */ React$1.createElement("a", { onClick: () => window.location.reload() }, "Refresh Now");
const UPDATE_TAXES_TOAST = {
  title: /* @__PURE__ */ React$1.createElement(React$1.Fragment, null, /* @__PURE__ */ React$1.createElement(_bookster_icons.CheckCircle, { className: "bw-text-success" }), "Taxes Settings has been Saved Successfully!"),
  description,
  action
};
function DeleteTaxButton({ onDelete }) {
  return /* @__PURE__ */ React$1.createElement(_bookster_components.Popover, null, /* @__PURE__ */ React$1.createElement(_bookster_components.PopoverTrigger, { asChild: true, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React$1.createElement(_bookster_components.Button, { variant: "link", color: "error", size: "large", className: "bw-h-auto hover:bw-opacity-80" }, /* @__PURE__ */ React$1.createElement(_bookster_icons.MinusCircle, { className: "bw-h-5 bw-w-5" }))), /* @__PURE__ */ React$1.createElement(_bookster_components.PopoverPortal, null, /* @__PURE__ */ React$1.createElement(
    _bookster_components.PopoverContent,
    {
      align: "end",
      side: "bottom",
      className: "bw-text-sm",
      onClick: (e) => e.stopPropagation()
    },
    /* @__PURE__ */ React$1.createElement("div", { className: "bw-flex bw-items-center bw-gap-2" }, /* @__PURE__ */ React$1.createElement(_bookster_icons.Info, { className: "bw-h-5 bw-w-5 bw-fill-warning bw-text-base-bg1" }), "Are you sure you want to delete this tax?"),
    /* @__PURE__ */ React$1.createElement("div", { className: "bw-mt-3 bw-flex bw-flex-row bw-justify-end bw-gap-2" }, /* @__PURE__ */ React$1.createElement(_bookster_components.ReactPopover.Close, { asChild: true }, /* @__PURE__ */ React$1.createElement(_bookster_components.Button, { variant: "trivial", size: "small" }, "Cancel")), /* @__PURE__ */ React$1.createElement(_bookster_components.Button, { size: "small", color: "error", variant: "outline", onClick: () => onDelete() }, "Delete")),
    /* @__PURE__ */ React$1.createElement(_bookster_components.ReactPopover.Arrow, { fill: "white" })
  )));
}
function TaxCard({ name, uniqueKey, remove }) {
  const form = _bookster_antd.Form.useFormInstance();
  const _taxOption = _bookster_antd.Form.useWatch(["taxes", name], form);
  const __taxOption = form.getFieldValue(["taxes", name]);
  const taxOption = _taxOption || __taxOption;
  const { setNodeRef, attributes, listeners, transition, transform } = _bookster_utils.useSortable({
    id: `tax-${uniqueKey}`
  });
  const style = {
    transform: _bookster_utils.dndCSS.Transform.toString(transform ? { ...transform, scaleY: 1 } : transform),
    transition
  };
  return /* @__PURE__ */ React$1.createElement("div", { style, ref: setNodeRef }, /* @__PURE__ */ React$1.createElement(
    _bookster_components.ReactCollapsible.Root,
    {
      className: "bw-mb-4 bw-overflow-hidden bw-rounded-lg bw-border bw-border-solid bw-shadow-sm bw-transition-all hover:bw-shadow-md",
      defaultOpen: true
    },
    /* @__PURE__ */ React$1.createElement(_bookster_components.ReactCollapsible.Trigger, { asChild: true }, /* @__PURE__ */ React$1.createElement("div", { className: "bw-flex bw-cursor-pointer bw-flex-row bw-items-center bw-justify-between bw-gap-4 bw-border-b bw-border-solid bw-border-muted-foreground/10 bw-bg-base-bg2 bw-px-4 bw-py-3" }, /* @__PURE__ */ React$1.createElement("div", { className: "bw-flex bw-flex-grow bw-flex-row bw-items-center bw-gap-2" }, /* @__PURE__ */ React$1.createElement(
      _bookster_components.Button,
      {
        size: "icon",
        variant: "ghost",
        className: "bw-w-6 bw-cursor-grab bw-items-center",
        ...attributes,
        ...listeners
      },
      /* @__PURE__ */ React$1.createElement(_bookster_icons.GripVertical, null)
    ), /* @__PURE__ */ React$1.createElement("h3", { className: "bw-text-base bw-leading-none" }, taxOption.name, " ")), /* @__PURE__ */ React$1.createElement(
      _bookster_antd.Form.Item,
      {
        name: [name, "enabled"],
        valuePropName: "checked",
        trigger: "onCheckedChange",
        noStyle: true
      },
      /* @__PURE__ */ React$1.createElement(
        _bookster_components.Switch,
        {
          onClick: (e) => e.stopPropagation(),
          unCheckedChildren: "Disable",
          checkedChildren: "Enable"
        }
      )
    ), /* @__PURE__ */ React$1.createElement(DeleteTaxButton, { onDelete: () => remove(name) }))),
    /* @__PURE__ */ React$1.createElement(_bookster_components.CollapsibleContent, { forceMountWithAnimation: true }, /* @__PURE__ */ React$1.createElement("div", { className: "bw-grid bw-grid-cols-2 bw-gap-2 bw-bg-white bw-px-4 bw-py-2" }, /* @__PURE__ */ React$1.createElement(
      _bookster_antd.Form.Item,
      {
        className: "bw-mb-3",
        name: [name, "name"],
        rules: [{ required: true }],
        label: "Tax name"
      },
      /* @__PURE__ */ React$1.createElement(_bookster_components.Input, { className: "btr-tax-name-input", maxLength: 20 })
    ), /* @__PURE__ */ React$1.createElement(
      _bookster_antd.Form.Item,
      {
        className: "bw-mb-3",
        label: "Tax Formula",
        required: true,
        htmlFor: `tax-${name}-operand`
      },
      /* @__PURE__ */ React$1.createElement("div", { className: "bw-flex bw-gap-2" }, /* @__PURE__ */ React$1.createElement(
        _bookster_antd.Form.Item,
        {
          name: [name, "formula"],
          rules: [{ required: true, message: "Please select Formula!" }],
          trigger: "onValueChange",
          noStyle: true
        },
        /* @__PURE__ */ React$1.createElement(_bookster_components.Select, null, /* @__PURE__ */ React$1.createElement(_bookster_components.SelectTrigger, { className: "bw-grow bw-basis-1" }, /* @__PURE__ */ React$1.createElement(_bookster_components.SelectValue, null)), /* @__PURE__ */ React$1.createElement(_bookster_components.SelectContent, null, /* @__PURE__ */ React$1.createElement(_bookster_components.SelectGroup, null, /* @__PURE__ */ React$1.createElement(_bookster_components.SelectItem, { value: "rate" }, "Rate"), /* @__PURE__ */ React$1.createElement(_bookster_components.SelectItem, { value: "fixed" }, "Fixed"))))
      ), /* @__PURE__ */ React$1.createElement(
        _bookster_antd.Form.Item,
        {
          name: [name, "operand"],
          rules: [
            { required: true, message: "Please enter Formula Operand!" },
            {
              validator: (_, operand) => {
                if (operand === void 0) {
                  return Promise.resolve();
                }
                if (operand === 0) {
                  return Promise.reject("Operand must be greater than Zero");
                }
                return Promise.resolve();
              }
            }
          ],
          noStyle: true
        },
        /* @__PURE__ */ React$1.createElement(
          _bookster_antd.InputNumber,
          {
            id: `tax-${name}-operand`,
            precision: taxOption.formula === "rate" ? 2 : _bookster_utils.NUMBER_OF_DECIMALS,
            min: 0,
            step: 5,
            placeholder: "Operand",
            className: "bw-grow bw-basis-1",
            ...taxOption.formula === "rate" && { addonAfter: "%" },
            ...taxOption.formula === "fixed" && { addonAfter: _bookster_utils.CURRENCY_SYMBOL }
          }
        )
      ))
    )))
  ));
}
function TaxTabsContent() {
  const [isLoading, setIsLoading] = react.useState(false);
  const [form] = _bookster_antd.Form.useForm();
  const taxes = _bookster_antd.Form.useWatch(["taxes"], form);
  const initialValues = getManagerData().taxesSettings || { taxes: [] };
  const { toast } = _bookster_components.useToast();
  const focusRef = react.useRef(void 0);
  react.useEffect(() => {
    if (focusRef.current) {
      const inputs = document.getElementsByClassName("btr-tax-name-input");
      if (inputs.length > 0) {
        const input = inputs.item(inputs.length - 1);
        if (input instanceof HTMLInputElement) {
          input.focus();
        }
        focusRef.current = void 0;
      }
    }
  }, [taxes]);
  async function onFinish(taxesSettings) {
    try {
      setIsLoading(true);
      await updateTaxesSettings(taxesSettings);
      toast.openToast(UPDATE_TAXES_TOAST);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  }
  const sensors = _bookster_utils.useSensors(_bookster_utils.useSensor(_bookster_utils.PointerSensor));
  return /* @__PURE__ */ React$1.createElement(_bookster_components.TabsContent, { value: "tax", className: "bw-mx-auto bw-max-w-screen-md", forceMount: false }, /* @__PURE__ */ React$1.createElement(_bookster_antd.Form, { layout: "vertical", onFinish, initialValues, form }, /* @__PURE__ */ React$1.createElement(_bookster_components.SectionSeparator.Title, null, "Tax Settings"), /* @__PURE__ */ React$1.createElement(_bookster_antd.Form.List, { name: "taxes" }, (fields, { add, remove, move }, { errors }) => /* @__PURE__ */ React$1.createElement(
    _bookster_utils.DndContext,
    {
      sensors,
      onDragEnd: ({ active, over }) => {
        if (over && active.id !== over.id) {
          const oldIndex = fields.findIndex((f) => `tax-${f.key}` === active.id);
          const newIndex = fields.findIndex((f) => `tax-${f.key}` === over.id);
          move(oldIndex, newIndex);
        }
      }
    },
    /* @__PURE__ */ React$1.createElement(
      _bookster_utils.SortableContext,
      {
        items: fields.map((f) => `tax-${f.key}`),
        strategy: _bookster_utils.verticalListSortingStrategy
      },
      fields.map(({ key, name }) => /* @__PURE__ */ React$1.createElement(TaxCard, { key, name, uniqueKey: key, remove }))
    ),
    /* @__PURE__ */ React$1.createElement(
      _bookster_components.Button,
      {
        variant: "outline",
        size: "large",
        className: "bw-mb-2 bw-w-full bw-border-dashed bw-py-4 bw-text-primary hover:bw-shadow-md",
        onClick: () => {
          add(INIT_TAX);
          focusRef.current = "btr-tax-name-input";
        }
      },
      /* @__PURE__ */ React$1.createElement(_bookster_icons.Plus, { className: "bw-h-5 bw-w-5" }),
      " Add new tax"
    ),
    /* @__PURE__ */ React$1.createElement(_bookster_antd.Form.ErrorList, { errors })
  )), /* @__PURE__ */ React$1.createElement(_bookster_components.Separator, { className: "bw-my-6" }), /* @__PURE__ */ React$1.createElement("div", { className: "bw-flex" }, /* @__PURE__ */ React$1.createElement(
    _bookster_components.LoadingButton,
    {
      loading: isLoading,
      disabled: isLoading,
      className: "bw-ms-auto bw-px-6",
      type: "submit"
    },
    "Save Changes"
  ))));
}
function TaxTabsTrigger(props) {
  return /* @__PURE__ */ React$1.createElement(_bookster_components.CardTabsTrigger, { className: "bw-inline-flex bw-items-center bw-gap-1", ...props }, /* @__PURE__ */ React$1.createElement(_bookster_icons.HandCoins, { strokeWidth: 1.75, size: "1rem" }), "Tax");
}
function loadTaxSettings() {
  _bookster_hooks.booksterHooks.addFilter(_bookster_hooks.HOOK_NAMES.settings.TabsTrigger, "bookster-tax", addTabsTrigger);
  _bookster_hooks.booksterHooks.addFilter(_bookster_hooks.HOOK_NAMES.settings.TabsContent, "bookster-tax", addTabsContent);
  addTaxDetails();
  addTaxManagerMenu();
}
function addTabsTrigger(tabsTrigger, onTabChange) {
  return [
    ...tabsTrigger,
    /* @__PURE__ */ React$1.createElement(TaxTabsTrigger, { key: "tax", value: "tax", onClick: () => onTabChange("tax") })
  ];
}
function addTabsContent(tabsContent) {
  return [...tabsContent, /* @__PURE__ */ React$1.createElement(TaxTabsContent, { key: "tax" })];
}
function addTaxDetails() {
  _bookster_hooks.booksterHooks.addFilter(
    _bookster_hooks.HOOK_NAMES.adminApptForm.detailsInitBlueprint,
    "bookster-tax",
    (initDetails) => {
      const taxesSettings = getPublicData().taxesSettings || { taxes: [] };
      const tax = makeTaxBlueprint(taxesSettings);
      return { ...initDetails, tax };
    }
  );
}
function addTaxManagerMenu() {
  _bookster_hooks.booksterHooks.addFilter(
    _bookster_hooks.HOOK_NAMES.layout.managerMenuItems,
    "bookster-tax",
    (menuItems, _, navigate) => {
      const groupAdmin = menuItems.find((item) => item.key === "administration");
      if (!groupAdmin || !groupAdmin.children)
        return menuItems;
      const menuSettings = groupAdmin.children.find((item) => item.key === "settings");
      if (!menuSettings || !menuSettings.children)
        return menuItems;
      menuSettings.children.push({
        key: "settings-tax",
        label: "Tax",
        onClick: () => {
          navigate("/settings/tax");
        }
      });
      return menuItems;
    }
  );
}
function loadScript() {
  loadTaxSettings();
}
loadScript();
