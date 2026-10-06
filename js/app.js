// js/app.js - Controlador Principal
const App = {
  paises: [],
  filtroRegion: 'all',
  busquedaTexto: '',

  async init() {
    // 1. Carga de datos desde la API o Mock
    const { data, isMock } = await CountriesAPI.obtenerTodos();
    this.paises = data;

    // 2. Indicador visual de estado
    UI.actualizarEstado(isMock);

    // 3. Renderizar el primer país si existe
    if (this.paises.length > 0) {
      UI.renderizarArticulo(this.paises[0]);
    }

    // 4. Cargar lista del sidebar
    this.aplicarFiltros();

    // 5. Escuchar eventos
    this.configurarEventos();
  },

  aplicarFiltros() {
    let filtrados = this.paises;

    // 1. Filtrado por continente / región
    if (this.filtroRegion !== 'all') {
      const regionBuscada = this.filtroRegion.toLowerCase();

      filtrados = filtrados.filter(p => {
        const regionPais = (p.region || '').toLowerCase();
        const subregionPais = (p.subregion || '').toLowerCase();

        return regionPais.includes(regionBuscada) || 
               subregionPais.includes(regionBuscada) ||
               (regionBuscada === 'americas' && regionPais.includes('america'));
      });
    }

    // 2. Filtrado por texto de búsqueda (nombre o capital)
    if (this.busquedaTexto !== '') {
      filtrados = filtrados.filter(p => {
        const nombre = p.name?.common?.toLowerCase() || '';
        const capital = Array.isArray(p.capital) ? p.capital.join(' ').toLowerCase() : '';
        return nombre.includes(this.busquedaTexto) || capital.includes(this.busquedaTexto);
      });
    }

    // 3. Renderizar resultados filtrados
    UI.renderizarListaLateral(filtrados, (paisSeleccionado) => {
      UI.renderizarArticulo(paisSeleccionado);
    });
  },

  configurarEventos() {
    // Buscador por texto
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.busquedaTexto = e.target.value.toLowerCase().trim();
        this.aplicarFiltros();
      });
    }

    // Filtros por continente en el sidebar
    const regionFilters = document.getElementById('regionFilters');
    if (regionFilters) {
      regionFilters.addEventListener('click', (e) => {
        // Busca tanto la clase .ribbon-btn como .chip para evitar errores de selector
        const boton = e.target.closest('.ribbon-btn') || e.target.closest('.chip');
        if (!boton) return;

        // Remover estado activo de los demás botones
        const todosLosBotones = regionFilters.querySelectorAll('.ribbon-btn, .chip');
        todosLosBotones.forEach(b => b.classList.remove('active'));

        // Activar el botón presionado
        boton.classList.add('active');

        // Leer la región seleccionada
        this.filtroRegion = boton.getAttribute('data-region') || 'all';
        this.aplicarFiltros();
      });
    }
  }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => App.init());