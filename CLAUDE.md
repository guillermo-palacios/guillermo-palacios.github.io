# CLAUDE.md

Portfolio personal estático y bilingüe (ES/EN) de Guillermo Palacios García, Ingeniero de Software.

## Fuente de verdad

La especificación completa está en `docs/PORTFOLIO_SPEC.md`. Consúltala (no la cargues entera por defecto) cuando la tarea toque:

- Textos o datos personales → §4 y §6
- Estructura y orden de secciones → §5
- Diseño, paleta, glass, tipografía → §7
- Accesibilidad → §8 · Rendimiento → §9 · Criterios de aceptación → §11

La spec manda en contenido y diseño; `docs/PLAN.md` manda en arquitectura y orden de trabajo. Ante un conflicto entre ellos, preguntar.

Plan y tareas en docs/PLAN.md: lee solo la tarea en curso.

## Reglas que no se negocian

- **No inventar datos.** Lo que no esté en la spec se marca `TODO` visible y se pregunta. Nada de cifras de impacto ni métricas Lighthouse estimadas.
- **Ningún texto de contenido dentro de los componentes.** Todo va en `src/content/es.json` / `src/content/en.json`.
- **Sin dependencias fuera de lo acordado:** nada de librerías de UI, iconos, animación, WebGL, CMS ni backend. React solo como isla si hay interactividad real.
- Si una sección tiene un array vacío (p. ej. `certifications: []`), no se renderiza.

## Stack

Astro + TypeScript (strict) + Tailwind CSS. Salida 100 % estática. Rutas `/es/` (por defecto) y `/en/` con `hreflang`.

## Comandos

Scripts previstos (todavía no existen; se crean con el andamiaje):

- `npm run dev`: servidor local
- `npm run build`: build de producción
- `npm run lint`: ESLint + Prettier
- `npm run check`: `astro check` (tipos)

- El hook de pre-commit ejecuta `lint` + `check` en cada commit.
- `npm run build` debe pasar antes de hacer merge a `main`.

## Convenciones

- Componentes Astro pequeños y sin JS por defecto. El JS total se limita al toggle de tema, el selector de idioma y el menú móvil.
- Colores siempre mediante tokens CSS (`:root` y `:root[data-theme="light"]`), nunca valores sueltos.
- Iconos como SVG inline. Imágenes en AVIF/WebP con `width`/`height`.
- HTML semántico, un solo `<h1>`, foco visible, áreas táctiles de 44×44 px como mínimo.
- Primero se pule el tema oscuro y después el claro.

## Git

- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`).
- Una rama por funcionalidad (`feat/...`, `fix/...`); merge directo a `main` cuando `build` pase (lint y check los garantiza el hook). Sin Pull Requests salvo que se pidan.
- **Confirmar con el usuario qué entra en cada commit** antes de hacerlo.
- Nunca versionar `ContenidoMedia/`: está en `.gitignore`. Solo se versiona lo que acaba en `src/assets/` y `public/`.

## Entorno

- Windows 11, PowerShell. No uses sintaxis bash (`rm -rf`, `cp`, `&&` encadenado sin comprobar) ni rutas Unix.
- Respuestas y mensajes de commit en español; comentarios de código y nombres de variables en inglés.

## Material en bruto (`ContenidoMedia/`)

- Contiene CV (PDF), capturas de MoodNest, documentación del TFG y retrato. **No lo leas salvo que la tarea lo requiera.**
- Imágenes: optimizar a AVIF/WebP y colocar en `src/assets/`. CV: copiar a `public/`.

## Despliegue

- GitHub Pages mediante GitHub Actions (plantilla oficial de Astro).
- Repositorio previsto: `guillermo-palacios.github.io` (sin `base`). Si cambia el nombre, hay que configurar `site` y `base` en `astro.config`.
- Dominio propio `guillermopalacios.dev` pendiente de conectar más adelante.

## Cuando dudes

Si una decisión de diseño, contenido o dependencia no está en la spec, pregunta antes de implementarla.