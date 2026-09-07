# Preguntas abiertas y verificaciones pendientes

Todo lo que falta por confirmar, separado por quién lo tiene que resolver.
La sección 1 es la única que bloquea trabajo; el resto se puede ir
resolviendo mientras se construye.

---

## 1. Bloqueantes: sin esto no se puede publicar

| # | Pendiente | Por qué bloquea |
|---|---|---|
| 1 | **Confirmación explícita de la credencial LCSW** | Su Instagram dice LMSW, que en Nueva York solo permite trabajo clínico bajo supervisión. Nos basamos en un documento redactado por ella, que es fuente más fiable, pero publicar una credencial que no se tiene es mala práctica profesional y quien se expone es ella |
| 2 | **Revisión de su contrato con la práctica de grupo** | `newyorkcitypsychotherapists.com`. Si hay cláusula de no captación, montarle un embudo propio le puede dar un problema laboral. Es contractual, no de licencia, y no lo puede resolver quien construye la web |
| 3 | **Número de licencia LCSW de Nueva York y NPI** | Footer, páginas legales y superbills |
| 4 | **Email y teléfono reales** | La maqueta lleva datos inventados que no pueden salir a producción |
| 5 | **URL de su perfil de Headway y de su portal de SimplePractice** | Son los destinos de reserva. Sin ellas el embudo no existe |
| 6 | **Dominio** | Su nombre, sin tilde. Pendiente de comprobar disponibilidad y comprar |
| 7 | **Nombre legal de la entidad** | Si opera como PLLC, es el nombre que va en los términos legales |

---

## 2. Preguntas para Johanna

Lista lista para reenviar, agrupada por tema.

### Sobre su práctica

1. ¿Qué seguros acepta a través de Headway?
2. ¿Emite superbills a los clientes de pago privado, para que pidan
   reembolso por su cuenta?
3. ¿Cuánto dura una sesión?
4. ¿La consulta inicial es gratuita? ¿De cuántos minutos?
5. ¿Cuál es su política de cancelación? Headway y SimplePractice
   normalmente obligan a tener una, así que probablemente ya está definida.
6. ¿Con qué rango de edad trabaja? ¿Solo adultos, también adolescentes?
7. ¿Recibe financiación federal, Medicare o Medicaid? Si es todo seguros
   comerciales y pago privado, se descarta un requisito legal (aviso de no
   discriminación de la Sección 1557 de la ACA).
8. ¿Tiene perfil en Psychology Today? Suele ser la primera fuente de
   clientes de una consulta privada y conviene enlazarlo en los dos
   sentidos.

### Sobre el contenido

9. **Cuatro o cinco temas por los que la gente suele acudir a ella**, en sus
   palabras. Es lo que va en las tarjetas del bento grid y es la base del
   SEO. De todas las preguntas de contenido, esta es la que más rinde.
10. Su bio: formación, recorrido, lo que quiera contar.
11. ¿Qué la hizo meterse en esto? Es el material del que salen los mejores
    textos de `/about` y no está en `user.md`.
12. Un ejemplo concreto de cómo es una sesión con ella. Menciona el humor y
    las referencias de cultura pop; un ejemplo real vale más que la
    descripción abstracta.
13. ¿De qué país es? Para afinar el registro del español, que tiene que ser
    latinoamericano neutro y no de España.

### Logística

14. Fecha de la sesión de fotos. Sigue sin programar y los marcadores
    actuales son degradados de color.
15. Vídeo de presentación: hay que grabarlo. Recomendación: que hable suelta
    y se transcriba, que es cómo salió `user.md` y funcionó bien.
16. Que actualice su Instagram a LCSW. Cualquiera que la busque va a ver una
    credencial y la web otra, y esa incoherencia resta credibilidad justo en
    el momento de decidir.

### Sobre el correo y la privacidad

17. **¿Tiene ya un correo profesional en un dominio propio, o usa un Gmail
    personal?** Y si es profesional, ¿tiene BAA firmado con el proveedor?
    Ojo con un malentendido frecuente: SimplePractice **no le da un buzón**.
    Los campos de "account email" y "practice email" de su cuenta son
    direcciones que ella aporta, no direcciones que ellos alojen.
18. **¿Usa el Secure Messaging del portal de SimplePractice para conversar
    con clientes sobre temas clínicos?** Si la respuesta es sí, el canal
    clínico está resuelto y su correo queda para logística, que es la
    higiene correcta.

    Además es buen contenido para la web: decir que lo clínico se habla por
    el portal seguro y no por correo tranquiliza a quien se preocupa por su
    privacidad, y en salud mental hay bastante gente que se lo pregunta.

    El contexto de por qué esto importa está en `legal.md` sección 3.5.
    Resumen: su bandeja va a contener información sanitaria desde la primera
    semana por ser terapeuta, no por tener web, así que el buzón cubierto es
    un requisito de su consulta y no un coste que genere este proyecto.

