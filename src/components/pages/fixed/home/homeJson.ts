export type HomeJson = {
    site_description: string,
    site_title: string,
};

export const homeJsonPath = "contents/etc/home.json";

export const defaultHomeJson: HomeJson = {
    site_description: "This is site description",
    site_title: "Your home page",
};