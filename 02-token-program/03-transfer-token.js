var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var _a = require('@solana/web3.js'), clusterApiUrl = _a.clusterApiUrl, Connection = _a.Connection, Keypair = _a.Keypair, LAMPORTS_PER_SOL = _a.LAMPORTS_PER_SOL, PublicKey = _a.PublicKey;
var _b = require('@solana/spl-token'), createMint = _b.createMint, getOrCreateAssociatedTokenAccount = _b.getOrCreateAssociatedTokenAccount, mintTo = _b.mintTo, transfer = _b.transfer;
var base58 = require("bs58");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var connection, publickey, decoded, fromWallet, toWallet, mint, fromTokenAccount, toTokenAccount, signature;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
                publickey = new PublicKey("DPTmfmFH6nnzsae5Ny964rNDAyTsTty4URKzFhJRnoWB");
                decoded = base58.decode("iohHY9MYDFcVereGpsvFDyu6ipt4gKDQzgHUPPFrxi87x8X8EkJKazjzPYtibYLogkhRqen1kNNJWJvQHx31zn7");
                fromWallet = Keypair.fromSecretKey(decoded);
                toWallet = new PublicKey("Agd2hRTJmoQkS4y6QXXfr9RV2nWrPWkKWJ2EJ83Zczej");
                return [4 /*yield*/, createMint(connection, fromWallet, fromWallet.publicKey, null, 9)];
            case 1:
                mint = _a.sent();
                return [4 /*yield*/, getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, fromWallet.publicKey)];
            case 2:
                fromTokenAccount = _a.sent();
                return [4 /*yield*/, getOrCreateAssociatedTokenAccount(connection, fromWallet, mint, toWallet)];
            case 3:
                toTokenAccount = _a.sent();
                return [4 /*yield*/, mintTo(connection, fromWallet, mint, fromTokenAccount.address, fromWallet.publicKey, 100000000000)];
            case 4:
                signature = _a.sent();
                console.log('mint tx:', signature);
                return [4 /*yield*/, transfer(connection, fromWallet, fromTokenAccount.address, toTokenAccount.address, fromWallet.publicKey, 100)];
            case 5:
                // Transfer the new token to the "toTokenAccount" we just created
                signature = _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
