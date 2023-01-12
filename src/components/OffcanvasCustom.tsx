import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

interface OffcanvasProps {
  children: React.ReactNode;
}

export default function OffcanvasCustom({ children }: OffcanvasProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(show);

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}>
        {children}
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        backdrop='false'
>
        <Offcanvas.Header
          closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists,
          etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
