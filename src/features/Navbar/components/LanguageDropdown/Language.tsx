import { icon } from "@fortawesome/fontawesome-svg-core";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useTransition } from "react";
import { Dropdown } from "react-bootstrap";
import { languageCtx } from "../../../../shared/context/app-context";
import useLanguage from "../../../../shared/hooks/useTranslation";
import { LANGUAGES, TRANSLATION } from "../../../../shared/lang/translation";

export default function LanguageDropdown() {
  const translate = useLanguage();
  const { darkMode, lang, setLanguage } = useContext(languageCtx);
  return (
    <Dropdown align={{ sm: "end" }}>
      <Dropdown.Toggle
        data-testid="language-dropdown"
        variant={darkMode ? "outline-success" : "outline-primary"}>
        <FontAwesomeIcon icon={faGlobe} /> <span data-testid="language-label">{translate(TRANSLATION.LANGUAGE)}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Header data-testid="interface-language">{translate(TRANSLATION.INTERFACE_LANGUAGE)}</Dropdown.Header>
        <Dropdown.Divider />
        {Object.keys(LANGUAGES).map((option) => (
          <Dropdown.Item
            data-testid={`toggle-${option}`}
            active={option === lang}
            key={option}
            onClick={() => {
              setLanguage(option);
            }}>
            {(LANGUAGES as any)[option]}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
