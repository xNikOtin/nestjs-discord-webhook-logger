import { LoggerService } from "@nestjs/common";
import { EmbedBuilder } from "@discordjs/builders";
import type { EmbedAuthorOptions, EmbedFooterOptions, RGBTuple } from "@discordjs/builders";
declare type APIEmbed = ReturnType<EmbedBuilder["toJSON"]>;
export declare type EmbedColor = number | RGBTuple;
export declare type WebhookEmbedOptions = {
    fields?: APIEmbed["fields"];
    author?: EmbedAuthorOptions;
    color?: EmbedColor;
    description?: string;
    footer?: EmbedFooterOptions;
    image?: string;
    thumbnail?: string;
    timestamp?: boolean | number | Date;
    title?: string;
    url?: string;
};
export declare type DefaultColorOptions = {
    log?: EmbedColor;
    warn?: EmbedColor;
    error?: EmbedColor;
    debug?: EmbedColor;
};
export declare class DiscordWebhookLogger implements LoggerService {
    private readonly webhookUrl;
    private readonly webhookUsername?;
    private readonly webhookAvatarUrl?;
    private readonly defaultColors;
    private readonly logger;
    constructor(webhookUrl: string, webhookUsername?: string, webhookAvatarUrl?: string, defaultColors?: DefaultColorOptions);
    private post;
    private build;
    log(message: string, options?: WebhookEmbedOptions): Promise<void>;
    error(message: string, options?: WebhookEmbedOptions): Promise<void>;
    warn(message: string, options?: WebhookEmbedOptions): Promise<void>;
    debug(message: string, options?: WebhookEmbedOptions): Promise<void>;
}
export {};
