"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailerMailAdapter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7aa6ce92cb04ca",
        pass: "ee687bb42bb22d"
    }
});
class NodeMailerMailAdapter {
    async sendMail(data) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Lucas Eduardo <lucaraz133@gmail.com>',
            subject: data.subject,
            html: data.body
        });
    }
}
exports.NodeMailerMailAdapter = NodeMailerMailAdapter;
