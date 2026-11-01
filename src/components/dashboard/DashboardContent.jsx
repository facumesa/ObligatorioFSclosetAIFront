
import { useEffect, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import Hero from "./Hero";
import OutfitCards from "./OutfitCards";
import SectionHead from "./SectionHead";
import StatCards from "./StatCards";
import DashboardCharts from "./DashboardCharts";

const DashboardContent = () => {
  const [prendas, setPrendas] = useState([]);
  const [totalOutfits, setTotalOutfits] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cargarEstadisticas = async () => {
      try {
        const headers = {
          Authorization: token,
        };

        const [respuestaPrendas, respuestaOutfits] =
          await Promise.all([
            fetch(
              "https://obligatorio-f-scloset-ai.vercel.app/v1/prendas",
              { headers }
            ),
            fetch(
              "https://obligatorio-f-scloset-ai.vercel.app/v1/outfits",
              { headers }
            ),
          ]);

        if (!respuestaPrendas.ok || !respuestaOutfits.ok) {
          throw new Error("No se pudieron cargar las estadísticas");
        }

        const datosPrendas = await respuestaPrendas.json();
        const datosOutfits = await respuestaOutfits.json();

        setPrendas(datosPrendas);
        setTotalOutfits(datosOutfits.total);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    };

    cargarEstadisticas();
  }, [token]);

  return (
    <main className="content">
      <DashboardHeader />

      <section className="hero">
        <Hero />
      </section>

      {error && <p role="alert">{error}</p>}

      <StatCards
        totalPrendas={prendas.length}
        totalOutfits={totalOutfits}
        plan={usuario?.plan}
        cargando={cargando}
      />

      <DashboardCharts prendas={prendas} />

      <SectionHead />
      <OutfitCards />
    </main>
  );
};

export default DashboardContent;
