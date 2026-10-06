// js/api.js
const CountriesAPI = {
  async obtenerTodos() {
    try {
      console.log("-> Conectando con API remota en:", CONFIG.API_URL);

      const response = await fetch(CONFIG.API_URL);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawData = await response.json();

      // Normalización completa incluyendo coordenadas (latlng)
      const dataNormalizada = rawData.map(c => {
        const codigoIso = (c.cca2 || c.cca3 || "").toLowerCase();
        return {
          name: {
            common: c.name?.common || "País",
            official: c.name?.official || c.name?.common || "País"
          },
          capital: Array.isArray(c.capital) ? c.capital : (c.capital ? [c.capital] : ["No asignada"]),
          region: c.region || "Global",
          subregion: c.subregion || "Territorio continental",
          population: c.population || 0,
          latlng: c.latlng || [18.73, -70.16], // [latitud, longitud]
          flags: {
            png: `https://flagcdn.com/w320/${codigoIso}.png`,
            svg: `https://flagcdn.com/${codigoIso}.svg`,
            alt: `Bandera oficial de ${c.name?.common}`
          },
          languages: c.languages || {},
          currencies: c.currencies || {}
        };
      });

      console.log(`✔ ¡ÉXITO! ${dataNormalizada.length} países procesados con telemetría.`);
      return { data: dataNormalizada, isMock: false };

    } catch (error) {
      console.error("Fallo de conexión API:", error);
      return { data: MOCK_COUNTRIES, isMock: true };
    }
  }
};