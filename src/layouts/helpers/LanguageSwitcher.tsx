import config from "@/config/config.json";
import languages from "@/config/language.json";
import React, { useState, useRef, useEffect } from "react";

const LanguageSwitcher = ({
  lang,
  pathname,
}: {
  lang: string;
  pathname: string;
}) => {
  const { default_language, default_language_in_subdir } = config.settings;
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const removeTrailingSlash = (path: string) => {
    if (!config.site.trailing_slash) {
      return path.replace(/\/$/, "");
    }
    return path;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedLanguages = languages
    .filter(
      (language) =>
        !(config.settings.disable_languages as string[]).includes(
          language.languageCode,
        ),
    )
    .sort((a, b) => a.weight - b.weight);

  const switchLanguage = (selectedLang: string) => {
    const baseUrl = window.location.origin;
    let newPath;

    if (selectedLang === default_language) {
      if (default_language_in_subdir) {
        newPath = `${baseUrl}/${default_language}${removeTrailingSlash(pathname.replace(`/${lang}`, ""))}`;
      } else {
        newPath = `${baseUrl}${removeTrailingSlash(pathname.replace(`/${lang}`, ""))}`;
      }
    } else {
      newPath = `/${selectedLang}${removeTrailingSlash(pathname.replace(`/${lang}`, ""))}`;
    }
    window.location.href = newPath;
  };

  const currentLang = sortedLanguages.find((l) => l.languageCode === lang);

  return (
    <div
      className={`${
        sortedLanguages.length > 1 ? "block" : "hidden"
      } relative inline-block mr-2`}
      ref={containerRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 pl-2 pr-2 rounded-md border border-gray-300 bg-transparent text-gray-700 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 transition-colors flex items-center gap-1"
      >
        <span>{currentLang?.languageName}</span>
        <svg
          className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[100px] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 overflow-hidden">
          {sortedLanguages.map((language) => (
            <button
              key={language.languageCode}
              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                language.languageCode === lang
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              onClick={() => {
                setIsOpen(false);
                switchLanguage(language.languageCode);
              }}
            >
              {language.languageName}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
