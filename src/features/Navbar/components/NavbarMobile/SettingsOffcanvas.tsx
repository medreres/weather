import React, { useContext } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { appCtx } from "../../../../shared/context/app-context";
import useTranslation from "../../../../shared/hooks/useTranslation";
import { TRANSLATION, LANGUAGES } from "../../../../shared/lang/translation";
import SettingsDropdown from "../NavbarDesktop/SettingsDropdown";
import PrecipitationDropdownItem from "../../shared/components/PrecipitationDropdownItem";
import TemperatureDropdown from "../../shared/components/TemperatureDropdownItem";
import WindDropdownItem from "../../shared/components/WindDropdownItem";
import Offcanvas from "../Offcanvas";

interface LanguageOffcanvasProps {
  show: boolean;
  onHide: () => void;
}

export default function SettingsOffcanvas({ show, onHide }: LanguageOffcanvasProps) {
  const translate = useTranslation();
  return (
    <Offcanvas
      labelId="offcanvas-language-title"
      show={show}
      onHide={onHide}
      title={translate(TRANSLATION.SETTINGS)}>
      <ListGroup>
        <ListGroupItem>
          <TemperatureDropdown />
        </ListGroupItem>
        <ListGroupItem>
          <PrecipitationDropdownItem />
        </ListGroupItem>
        <ListGroupItem>
          <WindDropdownItem />
        </ListGroupItem>
      </ListGroup>
    </Offcanvas>
  );
}
