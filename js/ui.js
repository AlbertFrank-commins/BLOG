// Módulo de interfaz de usuario: Edición Códice Histórico
const UI = {
  elements: {
    postTitle: document.getElementById('postTitle'),
    postRegion: document.getElementById('postRegion'),
    postSubregion: document.getElementById('postSubregion'),
    postPopulation: document.getElementById('postPopulation'),
    imageWrapper: document.getElementById('imageWrapper'),
    imageCaption: document.getElementById('imageCaption'),
    postDescription: document.getElementById('postDescription'),
    specsList: document.getElementById('specsList'),
    mapFrame: document.getElementById('mapFrame'),
    mapSubtitle: document.getElementById('mapSubtitle'),
    relatedList: document.getElementById('relatedList'),
    statusDot: document.getElementById('statusIndicator'),
    statusText: document.getElementById('statusText')
  },

  actualizarEstado(isMock) {
    if (!this.elements.statusDot || !this.elements.statusText) return;

    if (isMock) {
      this.elements.statusDot.className = 'wax-seal-dot';
      this.elements.statusText.textContent = 'Archivo Local (Códice Simulado)';
    } else {
      this.elements.statusDot.className = 'wax-seal-dot online';
      this.elements.statusText.textContent = 'Cartografía Viva & Conectada';
    }
  },

  renderizarArticulo(pais) {
    const nombre = pais.name?.common || "Territorio";
    const capital = pais.capital ? pais.capital.join(', ') : "Sin sede registrada";
    const region = pais.region || "Tierra Incógnita";
    const subregion = pais.subregion || "Costa Indómita";
    const poblacion = pais.population ? pais.population.toLocaleString() : "Sin censo registrado";

    const idiomas = pais.languages ? Object.values(pais.languages).join(', ') : "Dialectos antiguos";
    const monedas = pais.currencies 
      ? Object.values(pais.currencies).map(c => `${c.name || ''} (${c.symbol || '¢'})`).join(', ') 
      : "Trueque de especias y grano";

    const banderaPng = pais.flags?.png || pais.flags?.svg;
    const banderaAlt = `Enseña soberana de ${nombre}`;

    const lat = pais.latlng ? pais.latlng[0] : null;
    const lon = pais.latlng ? pais.latlng[1] : null;

    // Encabezados
    this.elements.postTitle.textContent = nombre;
    this.elements.postRegion.textContent = `Dominio: ${region}`;
    this.elements.postSubregion.textContent = `Comarca: ${subregion}`;
    this.elements.postPopulation.textContent = `Censo: ${poblacion} almas`;

    // Escenario heráldico
    this.elements.imageWrapper.innerHTML = `
      <img src="${banderaPng}" alt="${banderaAlt}" loading="eager">
    `;
    this.elements.imageCaption.textContent = `«Enseña y Armas de ${nombre} custodiadas en la Crónica Universal».`;

    // Redacción histórica iluminada
    this.elements.postDescription.innerHTML = `
      <p>Consta en los anales cartográficos que la soberanía de <strong>${nombre}</strong> se extiende sobre los dominios de <strong>${subregion}</strong>. 
      Alberga bajo sus murallas a más de <em>${poblacion} súbditos y moradores</em>, concentrándose el mando judicial y cortesano en la villa de <strong>${capital}</strong>.</p>
      <p>Los cronistas de viaje registran el habla cotidiana en <strong>${idiomas}</strong>, realizándose el comercio y tasación de navíos mediante las piezas de <strong>${monedas}</strong>.</p>
    `;

    // Ficha Capitular
    this.elements.specsList.innerHTML = `
      <li><strong>Sede Capitular:</strong> ${capital}</li>
      <li><strong>Lenguas del Pueblo:</strong> ${idiomas}</li>
      <li><strong>Moneda Soberana:</strong> ${monedas}</li>
      <li><strong>Declinación Cartográfica:</strong> ${lat && lon ? `${lat.toFixed(2)}° Lat / ${lon.toFixed(2)}° Lon` : 'Navegación astronómica'}</li>
    `;

    // Mapa náutico en pergamino
    this.elements.mapSubtitle.textContent = `Levantamiento topográfico de ${nombre} &bull; Puerto de ${capital}`;

    let mapUrl = "";
    if (lat !== null && lon !== null) {
      mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 4}%2C${lat - 4}%2C${lon + 4}%2C${lat + 4}&layer=mapnik&marker=${lat}%2C${lon}`;
    } else {
      mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(nombre)}&t=&z=5&ie=UTF8&iwloc=&output=embed`;
    }

    this.elements.mapFrame.src = mapUrl;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  renderizarListaLateral(paises, onSelectPais) {
    this.elements.relatedList.innerHTML = '';

    if (!paises || paises.length === 0) {
      this.elements.relatedList.innerHTML = `
        <p style="color: var(--text-muted-parchment); font-style: italic; padding: 1rem;">No se hallan pergaminos para este reino.</p>
      `;
      return;
    }

    paises.slice(0, CONFIG.MAX_SIDEBAR_ITEMS).forEach(pais => {
      const card = document.createElement('div');
      card.className = 'codex-entry-card';

      const flagSrc = pais.flags?.png || pais.flags?.svg;
      const nombre = pais.name?.common || "Tierra";
      const capital = pais.capital ? pais.capital[0] : pais.region;

      card.innerHTML = `
        <img src="${flagSrc}" alt="${nombre}" class="card-heraldry" loading="lazy">
        <div class="card-details">
          <h4>${nombre}</h4>
          <span>${capital} &bull; ${pais.region}</span>
        </div>
      `;

      card.addEventListener('click', () => onSelectPais(pais));
      this.elements.relatedList.appendChild(card);
    });
  }
};