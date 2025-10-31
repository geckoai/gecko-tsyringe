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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./registry-base"], function (require, exports, registry_base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PostResolutionInterceptors = exports.PreResolutionInterceptors = void 0;
    registry_base_1 = __importDefault(registry_base_1);
    var PreResolutionInterceptors = (function (_super) {
        __extends(PreResolutionInterceptors, _super);
        function PreResolutionInterceptors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PreResolutionInterceptors;
    }(registry_base_1.default));
    exports.PreResolutionInterceptors = PreResolutionInterceptors;
    var PostResolutionInterceptors = (function (_super) {
        __extends(PostResolutionInterceptors, _super);
        function PostResolutionInterceptors() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return PostResolutionInterceptors;
    }(registry_base_1.default));
    exports.PostResolutionInterceptors = PostResolutionInterceptors;
    var Interceptors = (function () {
        function Interceptors() {
            this.preResolution = new PreResolutionInterceptors();
            this.postResolution = new PostResolutionInterceptors();
        }
        return Interceptors;
    }());
    exports.default = Interceptors;
});