---

## 3. Decisiones que Jorge tiene que tomar

| Decisión | Opciones | Recomendación |
|---|---|---|
| **Renombrar la carpeta del proyecto** | `astro-lcsw` funciona pero nació de la confusión LMSW/LCSW | Cosmético, pero conviene hacerlo pronto para no arrastrarlo meses |
| **Hosting del vídeo** | mp4 autoalojado, Cloudflare Stream o Vimeo | Autoalojado si es de un minuto. Nunca embed de YouTube, instala cookies de terceros |
| **Plan de Cloudflare** | Gratuito: 100.000 peticiones al día en Workers, recursos estáticos ilimitados, sin tope de ancho de banda | Empezar en gratuito. Falta comprobar el límite de builds mensuales |

---

## 4. Verificaciones visuales pendientes

Ninguna se detecta con auditoría automática. Hay que mirarlas en dispositivo
real. Están también en `plan.md` sección 5.

- [ ] **Cormorant Garamond 300 sobre el degradado, detrás de cristal, en un
      móvil real con luz de sol.** El contraste de color cumple AA con margen
      (mínimo 4.72:1) pero el contraste no mide grosor de trazo. Recambio ya
      evaluado si falla: Newsreader en peso ligero.
- [ ] **La tilde de Bellorín en Cormorant Unicase 600.** Es una fuente
      unicase, mayúsculas y minúsculas a la misma altura, así que un acento
      es un caso raro y puede quedar mal colocado. Si falla: wordmark en
      Cormorant Garamond, o ajustar el interlineado para dar aire al acento.
- [ ] **Rendimiento de `backdrop-filter` en Safari iOS.** Nav sticky con blur
      más varios paneles de cristal es el patrón que más castiga a Safari.
      Si va mal, reducir el blur fuera del hero, no eliminarlo.

### Comprobaciones técnicas

- [ ] **Límite de builds mensuales del plan gratuito de Cloudflare.** No está
      confirmado y conviene saberlo antes de configurar el despliegue
      automático.
- [ ] **Cero peticiones a dominios de terceros** en el sitio real. Es el
      argumento que sostiene la elección de Cloudflare, así que hay que
      medirlo y no suponerlo.
- [ ] **Que el Worker del formulario no deje rastro:** ni KV, ni D1, ni logs
      con el contenido del envío. Si se dejan logs de depuración con los
      datos, se rompe el razonamiento de `legal.md` sección 3.4.

---

## 5. Resuelto, para no volver a preguntarlo

Cosas que estuvieron en duda y ya están cerradas:

- **Idioma del sitio:** bilingüe inglés y español, con sesiones reales en
  ambos. El español es la apuesta principal de SEO.
- **Modalidad:** teleterapia únicamente, sin consulta física. "Flatiron" era
  información inventada en el plan original.
- **Servicios:** individual y pareja. Solo dos.
- **Tarifas en la web:** no se publican, como en las cuatro referencias del
  sector. Pero el aviso del derecho a un Good Faith Estimate sí es
  obligatorio, que es cosa distinta.
- **Sistemas de gestión:** Headway para seguros, SimplePractice para pago
  privado. No hay otro.
- **Grado de informalidad:** bastante humor, muy informal, "como si fuese tu
  amiga confidente". Ver `voz-y-contenido.md` sobre cómo se combina eso con
  la tipografía elegante.
- **La designación "R" del LCSW-R:** ya no se requiere para reembolso de
  seguros, NYSED la eliminó de ese uso. Ser LCSW sin "R" no limita nada.
- **Google Business Profile:** no es viable, los negocios exclusivamente
  online no son elegibles. El SEO va por búsquedas de intención.
- **El formulario:** simple, sin campo de texto libre, solo con motivo de una
  lista cerrada. Procesado por un Worker de Cloudflare que no almacena nada y
  reenvía por Resend. Sin widgets de terceros y sin proveedores de pago. El
  detalle y la tabla de lo descartado están en `plan.md` sección 7.
- **Proveedor de infraestructura:** todo en Cloudflare. Netlify estaba en el
  plan únicamente por sus formularios; al descartarlos desapareció la razón.
  Cloudflare no tiene sistema de créditos, permite dejar la página con cero
  peticiones a terceros y vende el dominio a precio de coste.
- **Antispam:** Cloudflare Turnstile, no honeypot y nunca reCAPTCHA.
- **El buzón profesional con BAA:** hace falta, pero por ser terapeuta y no
  por tener web. No es un coste del formulario. Ver `legal.md` sección 3.5.
