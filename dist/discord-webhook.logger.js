"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordWebhookLogger = void 0;
const common_1 = require("@nestjs/common");
const builders_1 = require("@discordjs/builders");
const axios_1 = require("axios");
const DEFAULT_COLORS = {
    log: 0x00ff00,
    warn: 0xffff00,
    error: 0xff0000,
    debug: 0xff00ff,
};
class DiscordWebhookLogger {
    webhookUrl;
    webhookUsername;
    webhookAvatarUrl;
    defaultColors;
    logger = new common_1.Logger("DiscordWebhookLogger");
    constructor(webhookUrl, webhookUsername, webhookAvatarUrl, defaultColors = {}) {
        this.webhookUrl = webhookUrl;
        this.webhookUsername = webhookUsername;
        this.webhookAvatarUrl = webhookAvatarUrl;
        this.defaultColors = defaultColors;
        if (!webhookUrl)
            throw new Error("Webhook URL is required");
        this.defaultColors = { ...DEFAULT_COLORS, ...defaultColors };
    }
    async post(webhookUrl, embed) {
        try {
            await axios_1.default.post(webhookUrl, {
                username: this.webhookUsername,
                avatar_url: this.webhookAvatarUrl,
                embeds: [embed],
            });
            console.log("Successfully sent message to Discord");
            this.logger.debug(`Successfully sent message to ${webhookUrl}`);
        }
        catch (e) {
            console.error(`Error sending message to Discord: ${e}`);
            this.logger.log(`Error posting to webhook: ${e}`);
        }
    }
    build(message, options) {
        const embed = new builders_1.EmbedBuilder();
        embed.setDescription(message);
        if (options.fields)
            embed.setFields(options.fields);
        if (options.author)
            embed.setAuthor(options.author);
        if (options.color)
            embed.setColor(options.color);
        if (options.description)
            embed.setDescription(options.description);
        if (options.footer)
            embed.setFooter(options.footer);
        if (options.image)
            embed.setImage(options.image);
        if (options.thumbnail)
            embed.setThumbnail(options.thumbnail);
        if (options.timestamp) {
            if (options.timestamp === true)
                embed.setTimestamp();
            else
                embed.setTimestamp(options.timestamp);
        }
        if (options.title)
            embed.setTitle(options.title);
        if (options.url)
            embed.setURL(options.url);
        return embed.toJSON();
    }
    log(message, options = {}) {
        return this.post(this.webhookUrl, this.build(message, {
            color: this.defaultColors.log,
            timestamp: true,
            ...options,
        }));
    }
    error(message, options = {}) {
        return this.post(this.webhookUrl, this.build(message, {
            color: this.defaultColors.error,
            timestamp: true,
            ...options,
        }));
    }
    warn(message, options = {}) {
        return this.post(this.webhookUrl, this.build(message, {
            color: this.defaultColors.warn,
            timestamp: true,
            ...options,
        }));
    }
    debug(message, options = {}) {
        return this.post(this.webhookUrl, this.build(message, {
            color: this.defaultColors.debug,
            timestamp: true,
            ...options,
        }));
    }
}
exports.DiscordWebhookLogger = DiscordWebhookLogger;
//# sourceMappingURL=discord-webhook.logger.js.map