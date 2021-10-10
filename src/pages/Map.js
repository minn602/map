import React, { useState, useEffect } from "react";
import { useClientRect } from "../hooks/useClientRect";
import { markerWidth, markerHeight } from "../constants";
import "./Map.scss";

const Map = () => {
  const [markerLocations, setMarkerLocations] = useState([]);
  const [draggedPosition, setDraggedPosition] = useState({
    draggedX: 0,
    draggedY: 0,
  });
  const [mapRect, mapRef] = useClientRect();

  useEffect(() => {
    if (mapRect) {
      mapRect.style.transform = `translate(${-draggedPosition.draggedX}px, ${-draggedPosition.draggedY}px)`;
    }

    setMarkerLocations(
      markerLocations.map((location) => {
        return {
          x: location.x - draggedPosition.draggedX,
          y: location.y - draggedPosition.draggedY,
        };
      })
    );
  }, [draggedPosition.draggedX, draggedPosition.draggedY]);

  //우클릭으로 클릭 위치를 상태값에 추가하는 함수
  const addMarker = (evt) => {
    evt.preventDefault();

    setMarkerLocations([
      ...markerLocations,
      {
        x: evt.pageX,
        y: evt.pageY,
      },
    ]);
  };

  //현재 추가 된 마커 정보 리셋하는 함수
  const resetMarkers = () => {
    setMarkerLocations([]);
  };

  let draggedX = 0,
    draggedY = 0;
  const getStartDragPosition = (evt) => {
    draggedX = evt.clientX;
    draggedY = evt.clientY;
  };

  const getEndDragPosition = (evt) => {
    draggedX -= evt.clientX;
    draggedY -= evt.clientY;

    setDraggedPosition({ draggedX, draggedY });
  };

  return (
    <div
      onDragStart={(evt) => getStartDragPosition(evt)}
      onDragEnd={(evt) => getEndDragPosition(evt)}
      onContextMenu={(evt) => addMarker(evt)}
      className="Map"
    >
      <img
        onClick={() => resetMarkers()}
        className="resetBtn"
        src="/img/reset.png"
        alt="reset button"
      />
      <div className="mapContainer">
        <img ref={mapRef} className="map" src="/img/map.png" alt="map" />
        {markerLocations.map((marker, idx) => {
          return (
            <img
              key={idx}
              className="marker"
              src="/img/marker.png"
              alt="marker"
              style={{
                top: `${marker.y - markerWidth}px`,
                left: `${marker.x - markerHeight}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Map;
