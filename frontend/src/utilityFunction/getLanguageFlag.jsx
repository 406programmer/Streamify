import { LANGUAGE_TO_FLAG } from "../constants";

export default function getLanguageFlag(language) {
  if (!language) return null;

  const lang = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[lang];
  if (countryCode) {
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${lang} flag`}
        className="mr-1 h-3 inline-block"
      />
    );
  }
  return null;
}
