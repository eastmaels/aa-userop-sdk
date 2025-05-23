"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateUserOperationGas = void 0;
const utils_1 = require("../../utils");
const estimateUserOperationGas = (provider) => (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (ctx.paymasterOptions["type"] != "none" ||
        ctx.paymasterOptions["simulatedOnly"]) {
        return;
    }
    const params = ctx.stateOverrides !== undefined
        ? [(0, utils_1.OpToJSON)(ctx.op), ctx.entryPoint, ctx.stateOverrides]
        : [(0, utils_1.OpToJSON)(ctx.op), ctx.entryPoint];
    const est = (yield provider.send("eth_estimateUserOperationGas", params));
    ctx.op.preVerificationGas = est.preVerificationGas;
    ctx.op.verificationGasLimit =
        (_a = est.verificationGasLimit) !== null && _a !== void 0 ? _a : est.verificationGas;
    ctx.op.callGasLimit = est.callGasLimit;
});
exports.estimateUserOperationGas = estimateUserOperationGas;
