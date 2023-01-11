import React from "react";
import { Card, Button } from "react-bootstrap";

export default function Fallback() {
  return (
    <div style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    }}>
      <Card className="text-center">
        <Card.Header>Error</Card.Header>
        <Card.Body>
          <Card.Title>Weather Forecast is out of date</Card.Title>
          <Card.Text>Data is expired. Connect to internet to get the lastet weather forecast</Card.Text>
          <Button onClick={() => location.reload()} variant="primary">Reload Page</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
