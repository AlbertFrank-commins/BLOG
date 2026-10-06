// Datos de respaldo simulados garantizados (100% funcionales sin internet)
const MOCK_COUNTRIES = [
  {
    name: { common: "República Dominicana", official: "República Dominicana" },
    capital: ["Santo Domingo"],
    region: "Americas",
    subregion: "Caribbean",
    population: 11117873,
    flags: {
      png: "https://flagcdn.com/w320/do.png",
      svg: "https://flagcdn.com/do.svg",
      alt: "Bandera de la República Dominicana con su escudo central y cruz blanca."
    },
    languages: { spa: "Español" },
    currencies: { DOP: { name: "Peso dominicano", symbol: "RD$" } },
    maps: { googleMaps: "https://goo.gl/maps/RZzsGyvxEZfgdrUp7" }
  },
  {
    name: { common: "Japón", official: "Japón" },
    capital: ["Tokio"],
    region: "Asia",
    subregion: "Eastern Asia",
    population: 125836021,
    flags: {
      png: "https://flagcdn.com/w320/jp.png",
      svg: "https://flagcdn.com/jp.svg",
      alt: "Bandera de Japón con el círculo solar rojo centrado."
    },
    languages: { jpn: "Japonés" },
    currencies: { JPY: { name: "Yen japonés", symbol: "¥" } },
    maps: { googleMaps: "https://goo.gl/maps/5IEuevqShowmyA4T6" }
  },
  {
    name: { common: "Italia", official: "República Italiana" },
    capital: ["Roma"],
    region: "Europe",
    subregion: "Southern Europe",
    population: 59554023,
    flags: {
      png: "https://flagcdn.com/w320/it.png",
      svg: "https://flagcdn.com/it.svg",
      alt: "Bandera tricolor italiana en verde, blanco y rojo."
    },
    languages: { ita: "Italiano" },
    currencies: { EUR: { name: "Euro", symbol: "€" } },
    maps: { googleMaps: "https://goo.gl/maps/8MFAdukGavqHGUR4A" }
  },
  {
    name: { common: "Islandia", official: "Islandia" },
    capital: ["Reikiavik"],
    region: "Europe",
    subregion: "Northern Europe",
    population: 366425,
    flags: {
      png: "https://flagcdn.com/w320/is.png",
      svg: "https://flagcdn.com/is.svg",
      alt: "Bandera de Islandia con cruz escandinava roja y blanca."
    },
    languages: { isl: "Islandés" },
    currencies: { ISK: { name: "Corona islandesa", symbol: "kr" } },
    maps: { googleMaps: "https://goo.gl/maps/WxFWSQucdw9mriUR6" }
  }
];