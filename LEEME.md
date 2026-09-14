# Portfolio — versión 2

## Archivos que hay que reemplazar en GitHub

Sustituye el contenido completo de estos cuatro:

| Archivo | Qué cambia |
|---|---|
| `app/page.js` | Todo el diseño nuevo |
| `app/globals.css` | Paleta, tipografías, animaciones |
| `app/layout.js` | Carga de fuentes y SEO |
| `tailwind.config.js` | Simplificado |

`package.json`, `next.config.js` y `postcss.config.js` se quedan como están.

Nota: ya no se usa `lucide-react`. Puedes dejarlo en `package.json`, no molesta.

---

## Lo que tienes que cambiar antes de publicar

El correo y el LinkedIn ya están puestos (`j.telle@hotmail.com` y tu perfil real).

Si quieres poner tu apellido, está en dos sitios: el rail de escritorio y la cabecera móvil, ambos ponen solo `Joseba`.

---

## Añadir tu foto

1. Sube tu foto a `public/foto.jpg` (cuadrada, mínimo 400×400 px).
2. En `app/page.js`, busca la constante `PROFILE` casi al principio del archivo y cambia:

```js
const PROFILE = {
  photo: '/foto.jpg',
};
```

Aparece en el rail de escritorio y en la cabecera móvil, con un anillo animado y un efecto de color al pasar el ratón. Si dejas `photo: null`, sale un marco con tu inicial.

---

## Añadir tus capturas

1. Sube las imágenes a la carpeta `public/` del repositorio.
2. En `app/page.js`, dentro del array `SYSTEMS`, cambia `image: null` por la ruta:

```js
image: '/crm.jpg',
```

Cada bloque ya tiene el hueco con la proporción correcta y el `object-cover` puesto.
Recomendado: capturas de 1600×900 px, en JPG o WebP.

Si dejas `image: null`, sale un marco con el texto «captura pendiente».
Funciona, pero conviene poner algo antes de enviarlo a nadie.

---

## Sobre la llamada de la portada

El guion está en la constante `CALL`, arriba del archivo. Cada línea tiene
quién habla (`ia` o `persona`), el texto, y cuántos milisegundos dura antes
de que entre la siguiente. Si quieres alargar o acortar la escena, toca solo
los `ms`.

La clínica del guion es inventada. Si tienes permiso para nombrar a un cliente
real, cambiarlo suma bastante credibilidad.

---

## Qué hacer con esto

Sube los cuatro archivos a GitHub. Vercel reconstruye solo en un par de minutos.
