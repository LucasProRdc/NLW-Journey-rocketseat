import { BrowserRouter, Route, Routes } from "react-router";
import { CreateTrip } from "./pages/create-trip";
import { TripDetail } from "./pages/trip-detail";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreateTrip />} />
        <Route path="/trips/:tripId" element={<TripDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
