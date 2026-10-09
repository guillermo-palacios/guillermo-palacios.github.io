# Plan de arquitectura y tareas — Portfolio Guillermo Palacios

## Contexto
El repo solo tiene `docs/PORTFOLIO_SPEC.md`, `CLAUDE.md`, `.gitignore` y `.gitattributes` (`* text=auto eol=lf`). Remoto: `guillermo-palacios/guillermo-palacios.github.io`. Node 24.19 y npm 11.17 en local.

Jerarquía de documentos: la spec manda en contenido y diseño; este plan, en arquitectura y orden de trabajo. Ante un conflicto, se pregunta.

Decisiones acordadas que no estaban en la spec:
- **CV en inglés:** lo aporta Guillermo. Hasta entonces `/en/` enlaza al PDF en español, con `TODO` visible.
- **Esferas 3D:** el hero sale sin ellas y queda un slot preparado.
- **Hook pre-commit:** Git nativo, sin dependencias.
- **Extras aceptados:** `@astrojs/sitemap`, favicon + imagen OG (diseño `TODO`), `eslint-plugin-jsx-a11y`.
- **Rechazado:** detectar el idioma del navegador en `/`.
- **`noindex`** hasta el pre-lanzamiento (tarea 17).

## 1. Estructura de carpetas
```
.github/workflows/deploy.yml
.githooks/pre-commit
scripts/optimize-images.mjs        # one-off: ContenidoMedia → src/assets (sharp, devDependency con la versión de Astro)
public/
  cv/guillermo-palacios-garcia-cv-es.pdf   (+ -en.pdf)
  favicon.svg, og-es.png, og-en.png        (TODO diseño)
  robots.txt
src/
  config.ts                         # SITE_INDEXABLE = false, URLs base
  assets/portrait/  assets/moodnest/  assets/decor/ (vacío)
  components/
    layout/   Header, Nav, MobileMenu, LanguageSwitcher, ThemeToggle, SkipLink, SeoHead
    sections/ Hero, Experience, Projects, Stack, AiWorkflow, Education, Contact
    ui/       SectionCard, TechPill, GlassCard, Button, Icon, Todo
  content/    es.json, en.json, types.ts
  i18n/       config.ts, utils.ts
  layouts/    BaseLayout.astro
  pages/      [lang]/index.astro, index.astro (redirección)
  scripts/    theme-toggle.ts, tabs.ts
  styles/     global.css, fonts.css
```
- **`[lang]/index.astro` con `getStaticPaths`.** Descartado: páginas `es/` y `en/` duplicadas, porque terminan divergiendo.
- **Carpetas `layout/sections/ui`.** Descartado: una carpeta plana, poco navegable con unos 20 componentes.

## 2. Contenido e i18n
- **JSON plano + tipo TypeScript.** `types.ts` define `SiteContent`; los dos JSON se importan con `satisfies SiteContent`, de modo que si a `en.json` le falta una clave, `astro check` falla. Descartado: content collections con `file()`, porque añade esquema zod y `getEntry` para lo que es un único documento por idioma.
- **Forma del JSON:** `meta`, `ui` (nav, aria-labels, skip link, toggles), `hero`, `experience[]`, `projects[]`, `stack[]`, `ai[]`, `education`, `languages[]`, `certifications: []`, `contact`. Los datos invariables (email, URLs) se repiten en ambos archivos. Descartado: `shared.json`, un tercer origen para pocas cadenas.
- **`TODO`:** cadenas con prefijo `TODO`, resaltadas por `ui/Todo`.
- **Rutas:** i18n de Astro con `locales ['es','en']`, `defaultLocale 'es'` y `prefixDefaultLocale: true`. `/` es un HTML estático con meta refresh a `/es/` y canonical (se verifica en `dist/index.html`; si no se genera, se usa `pages/index.astro` con `Astro.redirect`). Descartado: un 301, que GitHub Pages no permite configurar.
- **hreflang:** `SeoHead` emite `alternate` es/en/x-default (→ `/es/`) con URLs absolutas, además de canonical, `og:locale` y `<html lang>`.
- **noindex:** `SeoHead` emite `<meta name="robots" content="noindex">` mientras `SITE_INDEXABLE` (en `src/config.ts`) valga `false`. Con `false`, `robots.txt` y el sitemap tampoco invitan a indexar.
- **Selector de idioma:** un enlace `<a hreflang lang>` sin JS. Descartado: un `<select>` con JS, que pesa más y es peor con teclado y lector de pantalla.

