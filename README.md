# Gasto Claro

Aplicación web para llevar un control sencillo de los gastos personales. Permite registrar gastos y consultar un resumen con estadísticas.

## Funcionalidades

- Agregar, editar y eliminar gastos.
- Buscar gastos por nombre.
- Consultar el total y la cantidad de gastos registrados.
- Ver estadísticas y una gráfica de gastos mensuales.
- Usar la interfaz en dispositivos móviles y de escritorio.

## Cómo ejecutar el proyecto

El proyecto está hecho con HTML, CSS y JavaScript, sin un proceso de compilación. Para ejecutarlo localmente:

1. Clona el repositorio y entra en su carpeta:

   ```bash
   git clone https://github.com/adroprado/gasto-claro.git
   cd gasto-claro
   ```

2. Inicia un servidor web local. Por ejemplo, si tienes Live Server instalado: Abre <http://localhost:5500> en el navegador.

La gráfica utiliza Chart.js desde un CDN, por lo que se requiere conexión a internet para cargar esa biblioteca.

## Almacenamiento de datos

Los gastos se guardan en `localStorage` del navegador. Permanecen disponibles en el mismo navegador y perfil mientras no se borren sus datos, pero no se sincronizan con otros dispositivos ni navegadores.

Cada gasto contiene un identificador (`id`), un nombre (`expenseName`) y un monto (`purchaseAmount`).

## Estructura del proyecto

```text
gasto-claro/
├── index.html             # Estructura de la página
├── main.js                # Inicialización y eventos de la aplicación
├── styles.css             # Estilos y diseño adaptable
└── js/
    ├── expense-view.js    # Renderizado de gastos y estadísticas
    ├── expenses.js        # Creación, edición, eliminación y consulta
    ├── form-validations.js # Validación de campos del formulario
    ├── menu.js            # Navegación entre secciones
    ├── searcher.js        # Búsqueda de gastos
    ├── statistics.js      # Preparación y visualización de la gráfica
    └── storage.js         # Lectura y escritura en localStorage
```

## Proyecto desplegado

**Enlace:** https://adroprado.github.io/gasto-claro/
