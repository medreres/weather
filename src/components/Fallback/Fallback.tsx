import React from "react";
import { Card, Button } from "react-bootstrap";
import useTranslation from "../../shared/hooks/useTranslation";
import { TRANSLATION } from "../../shared/lang/translation";

export default function Fallback() {
  const translate = useTranslation();
  return (
    <div style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }}>
      <Card className="text-center"
      data-testid='fallback-component'
      >
        <Card.Header data-testid='fallback-header'>{translate(TRANSLATION.ERROR)}</Card.Header>
        <Card.Body>
          <Card.Title data-testid='fallback-title'>{translate(TRANSLATION.OUT_OF_DATE)}</Card.Title>
          <Card.Text data-testid='fallback-text'>{translate(TRANSLATION.EXPIRED)}</Card.Text>
          <Button data-testid='fallback-reload-button' onClick={() => location.reload()} variant="primary">{translate(TRANSLATION.RELOAD)}</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
