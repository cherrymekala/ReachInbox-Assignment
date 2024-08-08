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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processOutlookEmails = exports.processGmailEmails = void 0;
const gmailAuth_1 = __importDefault(require("./auth/gmailAuth"));
const outlookAuth_1 = __importDefault(require("./auth/outlookAuth"));
const openai_1 = require("./utils/openai");
function processGmailEmails() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield gmailAuth_1.default.users.messages.list({ userId: 'me', maxResults: 5 });
        const messages = res.data.messages || [];
        for (const message of messages) {
            const msg = yield gmailAuth_1.default.users.messages.get({ userId: 'me', id: message.id });
            const emailBody = Buffer.from(((_b = (_a = msg.data.payload) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.data) || '', 'base64').toString('utf-8');
            const category = yield (0, openai_1.analyzeEmailContent)(emailBody);
            console.log(`Gmail Message ID: ${message.id}, Category: ${category}`);
            // Generate and send reply based on category
        }
    });
}
exports.processGmailEmails = processGmailEmails;
function processOutlookEmails() {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = yield outlookAuth_1.default.api('/me/messages').top(5).get();
        for (const message of messages.value) {
            const category = yield (0, openai_1.analyzeEmailContent)(message.body.content);
            console.log(`Outlook Message ID: ${message.id}, Category: ${category}`);
            // Generate and send reply based on category
        }
    });
}
exports.processOutlookEmails = processOutlookEmails;
