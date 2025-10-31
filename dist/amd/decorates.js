var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "@geckoai/class-mirror"], function (require, exports, class_mirror_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LifecycleDecorate = exports.ModuleDecorate = void 0;
    var ModuleDecorate = (function (_super) {
        __extends(ModuleDecorate, _super);
        function ModuleDecorate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ModuleDecorate;
    }(class_mirror_1.ClassDecorate));
    exports.ModuleDecorate = ModuleDecorate;
    var LifecycleDecorate = (function (_super) {
        __extends(LifecycleDecorate, _super);
        function LifecycleDecorate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return LifecycleDecorate;
    }(class_mirror_1.ClassDecorate));
    exports.LifecycleDecorate = LifecycleDecorate;
});
