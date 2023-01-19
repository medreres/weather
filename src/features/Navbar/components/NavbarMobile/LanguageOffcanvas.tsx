import React, { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { appCtx } from "../../../../shared/context/app-context";
import useTranslation from "../../../../shared/hooks/useTranslation";
import { TRANSLATION, LANGUAGES } from "../../../../shared/lang/translation";
import Offcanvas from "../Offcanvas";

interface LanguageOffcanvasProps {
  show: boolean;
  onHide: () => void;
}

export default function LanguageOffcanvas({ show, onHide }: LanguageOffcanvasProps) {
  const translate = useTranslation();
  const { lang, setLanguage } = useContext(appCtx);
  return (
    <Offcanvas
      labelId="offcanvas-language-title"
      show={show}
      onHide={onHide}
      title={translate(TRANSLATION.LANGUAGE)}>
      <ListGroup>
        {Object.keys(LANGUAGES).map((option) => (
          <ListGroupItem
            data-testid={option}
            active={option === lang}
            key={option}
            onClick={() => {
              setLanguage(option);
            }}>
            {(LANGUAGES as any)[option]}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Offcanvas>
  );
}
