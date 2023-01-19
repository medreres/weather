import React from "react";
import Offcanvas from "../Offcanvas";
import Searchbar from "../Searchbar";

interface LocationOffcanvasProps {
  show: boolean;
  onHide: () => void;
  cityName: string;
}

export default function LocationOffcanvas({ show, onHide, cityName }: LocationOffcanvasProps) {
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      title={cityName}>
      <Searchbar />
    </Offcanvas>
  );
}
