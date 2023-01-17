import React, { ReactNode } from "react";
import { Offcanvas } from "react-bootstrap";

interface OffcanvasProps {
  children: ReactNode;
  show: boolean;
  onHide: () => void;
  title: string;
  labelId?: undefined | string;
}

export default ({ children, show, onHide, title, labelId }: OffcanvasProps) => {
  return (
    <Offcanvas
      placement="end"
      show={show}
      onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title data-testid={labelId}>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>{children}</Offcanvas.Body>
    </Offcanvas>
  );
};
