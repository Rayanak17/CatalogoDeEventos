import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapComponente.css"; // Verifique se esse arquivo está correto, ou ajuste
import "../home/Home.css"; // Verifique se a estilização da home não afeta a renderização do mapa
import axios from "axios";
import { Search, HelpCircle } from "lucide-react";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const EVENT_SERVICE_URL = import.meta.env.VITE_EVENT_SERVICE_URL;

const initialViewState = {
  longitude: -34.861,
  latitude: -7.115,
  zoom: 12,
};

const MapComponent = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewState, setViewState] = useState(initialViewState);

  // Função para buscar eventos
  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${EVENT_SERVICE_URL}/events`);
      console.log("Eventos carregados:", response.data); // Log dos dados recebidos da API
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar eventos:", error); // Log do erro ao buscar eventos
      throw new Error("Erro ao buscar eventos: " + error.message);
    }
  };

  // Utilizando react-query para fazer o fetch dos eventos
  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  // Tratamento de loading e erro
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    return (
      <div>
        Erro ao carregar eventos: {error.message || "Erro desconhecido"}
      </div>
    );
  }

  // Verificação de tipo de dados antes de aplicar o filtro
  const now = new Date().toISOString();
  const filteredEvents =
    Array.isArray(events)
      ? events.filter((event) => {
          return event.endDateTime
            ? event.endDateTime > now
            : event.startDateTime > now;
        })
      : []; // Se `events` não for um array, retorna um array vazio

  // Limitações de mapa (Zoom e limites de longitude/latitude)
  const bounds = [
    [-34.95, -7.25],
    [-34.75, -7.0],
  ];

  return (
    <div>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: "100%", height: "500px" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        maxBounds={bounds}
        minZoom={10}
        onClick={() => setSelectedEvent(null)} // Fecha o popup ao clicar no mapa
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Marker
              key={event.id}
              longitude={event.longitude}
              latitude={event.latitude}
            >
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Evita que o clique feche o popup imediatamente
                  setSelectedEvent(event);
                  setViewState({
                    longitude: event.longitude,
                    latitude: event.latitude,
                    zoom: 14,
                    transitionDuration: 500,
                  });
                }}
                style={{
                  backgroundColor: event.eventPrice > 0 ? "#761AB3" : "#1AB393",
                }}
                className="marker"
              >
                {event?.eventTitle?.[0] ?? "?"}
              </div>
            </Marker>
          ))
        ) : (
          <div>Sem eventos para exibir</div>
        )}

        {selectedEvent && (
          <Popup
            longitude={selectedEvent.longitude}
            latitude={selectedEvent.latitude}
            onClose={() => {
              setSelectedEvent(null);
              setViewState(initialViewState); // Resetar para a posição inicial
            }}
            closeButton
            closeOnClick={true} // Fecha ao clicar fora
            anchor="top"
          >
            <div style={{ color: "black" }}>
              <h3 className="font-bold">{selectedEvent.eventTitle}</h3>
              <p>{selectedEvent.eventDescription}</p>
              <p>
                <strong>Endereço:</strong> {selectedEvent.eventAddressStreet},{" "}
                {selectedEvent.eventAddressNumber},{" "}
                {selectedEvent.eventAddressNeighborhood}
              </p>
              <p>
                <strong>Data:</strong>{" "}
                {new Date(selectedEvent.startDateTime).toLocaleString()}
              </p>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
