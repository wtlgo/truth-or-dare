import { createI18n } from "vue-i18n";

const messages = Object.fromEntries(
    Object.entries(import.meta.globEager("./locales/*.yaml")).map(
        ([key, val]) => {
            const match = key.match(/\/([^/]+)\.yaml$/);
            return [match![1], val.default];
        }
    )
);

const sessionLocale = sessionStorage.getItem("locale") ?? "en";
const i18n = createI18n({
    legacy: false,

    locale: sessionLocale,
    fallbackLocale: "en",

    messages,
});

export const setLocale = (locale: string) => {
    sessionStorage.setItem("locale", locale);
    i18n.global.locale.value = locale;
};

export default i18n;