## 3. Tokens, Tailwind y tema
- **Tailwind v4** con `@tailwindcss/vite`. Descartado: v3 con `@astrojs/tailwind`, que está deprecada.
- **`global.css`:** en `:root`, los tokens oscuros de §7.2 (`--bg`, `--text`, `--text-muted`, `--accent`, `--btn-bg`, `--btn-text`, `--focus`, `--glass-bg`, `--glass-border`, `--surface-solid`) y `color-scheme: dark`. En `:root[data-theme="light"]`, los claros. `@theme inline` mapea `--color-*` y `--font-*` a esas variables, lo que da utilidades como `bg-bg`, `text-muted` o `text-accent`. Descartado: la variante `dark:`, que duplica clases y saca los colores de los tokens.
- **`.glass` y el mesh (`body::before`)** siguen §7.3: `@supports`, prefijo `-webkit-` y fallback para `prefers-reduced-transparency`/`prefers-contrast`.
- **Anchos:** `--container-page` (80rem, `max-w-page`) para la cabecera y `--container-section` (`max-w-section`, 4rem menos por lado, `--section-inset`) para el hero y las tarjetas de sección, con margen lateral `--section-gutter` (desde `lg`, el de la cabecera más 4rem).
- **Tema:** `:root` es oscuro. Hasta la tarea 13 el script fuerza oscuro salvo elección manual, para no mostrar un tema claro a medio pulir. Desde la tarea 13 se sigue `prefers-color-scheme` y luego la elección guardada, como pide §9. La desviación temporal queda anotada en la spec (tarea 2).
- **Anti-parpadeo:** `<script is:inline>` al principio del `<head>` (menos de 300 B). Lee `localStorage` dentro de `try/catch` y pone `data-theme` antes del primer pintado. Descartado: un script de módulo, que se ejecuta después de pintar y produce parpadeo.

