# PORTFOLIO_SPEC.md — Portfolio profesional de Guillermo Palacios García

> Documento de contexto para Claude Code. Describe QUÉ se va a construir, para quién y con qué criterios de calidad. No inventes datos que no aparezcan aquí: si falta información, deja un `TODO` visible y pregunta.

---

## 1. Objetivo

Sitio web personal que funcione como **prueba de solvencia en ingeniería de software (Proof of Work)**.

- **Perfil:** Ingeniero Informático (Mención en Ingeniería del Software, UCO), con experiencia en producción (prácticas en Cordoware) y TFG con nota 9,5.
- **Diferenciador:** fundamentos sólidos de ingeniería + flujo de trabajo de desarrollo asistido por IA (Claude Code).
- **Pilares:**
  1. Demostrar versatilidad con evidencia (Java, C#, JavaScript, React, SQL y NoSQL en contextos distintos), no con promesas genéricas.
  2. La propia web debe ser una muestra de rigor técnico: Lighthouse 95+, responsive, HTML semántico, accesible.
  3. Conversión directa: CV, contacto, GitHub y LinkedIn accesibles desde el primer pantallazo.

## 2. Público objetivo

| Público | Qué busca | Cómo responde el sitio |
|---|---|---|
| Tech Leads / Engineering Managers | Arquitectura, criterio técnico, testing, control de versiones | Experiencia detallada y caso de estudio de MoodNest con decisiones técnicas |
| Recruiters / RRHH | Titulación, stack buscado, disponibilidad, CV rápido | Chips de stack, sección de habilidades, botón de CV en cabecera |
| Empresas / clientes | Profesionalidad, entrega end-to-end, contacto sin fricción | Presentación limpia, proyectos completos, canales directos |

## 3. Decisiones técnicas cerradas

- **Framework:** Astro + TypeScript + Tailwind CSS. Sitio **100 % estático** (sin backend por ahora).
- **React:** solo como islas puntuales si hay interactividad real. Por defecto, componentes Astro sin JS.
- **Idiomas:** español (por defecto) e inglés. Rutas `/es/` y `/en/`, con `hreflang` y selector visible.
- **Contenido separado del código:** textos en `src/content/es.json` y `src/content/en.json` (o content collections de Astro). Los componentes leen de ahí; no hay texto escrito dentro de componentes.
- **Hosting:** GitHub Pages, desplegado con GitHub Actions en cada push a `main`. Repositorio previsto: `guillermo-palacios.github.io`. Primero en el subdominio gratuito de GitHub Pages, después dominio propio.
- **Dominio objetivo:** `guillermopalacios.dev`, pendiente de conectar más adelante (y de comprobar disponibilidad). `.dev` exige HTTPS, que GitHub Pages ya ofrece.
- **Sin:** WebGL/three.js, librerías de animación, librerías de UI o de iconos completas, backend, CMS, formulario de contacto (en esta fase).

## 4. Datos personales y enlaces

- **Nombre:** Guillermo Palacios García
- **Rol mostrado:** Ingeniero de Software
- **Ubicación:** Córdoba, España
- **Email:** palaciosgarciaguillermo7@gmail.com
- **GitHub:** https://github.com/guillermo-palacios
- **LinkedIn:** https://www.linkedin.com/in/guillermo-palacios-garcia
- **Disponibilidad:** presencial en Córdoba capital, híbrido en Córdoba y alrededores, remoto en toda España. Busca incorporación como Desarrollador / Ingeniero de Software Junior o proyectos.
- **Activos ya disponibles:** foto PNG recortada (traje, fondo transparente), CV en PDF en español e inglés, 4–5 capturas de MoodNest y su documentación de diseño y desarrollo.

## 5. Estructura de la página (orden)

1. **Cabecera fija** (salvo en ventanas de poca altura, `max-height: 30rem`, donde se queda al principio de la página y se desplaza con ella para no tapar contenido con zoom o en horizontal)**:** nombre/logo, navegación por anclas, selector de idioma, toggle de tema, botón "Descargar CV".
2. **Hero**
3. **Experiencia**
4. **Proyectos**
5. **Stack tecnológico**
6. **Cómo trabajo con IA**
7. **Formación e idiomas** (incluye bloque de certificaciones preparado y vacío)
8. **Contacto y disponibilidad** (footer)

No hay sección "Sobre mí" independiente: hero y formación la cubren.

## 6. Contenido (versión final en español)

### 6.1 Hero
- **Titular:** Guillermo Palacios | Ingeniero de Software
- **Subtítulo:** Ingeniero Informático (Ingeniería del Software). Backend, full-stack y desarrollo asistido por IA.
- **Foto:** PNG recortado optimizado a WebP/AVIF con transparencia, `fetchpriority="high"`, `alt` descriptivo.
- **CTAs:** `Descargar CV (PDF)` · `Contactar` (mailto) · iconos a GitHub y LinkedIn.

### 6.2 Experiencia
- **Puesto:** Desarrollador Web Full-Stack (contrato de prácticas)
- **Empresa:** Cordoware
- **Periodo:** febrero 2026 – julio 2026 (6 meses) · Córdoba, presencial
- **Contexto:** equipo de 3 desarrolladores con control de versiones compartido.
- **Descripción:** Desarrollo web full-stack cubriendo el ciclo de vida completo del software.
- **Hitos:**
  - **CRM corporativo (full-stack):** implementación end-to-end (controladores, servicios y vistas) de los módulos comerciales de Presupuestos, Pedidos, Albaranes y Facturas, con la lógica de negocio y los flujos de conversión entre documentos. Fue el módulo más complejo del periodo. Optimización de *Data Annotations* para garantizar la integridad de datos.
  - **Modernización de software legacy:** refactorización y actualización de sistemas heredados en producción hacia una arquitectura de componentes y estándares visuales modernos, preservando la lógica de negocio original.
  - **Backend y e-commerce:** modelado de base de datos relacional con Entity Framework (Code-First), paso de procesos a comunicación asíncrona (AJAX/JSON/jQuery) y navegación condicional con seguridad mediante ASP.NET Identity.
- **Chips:** `C#` `ASP.NET Framework` `SQL Server` `JavaScript` `jQuery` `HTML5` `CSS3` `Bootstrap 5`
- **Reglas de redacción:** sin cifras de impacto (no las hay; no inventarlas). Sin afirmar metodología formal (no se seguía ninguna).

### 6.3 Proyectos (2)

**Proyecto 1 — MoodNest (TFG, calificación 9,5)**
- **Resumen:** aplicación web de seguimiento diario del estado de ánimo frente al estrés y la hiperdigitalización. Registro contextualizado de emociones y actividades, con un módulo completo de análisis de datos.
- **Ingeniería aplicada:** ciclo de vida completo (requisitos, arquitectura física/lógica/de datos, implementación, testing y validación de requisitos no funcionales: rendimiento, seguridad, usabilidad). Gestión ágil con GitHub: Issues, Milestones y tablero Kanban.
- **Stack:** React.js + Tailwind CSS · API REST en Java con Spring Boot y autenticación stateless con JWT · MongoDB (modelo orientado a documentos) · JUnit, Mockito y Postman · Docker.
- **Material visual:** 4–5 capturas de la interfaz en `src/assets/moodnest/`. **No hay demo desplegada**: usar capturas y enlace a documentación.
- **Enlaces:** repositorio de GitHub (`TODO: URL`), documentación (`TODO: URL`). No mostrar botón de demo.
- Presentación como caso de estudio escaneable: problema → decisiones de arquitectura → stack → testing → resultado.

**Proyecto 2 — Este portfolio**
- **Resumen:** sitio estático bilingüe construido con Astro, TypeScript y Tailwind, desarrollado con flujo asistido por IA (Claude Code).
- **Decisiones a destacar:** rendimiento (JS mínimo, fuentes autoalojadas, imágenes AVIF/WebP), accesibilidad WCAG 2.2 AA, tema claro/oscuro con tokens CSS, glassmorphism con fallbacks.
- **Métricas Lighthouse:** `TODO` — se rellenan con mediciones reales cuando el sitio esté desplegado. No escribir cifras estimadas.
- **Enlaces:** repositorio (`TODO: URL`) y sitio en vivo (`TODO: URL`).

*YouTube Media Converter queda fuera hasta que exista repositorio.*

### 6.4 Stack tecnológico
Dos niveles: principal (visible) y secundario (pequeño). Sin barras de porcentaje.

| Área | Principal | Secundario |
|---|---|---|
| Lenguajes | Java, C#, JavaScript, SQL, Python | C, C++ |
| Backend | Spring Boot, ASP.NET (MVC), Entity Framework, APIs REST, autenticación (JWT, ASP.NET Identity) | — |
| Frontend | React, Tailwind CSS, HTML5/CSS3, diseño responsive | Bootstrap 5 |
| Bases de datos | SQL Server, MongoDB | — |
| Calidad y DevOps | Git/GitHub, Docker, JUnit, Mockito | Postman |

Eliminados a propósito: Oracle, MariaDB, AJAX/JSON como tecnologías, jQuery (solo aparece como chip en Cordoware).

### 6.5 Cómo trabajo con IA
Sección breve, con hechos y sin hipérbole ("dominio avanzado" no se usa).
- Planificación del desarrollo y separación del trabajo en tareas.
- Implementación asistida con Claude Code.
- Generación de tests, revisión de código y refactorizaciones.
- Coordinación de varios subagentes trabajando en paralelo.
- `TODO (opcional):` una frase sobre qué revisa siempre él personalmente antes de aceptar cambios.

### 6.6 Formación e idiomas
- **Grado en Ingeniería Informática (Mención en Ingeniería del Software)**, Universidad de Córdoba (UCO). TFG (MoodNest): 9,5.
- **Idiomas:** español nativo · inglés B1 acreditado.
- **Formación continua:** aprendizaje autodidacta orientado a IA y Machine Learning.
- **Certificaciones:** bloque preparado en el diseño y en el JSON, **vacío por ahora** (`certifications: []`). El componente no debe renderizar la sección si el array está vacío.

### 6.7 Contacto y disponibilidad
- Estado: disponible para incorporación como Desarrollador / Ingeniero de Software Junior o proyectos.
- Modalidad: presencial en Córdoba capital · híbrido en Córdoba y alrededores · remoto en toda España.
- Enlaces: email, LinkedIn, GitHub.

---

## 7. Especificación de diseño

### 7.1 Estilo
Glassmorphism sobre fondo gradient mesh, inspirado en referencias de esferas y anillos 3D con tarjetas de cristal. Sobrio y técnico, no lúdico. Referencia principal: la de tonos verdes sobre fondo negro.

- **Tema oscuro (por defecto):** negro con mesh verde jade y brillos.
- **Tema claro:** fondo principal blanco con el mismo mesh jade, más tenue.
- **Navegación, tarjetas, chips y botones secundarios:** glass. Texto largo siempre sobre capa semiopaca.
- **Esferas/anillos 3D:** solo en el hero (y opcionalmente en el footer). Máximo 2–3, imágenes pre-renderizadas AVIF/WebP ≤ 30 KB cada una, `alt=""` y `aria-hidden="true"`.
- **Sin animaciones** en la fase 1. Si se añaden después, respetar `prefers-reduced-motion`.
- Se implementa y pule primero el tema oscuro; el claro usa los mismos tokens y se verifica por separado.

### 7.2 Paleta (tokens CSS)
Los ratios son aproximados: **verificar con WebAIM Contrast Checker, axe o Lighthouse** antes de darlos por válidos.

| Token | Oscuro | Claro |
|---|---|---|
| `--bg` | `#060A09` | `#F6FAF8` |
| `--text` | `#EAF2EF` | `#0B1A15` |
| `--text-muted` | `#A9BDB6` | `#3D524A` |
| `--accent` (texto, enlaces, iconos) | `#34D399` | `#047857` |
| Botón primario | fondo `#34D399`, texto `#04120C` | fondo `#047857`, texto `#FFFFFF` |
| Foco | anillo 2 px `#34D399`, offset 2 px | anillo 2 px `#047857`, offset 2 px |
| `--glass-bg` | `rgba(10,16,14,0.55)` | `rgba(255,255,255,0.62)` |
| `--glass-border` | `rgba(255,255,255,0.12)` | `rgba(4,120,87,0.20)` |
| `--surface-solid` (fallback) | `#0E1513` | `#FFFFFF` |

Los jades brillantes del mesh son decorativos y nunca llevan texto encima. El tema se define con `:root` y `:root[data-theme="light"]`.

### 7.3 Mesh y glass
- Mesh solo con CSS: capas `radial-gradient` en un pseudo-elemento `body::before` con `position: fixed; z-index: -1`. Estático, sin imágenes pesadas ni canvas.
- `.glass`: fondo `--surface-solid` por defecto; dentro de `@supports (backdrop-filter: blur(1px))` pasa a `--glass-bg` con `backdrop-filter: blur(14px) saturate(1.2)` (con prefijo `-webkit-`).
- Fallback sólido bajo `@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)`.
- Reglas: blur máximo 16 px, sin glass anidado, no más de 6 elementos con `backdrop-filter` visibles a la vez, alfa de `--glass-bg` no inferior a 0,55.

### 7.4 Tipografía
| Uso | Fuente | Pesos |
|---|---|---|
| Títulos | Sora (variable) | 600–700 |
| Texto | Inter (variable) | 400–600 |
| Chips de tecnología | monoespaciada del sistema (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`) | 500 |

- Autoalojadas con `@fontsource-variable/sora` y `@fontsource-variable/inter`, solo subset `latin`, WOFF2, `font-display: swap`, `preload` solo de las dos críticas, fallback con `size-adjust` para evitar CLS.
- Base 1rem (hasta 1.125rem en escritorio). Mínimo absoluto 0.875rem. `line-height` 1.6 en texto y 1.15–1.25 en títulos. Títulos fluidos con `clamp()`. Ancho de línea `max-width: 44.16em` en el texto (no en títulos), que equivale a 70ch con Inter (70 × 0,63086 em, el avance de su «0»). Se usa `em` y no `ch` porque `ch` se resuelve con la fuente cargada en cada momento: con el fallback mide 41,38 em, y al llegar Inter las líneas se recolocaban y desplazaban el contenido (CLS de 0,007 a 0,021 en escritorio; 0 con `em`). Todo lo demás en `rem`.

## 8. Accesibilidad (objetivo WCAG 2.2 AA)

- Contraste 4,5:1 en texto normal; 3:1 en texto grande (≥ 24 px, o ≥ 18,66 px en negrita) y en bordes o iconos que sean el único indicador de un control. Se mide en ambos temas y en los peores puntos del mesh.
- Foco visible siempre; nunca `outline: none` sin sustituto.
- Navegación completa con teclado, `skip link` y menú móvil operable con teclado.
- Áreas táctiles de al menos 44×44 px.
- Un solo `<h1>`, jerarquía sin saltos, landmarks (`header`, `nav`, `main`, `footer`), `lang` en `<html>`, `hreflang` entre idiomas.
- `alt` descriptivo en foto y capturas; decorativas con `alt=""`.
- Usable a 200 % de zoom y a 320 px de ancho sin scroll horizontal.
- Enlaces descriptivos ("Ver repositorio de MoodNest", no "Click aquí"); el color no es la única señal.

## 9. Rendimiento

Objetivos de trabajo, no cifras garantizadas:
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO, en móvil y escritorio.
- LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
- JS total en torno a 50 KB comprimido: solo toggle de tema, selector de idioma y menú móvil.
- Imágenes AVIF/WebP con `width`/`height` y `srcset`; hero con `fetchpriority="high"`; capturas con `loading="lazy"`.
- Iconos en SVG inline. Script inline mínimo en `<head>` para aplicar el tema sin parpadeo.
- Tema: sigue `prefers-color-scheme` por defecto, toggle manual guardado en `localStorage`.
  - *Nota temporal:* hasta la tarea 13 de `docs/PLAN.md` (pulido del tema claro), el tema se fuerza a oscuro salvo elección manual, para no mostrar un tema claro a medio pulir. En la tarea 13 se activa `prefers-color-scheme` y se elimina esta nota.

## 10. Calidad de código y control de versiones

- TypeScript en modo estricto (`strictest`), ESLint y Prettier, con scripts `dev`, `build`, `lint` y `check`.
- Componentes pequeños y modulares; sin texto de contenido dentro de los componentes.
- Commits en formato Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Ramas por funcionalidad y merge directo a `main`, sin PR salvo que se pidan. Un hook de pre-commit ejecuta `lint` y `check` en cada commit; `build` debe pasar antes de cada merge a `main`.
- Confirmar con el usuario qué entra en cada commit durante las primeras sesiones.

## 11. Criterios de aceptación (por sección)

1. Lighthouse y axe sin errores en tema oscuro y claro.
2. Contraste verificado en los peores puntos del mesh.
3. Navegación completa solo con teclado.
4. Revisión en móvil real o emulación de gama baja, con y sin `backdrop-filter`.
5. Textos idénticos a este documento; cualquier dato no listado aquí se marca `TODO` y se pregunta.

## 12. Pendientes conocidos

- Certificaciones (se rellenarán más adelante).
- URLs de MoodNest (repositorio y documentación) y del repositorio y sitio del portfolio.
- Métricas Lighthouse del propio portfolio (tras medir).
- Compra y configuración del dominio.
- Traducción al inglés del contenido (la redacta Claude, la revisa Guillermo).
- Tema claro: implementar tras pulir el oscuro.
