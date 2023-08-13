export type ConfigJson = {
    blog_title: string
    site_introduction: string
    copylight_name: string
    copylight_url: string
    root_url: string
    issues_page_url: string
    favicon_image_url: string
    author_name: string
    author_introduction: string
};

export const configJsonPath = "contents/etc/config.json";

export const defaultConfigJson: ConfigJson = {
    blog_title: "Your blog title",
    site_introduction: "Your site introduction",
    copylight_name: "Your copylight name",
    copylight_url: "Your copylight url",
    root_url: "Your root url",
    issues_page_url: "Your issues page url",
    favicon_image_url: "Your favicon image url",
    author_name: "Your name",
    author_introduction: "Your introduction"
};