## 4. Componentes
| Componente | Responsabilidad | JS |
|---|---|---|
| BaseLayout | `lang`, SeoHead, preload de fuentes, anti-parpadeo, landmarks, `<main id="main">` | inline |
| SeoHead | title, description, canonical, hreflang, OG, favicon, robots | — |
| SkipLink | Saltar al contenido | — |
| Header | Cabecera fija glass con logo, Nav, idioma, tema, CV y MobileMenu; desde `lg`, logo a la izquierda, Nav centrada y controles a la derecha | — |
| Nav | Anclas (lista compartida con MobileMenu) | — |
| MobileMenu | Popover API (`popovertarget`): botón con etiqueta fija (`ui.menu.label`) y el estado de `aria-expanded` nativo, sin cambiar el nombre; Esc y cierre al pulsar fuera nativos; un script mínimo lo cierra al pulsar un ancla y cuando el foco sale a la página | ~0,3 KB |
| LanguageSwitcher | Enlace al otro idioma: texto visible «EN»/«ES» (`ui.languageShort`) y nombre accesible «EN, English»/«ES, Español» | — |
| ThemeToggle | `<button>` sol/luna con dos etiquetas (`ui.theme.toLight` / `ui.theme.toDark`) que cambian con el estado, sin `aria-pressed`; guarda la elección | ~0,5 KB |
| Hero | h1, subtítulo, retrato `<Picture fetchpriority=high>`, CTAs, slot de decoración | — |
| Experience | Cordoware en SectionCard: datos y tecnologías (TechPill) a la izquierda, hitos en pestañas APG a la derecha | ~0,65 KB |
| Projects | Caso de estudio de MoodNest (capturas lazy) y portfolio con `TODO` | — |
| Stack | Áreas con chips principales y secundarios | — |
| AiWorkflow | Lista breve | — |
| Education | Grado, idiomas, formación, certificaciones (si `length > 0`) | — |
| Contact (footer) | Disponibilidad, modalidades, enlaces | — |
| ui/* | Piezas sin texto propio; todo llega por props | — |

- **MobileMenu con Popover API.** Descartado: un script propio con `aria-expanded`, que reimplementa Esc y el foco. Descartado: `<details>`, que no se cierra con Esc ni al pulsar fuera.
- **Sin React.** Descartado `@astrojs/react` para el toggle: unos 45 KB de runtime sin necesidad.
- **Icon:** mapa TypeScript de paths SVG (copiados de Tabler Icons v3.49.0, MIT, sin instalar el paquete).
- **JS total:** menos de 2 KB.

## 5. Fuentes e imágenes
- **Fuentes:** paquetes `@fontsource-variable/sora` e `inter`, pero con un `@font-face` propio que apunta solo al WOFF2 `latin` (`swap`). Preload de los dos archivos (importados con `?url`). Fallbacks `local('Arial')` con `size-adjust`, `ascent-override` y `descent-override` calculados y comentados; se verifican con el CLS. Descartado: la API `fonts` de Astro, porque la spec fija Fontsource. Descartado: Fontaine/Capsize, una dependencia más para dos números.
- **Imágenes** (`scripts/optimize-images.mjs`, se ejecuta a mano con sharp):
  - `RetratoProfesional.png` (771 KB) → `src/assets/portrait/portrait.webp`, **WebP con alfa, calidad 85–90 y unos 1200 px de ancho**. Es el máster ligero que se versiona.
  - Capturas → `src/assets/moodnest/moodnest-1..5.jpg` (recompresión ligera).
  - CV → `public/cv/` con nombre ASCII.
  - En build, `<Picture formats={['avif','webp']} widths sizes>` genera el `srcset`, el `width`/`height` y conserva la transparencia.
  - Descartado: versionar a mano los AVIF/WebP finales, porque se pierde el `srcset` automático. Descartado: versionar el PNG de 4 MB. Descartado: un máster PNG, más pesado que WebP con alfa y sin ventaja, ya que Astro reprocesa igualmente.
  - El script no corre en CI porque `ContenidoMedia/` no está versionado.

## 6. Calidad
- **TS:** `astro/tsconfigs/strictest`. Descartado `strict`, porque `strictest` añade `noUncheckedIndexedAccess`.
- **ESLint (flat config):** `typescript-eslint`, `eslint-plugin-astro` y `eslint-plugin-jsx-a11y` (`jsx-a11y-strict`), con `eslint-config-prettier` al final. ESLint 10, que es el que exige `eslint-plugin-astro` 3. `eslint-plugin-jsx-a11y` 6.10.2 aún declara ESLint ≤ 9 como peer, así que `overrides` en `package.json` lo alinea con el ESLint del proyecto. Se ha comprobado que sus reglas funcionan. Descartado: ESLint 9, que ya no tiene soporte y obliga a `eslint-plugin-astro` 1.x, con avisos de seguridad.
- **Prettier:** `endOfLine: "lf"`, `prettier-plugin-astro` y `prettier-plugin-tailwindcss`. Además, `.editorconfig` y `.vscode/extensions.json`.
- **`.prettierignore`:** `docs/`, `ContenidoMedia/`, `dist/`, `.astro/`, `CLAUDE.md` y `package-lock.json`. Se elige esto frente a formatear los .md porque la spec y CLAUDE.md son documentos de referencia editados a mano. Prettier reflowaría tablas y listas, generaría diffs de ruido en el documento que manda sobre el contenido y podría alterar comparaciones literales («textos idénticos a la spec»). El código, que es lo que importa, sigue formateado.
- **Scripts:** `dev`, `build`, `preview`, `check` (`astro check`), `lint` (`eslint . && prettier --check .`), `format` y `prepare` (`git config core.hooksPath .githooks`).
- **Hook `.githooks/pre-commit`:** `npm run lint && npm run check` en cada commit. `npm run build` tiene que pasar antes de cada merge a `main`. El CI repite las tres.

## 7. Despliegue
- **`astro.config.mjs`:** `site: 'https://guillermo-palacios.github.io'`, sin `base`, `trailingSlash: 'always'` e integración sitemap con i18n.
- **`deploy.yml`** (plantilla oficial de Astro con comprobaciones añadidas): `push` a `main` + `workflow_dispatch`; permisos `pages: write` e `id-token: write`; `concurrency: pages`.
  - Job `build`: checkout → `setup-node` 24 (caché npm) → `npm ci` → `lint` → `check` → `withastro/action`.
  - Job `deploy`: `actions/deploy-pages`.
- **Paso manual tuyo:** Settings → Pages → Source: «GitHub Actions».
- **Con dominio propio:** `public/CNAME`, cambiar `site` y configurar el DNS.

## 8. Tareas
Cada tarea va en su propia rama, con el contenido del commit confirmado contigo y merge a `main` cuando `build` pasa. Al completar una tarea se marca su casilla.

**Modo MVP (desde la tarea 9):** la verificación de cada tarea se limita a `lint`, `check`, `build` y a que no haya scroll horizontal a 390 y 1280 px, en ES y EN. Contraste, zoom, WCAG 1.4.12 y lector de pantalla solo si se piden; la auditoría completa queda para la tarea 14.

- [x] **1. `chore/scaffold`**: Astro + TS strictest + Tailwind v4 + sitemap + `astro.config` + `src/config.ts` (`SITE_INDEXABLE=false`); página placeholder con `noindex`.
  *Acepta:* `npm run dev` sirve la página; `build` y `check` pasan; `dist/` contiene `noindex`.
- [x] **2. `chore/quality`**: ESLint, Prettier, `.prettierignore`, `.editorconfig`, hook; spec §10 (hook = lint + check, build antes del merge) y §9 (nota: tema forzado a oscuro hasta la tarea 13).
  *Acepta:* `lint` pasa; un commit con un error de lint queda bloqueado; LF; spec, CLAUDE.md y plan coinciden.
- [x] **3. `chore/deploy`**: workflow de Pages.
  *Acepta:* un push a `main` publica el placeholder (con `noindex`) en `guillermo-palacios.github.io`.
- [x] **4. `feat/design-tokens`**: tokens, mesh, `.glass`, fuentes y fallbacks, tipografía base.
  *Acepta:* preload de 2 WOFF2 latin; el glass funciona y hay fallback sólido con `reduced-transparency`.
- [x] **5. `feat/i18n-content`**: `types.ts`, `es.json` literal de la spec, borrador de `en.json`, rutas, redirección y SeoHead.
  *Acepta:* `/es/` y `/en/` funcionan; `/` redirige; hreflang y `lang` correctos; quitar una clave de `en.json` hace fallar `check`.
- [x] **6. `feat/header`**: BaseLayout, SkipLink, Header, Nav, MobileMenu, LanguageSwitcher, ThemeToggle y anti-parpadeo.
  *Acepta:* todo operable con teclado; sin parpadeo; áreas táctiles ≥ 44 px; JS < 2 KB.
  *Nota:* ThemeToggle usa dos etiquetas (`ui.theme.toLight` / `ui.theme.toDark`) que cambian con el estado, sin `aria-pressed` (nunca ambas cosas).
- [x] **7. `chore/assets`**: script de imágenes, retrato WebP, capturas y CV.
  *Acepta:* `portrait.webp` < 300 KB (si no, se informa del peso real y se decide); el build genera AVIF y WebP.
  *Nota (resuelta):* botón «Descargar CV» (`ui.downloadCv`, spec §5) en `layout/CvLink`: en la barra desde `lg` y, por debajo, al final del panel del menú móvil. Rutas de los PDF en `CV_PATHS` (`src/config.ts`). Medido en ES y EN a 1024, 1280, 1366, 1440 y 1920 px, con y sin el espaciado de texto de WCAG 1.4.12: con el botón, la barra se desbordaba con 1.4.12 (ES: 54,5 px a 1024 y 30,5 px desde 1280; EN: 17,8 px a 1024). Se arregla sin mover la Nav, solo desde `lg`: enlaces de la Nav horizontal `px-2`, idioma `lg:px-2`, botón de CV `px-3` y gap de la barra `lg:gap-0.5`. Ahora quedan libres 74 px (ES) y 103 px (EN) a 1024, y 98 y 127 px desde 1280. Con 1.4.12 el logo pasa a dos líneas y no se sale nada; margen hasta desbordar: ES 9,5 px a 1024 y 33,5 px desde 1280; EN 46 y 70 px. El menú móvil no cambia. Ojo: en ES a 1024 px con el espaciado de WCAG 1.4.12 el margen es solo de 9,5 px; hay que volver a medir si cambian las etiquetas de la navegación y tras la revisión final de textos.
- [x] **8. `feat/hero`**.
  *Acepta:* un solo h1; el LCP es el retrato con `fetchpriority`; a 320 px no hay scroll horizontal.
  *Valorar (resuelto):* esferas descartadas; panel glass único.
  *Nota:* contenedor máximo de 80rem (`--container-page`, clase `max-w-page`), compartido por la cabecera, el hero y las secciones, con `--header-gap` como margen lateral; la medida de lectura (44.16em) no cambia. Espacio libre medido en la cabecera: a 1024 px no cambia, porque la barra ya ocupaba todo el ancho (ES 74 px, EN 103 px; con el espaciado de WCAG 1.4.12, margen hasta desbordar ES 9,5 px y EN 46 px, los mismos que en la tarea 7); a 1280 px, ES 330 px y EN 359 px (1.4.12: 265,5 y 302 px); desde 1366 px, ES 354 px y EN 383 px (1.4.12: 289,5 y 326 px).
  *Nota:* `ui.social.github` y `ui.social.linkedin` son el texto visible de las píldoras («GitHub», «LinkedIn») y su único nombre accesible, no un nombre descriptivo.
  *Nota:* el h1 lleva el nombre y el rol en dos `span` (`hero.name` y `hero.role`, en lugar de `hero.title`), cada uno en su línea y sin separador visible (spec §6.1); el rol va en `--accent` y algo más pequeño.
  *Nota:* el `alt` del retrato se escribe aquí (en los JSON). Las imágenes usan `<Picture>` con `fallbackFormat="webp"`: con un máster WebP, Astro genera por defecto el `<img>` de respaldo en PNG, mucho más pesado.
- [ ] **9. `feat/experience`**.
  *Acepta:* texto idéntico a §6.2; chips en monoespaciada.
  *Nota (resuelta):* las etiquetas de campo del JSON (`experience.labels`) vienen de nombres de campo de la spec y no están aprobadas como texto visible; se decide una a una cuáles se muestran y con qué texto. No se muestra ninguna como texto visible: ni `context` («Contexto» / «Context») ni `highlights` («Hitos» / «Highlights»); se quedan en el JSON. `highlights` es el nombre accesible (`aria-label`) de la lista de pestañas de los hitos (aprobado). El contexto va en el mismo párrafo que la descripción, detrás de ella.
  *Nota:* claves nuevas (aprobadas): `experience.technologiesLabel` («Tecnologías utilizadas» / «Technologies used»), título (h4) del recuadro de tecnologías; `experience.items[].highlights[].tab` («CRM», «Legacy», «Backend», iguales en ES y EN), etiqueta corta de cada pestaña, mientras el panel muestra el título completo como h4; y `ui.languageShort` («EN» / «ES»), texto visible del selector de idioma, cuyo nombre accesible es «EN, English» / «ES, Español» (mantiene `lang` y `hreflang`). El periodo ya no lleva «(6 meses)», como §6.2.
  *Nota:* ancho: el hero y las tarjetas de sección usan `--container-section` (`max-w-section`, 4rem menos por lado que `--container-page`, `--section-inset`) y, desde `lg`, el margen lateral `--section-gutter`, así que la barra de la cabecera sobresale a los lados; por debajo de `lg` miden lo mismo que la cabecera. La cabecera, desde `lg`, es una rejilla de tres columnas: logo a la izquierda, Nav centrada en la barra y controles (idioma, tema, CV) a la derecha; a 1024 px no desborda.
  *Nota:* mayúscula inicial al renderizar con `capitalizeFirst(texto, lang)` (`i18n/utils`, `toLocaleUpperCase`), sin tocar el JSON; no se aplica a nombres de tecnología (jQuery).
  *Nota (patrón para las secciones 10–12):* título de sección en pestaña con `ui/SectionCard`: el h2 va en una pestaña unida a la esquina superior izquierda de la tarjeta, con esquina cóncava en la unión. Pestaña y tarjeta comparten un único elemento glass (un `backdrop-filter` por sección), recortado con `clip-path`; el tamaño de la pestaña llega por unidades de contenedor (`cqw`/`cqh`). Con dos elementos glass había un escalón de hasta 3/255 en la unión, porque cada desenfoque solo ve su caja. Coste medido: cualquier `container-type` hace que Chromium maquete antes de que lleguen las fuentes y otra vez al llegar (+60 ms de primer pintado en local, sin diferencia apreciable con red y CPU limitadas).
  *Nota (compartido para las tareas 10 y 11):* las tecnologías son píldoras `ui/TechPill`, con el estilo de las de GitHub y LinkedIn del hero (borde sutil, mismo radio, icono y nombre visible en monoespaciada, §7.4), sin colores de marca y sin ser enlaces (sin hover, sin foco, cursor normal). Cada tecnología se resuelve por su texto exacto en el mapa de `TechPill.astro`; si falta, píldora sin icono y aviso en el build. Iconos de Tabler Icons v3.49.0 (MIT) en `ui/Icon`, copiados sin modificar: marca para C#, JavaScript, HTML5, CSS3 y Bootstrap, y genéricos donde Tabler no tiene marca: `server` (ASP.NET Framework), `database` (SQL Server) y `code` (jQuery).
  *Nota:* pestañas de los hitos según el patrón APG (`scripts/tabs.ts`, unos 650 B; JS total 1393 B). Sin JS, los hitos se apilan, cada uno con su h4. Con JS, los paneles comparten una celda de rejilla y los inactivos van con `visibility: hidden`, así que la altura no cambia. El cambio depende de `data-theme`, que el script anti-parpadeo pone antes del primer pintado.
- [ ] **10. `feat/projects`**.
  *Acepta:* caso de estudio escaneable; capturas lazy con `alt`; `TODO` visibles; sin botón de demo.
  *Nota:* las etiquetas de campo del JSON (`projects.labels`) vienen de nombres de campo de la spec y no están aprobadas como texto visible; se decide una a una cuáles se muestran y con qué texto.
  *Nota:* `ui/Todo` muestra los enlaces con `TODO` como texto resaltado, sin `href`.
  *Nota:* los `alt` de las cinco capturas (`src/assets/moodnest/moodnest-1..5.jpg`) se escriben aquí (en los JSON).
- [ ] **11. `feat/stack-ai`**.
  *Acepta:* dos niveles sin barras; sin hipérboles.
  *Nota:* las etiquetas de campo del JSON (`stack.columns`) vienen de nombres de campo de la spec y no están aprobadas como texto visible; se decide una a una cuáles se muestran y con qué texto.
  *Nota:* frase opcional de §6.5 (qué revisas siempre personalmente antes de aceptar cambios): pedírtela y, si la hay, añadirla como `ai.personalReview`, opcional en `types.ts`; si no, no se renderiza.
- [ ] **12. `feat/education-contact`**.
  *Acepta:* las certificaciones no se renderizan con `[]` y sí con un elemento de prueba; el footer tiene los tres enlaces.
  *Nota:* las etiquetas de campo del JSON (`education.languages.label`, `education.continuousLearning.label`, `education.certificationsLabel` y `contact.labels`) vienen de nombres de campo de la spec y no están aprobadas como texto visible; se decide una a una cuáles se muestran y con qué texto.
  *Pendiente tras esta tarea:* repartir el mesh por toda la página (aplazado en la tarea 8), ya con todas las secciones montadas, y remedir el contraste en los dos temas, incluidos los peores puntos del mesh.
  *Nota:* el reparto del mesh y el fondo de página con imagen por piezas (rama aparte, ver Pendientes) se deciden juntos.
- [ ] **13. `feat/light-theme`**: pulir el tema claro y activar `prefers-color-scheme`; quitar la nota de §9.
  *Acepta:* contraste ≥ 4,5:1 en los peores puntos del mesh; axe limpio en claro.
  *Nota:* el alfa de `--mesh-2` en el tema claro (0,07) está limitado por el contraste de `--accent` sobre el pico del mesh (4,73:1).
- [ ] **14. `chore/a11y-audit`**, en los dos temas.
  *Acepta:* Lighthouse ≥ 95 ×4 en móvil y escritorio; axe limpio; zoom al 200 % y 320 px correctos; navegación solo con teclado.
  *Nota:* repetir en toda la web la comprobación de WCAG 1.4.12 (line-height 1,5; letter-spacing 0,12em; word-spacing 0,16em; 2em tras los párrafos), que en la tarea 7 solo se hizo en la cabecera.
  *Nota:* probar la pestaña del título de sección (`ui/SectionCard`: `clip-path` + `backdrop-filter` + unidades de contenedor) en Firefox y Safari; en la tarea 9 solo se probó en Chromium (Edge).
  *Nota:* revisar el impacto de `container-type` en el LCP: en local añade unos 60 ms al primer pintado (Chromium maqueta antes de que lleguen las fuentes y otra vez al llegar); con red y CPU limitadas no se apreció diferencia. Medirlo con Lighthouse sobre el sitio desplegado.
  *Nota:* comprobar la compatibilidad con Safari 16 y la cuota real de ese navegador. La Popover API llega en Safari 17: sin ella, el panel del menú móvil no se oculta. Con esos datos se decide si hace falta un fallback (la tarea 6 no añadió ninguno).
- [ ] **15. `feat/seo-assets`**: favicon y OG (según tu diseño) + revisión de la traducción EN.
  *Acepta:* OG válido en el depurador de LinkedIn; EN revisado por ti.
  *Nota:* incluye una página 404 bilingüe, porque GitHub Pages sirve `404.html`.
- [ ] **16. `docs/metrics`**: Lighthouse real del sitio desplegado → JSON del proyecto 2.
  *Acepta:* cifras de una medición real, con el informe guardado.
- [ ] **17. `chore/pre-launch`**:
  - `SITE_INDEXABLE = true` (se quita `noindex`; `robots.txt` y el sitemap quedan activos).
  - `dist/` sin ningún `TODO` (búsqueda en el build).
  - CV en inglés en `public/cv/` y enlazado en `/en/`.
  - URLs reales de MoodNest y del portfolio.
  - Revisión manual de que los PDF de `public/cv/` no exponen teléfono ni dirección.
  - Sitemap configurado con i18n y `dist/` con las URLs de `/es/` y `/en/`.
  *Acepta:* los seis puntos verificados y el sitio indexable en producción.

## Verificación global
`npm run lint && npm run check && npm run build && npm run preview`. Después: axe y Lighthouse (móvil y escritorio, los dos temas) sobre `/es/` y `/en/`, navegación solo con teclado, 320 px, zoom al 200 % y una pasada sin `backdrop-filter`.

## Pendientes (`TODO`, no bloquean hasta la tarea 17)
favicon/OG · fondo de página con imagen por piezas (en una rama aparte) · URLs · meta descriptions · frase opcional de la sección de IA · métricas.
