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
      } relative inline-block`}
      ref={containerRef}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 cursor-pointer items-center gap-1.5 rounded-sm border border-line px-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-sub transition-colors duration-200 hover:border-line-strong hover:text-ink focus-visible:outline-none"
      >
        <span>{currentLang?.languageName}</span>
        <svg
          className={`h-3 w-3 text-ink-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
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
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[120px] overflow-hidden rounded-sm border border-line bg-background p-1 shadow-[var(--ui-shadow)]">
          {sortedLanguages.map((language) => (
            <button
              key={language.languageCode}
              className={`w-full rounded-[4px] px-2.5 py-2 text-left text-[12px] transition-colors duration-150 ${
                language.languageCode === lang
                  ? "bg-soft text-ink"
                  : "text-ink-sub hover:bg-soft hover:text-ink"
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
