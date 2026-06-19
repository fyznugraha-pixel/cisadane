import { en } from "./locales/en";
import { id } from "./locales/id";

export const dictionaries = {
  en,
  id,
};

export type Dictionary = typeof en;

export type Locale = keyof typeof dictionaries;

export const getDictionary = (locale: string) => {
  return dictionaries[locale as Locale] ?? dictionaries.en;
};
