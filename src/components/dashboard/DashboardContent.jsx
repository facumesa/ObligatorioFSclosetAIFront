import { useEffect, useState } from "react";

import DashboardHeader from "./DashboardHeader";
import Hero from "./Hero";
import OutfitCards from "./OutfitCards";
import SectionHead from "./SectionHead";
import StatCards from "./StatCards";
import DashboardCharts from "./DashboardCharts";
import { useDispatch, useSelector } from "react-redux";
import { guardarPrendas } from "../../store/slices/prendasSlice";
import { guardarDashboardOutfits } from "../../store/slices/outfitsSlice";

const DashboardContent = () => {
  const outfits = useSelector((state) => state.outfits.dashboard.lista);
  const totalOutfits = useSelector((state) => state.outfits.dashboard.total);
  const outfitsCargados = useSelector(
    (state) => state.outfits.dashboard.cargado,
  );
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const prendas = useSelector((state) => state.prendas.lista);
  const cargado = useSelector((state) => state.prendas.cargado);

  const cargando = !cargado || !outfitsCargados;

  const usuario = JSON.parse(localStorage.getItem("usuario") || "null");

  const token = useSelector((state) => state.auth.token);
  const autenticado = useSelector((state) => state.auth.autenticado);

  useEffect(() => {
    if (!autenticado || !token) return;
    if (cargado && outfitsCargados) return;

    const cargarEstadisticas = async () => {
      try {
        const headers = {
          Authorization: token,
        };

        const peticiones = [];

        if (!cargado) {
          peticiones.push(
            fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/prendas`, {
              headers,
            }).then(async (respuesta) => {
              if (!respuesta.ok) {
                throw new Error("No se pudieron cargar las prendas");
              }

              return {
                tipo: "prendas",
                datos: await respuesta.json(),
              };
            }),
          );
        }

        if (!outfitsCargados) {
          peticiones.push(
            fetch(`${import.meta.env.VITE_API_BASE_URL}/v1/outfits`, {
              headers,
            }).then(async (respuesta) => {
              if (!respuesta.ok) {
                throw new Error("No se pudieron cargar los outfits");
              }

              return {
                tipo: "outfits",
                datos: await respuesta.json(),
              };
            }),
          );
        }

        const resultados = await Promise.all(peticiones);

        resultados.forEach(({ tipo, datos }) => {
          if (tipo === "prendas") {
            dispatch(guardarPrendas(datos));
          } else {
            dispatch(guardarDashboardOutfits(datos));
          }
        });

        setError("");
      } catch (error) {
        setError(error.message);
      }
    };

    cargarEstadisticas();

  }, [cargado, outfitsCargados, dispatch, token, autenticado]);

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

      <OutfitCards outfits={outfits} />
    </main>
  );
};

export default DashboardContent;
