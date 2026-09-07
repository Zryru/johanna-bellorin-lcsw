# Requisitos legales y de cumplimiento — sitio de Johanna Bellorín, LCSW

Checklist de lo que el sitio necesita para publicarse sin exponer a Johanna,
con las fuentes de cada punto para que se pueda verificar sin fiarse de este
documento.

**No es asesoramiento jurídico.** Es el resultado de investigar qué se
aplica a una consulta privada de teleterapia en Nueva York. Un sitio de
salud mental en Estados Unidos merece una revisión por un abogado sanitario
antes de publicarse, y la última tarea de la fase 4 del plan es
precisamente eso.

Contexto que determina qué aplica: LCSW con licencia del Estado de Nueva
York, teleterapia únicamente, sin consulta física, clientes con seguro a
través de Headway y de pago privado a través de SimplePractice. Al facturar
seguros electrónicamente es **covered entity** de HIPAA, así que HIPAA
aplica de lleno y no como precaución teórica.

---

## 1. Avisos obligatorios en el sitio

### 1.1 Good Faith Estimate (No Surprises Act)

**Estado: falta, y es el hueco más concreto que tenía el plan original.**

Los proveedores tienen que dar una estimación escrita de coste a los
pacientes sin seguro o que pagan de su bolsillo, y el aviso informando de
ese derecho tiene que estar visible en el sitio web, además de en el punto
donde se agenda ([CMS](https://www.cms.gov/initiatives/your-patient-rights/medical-bill-rights/know-your-medical-bill-rights/know-your-medical-bill-rights-when-not-using-insurance)).
La estimación se entrega al agendar, o dentro de tres días hábiles si el
cliente la pide ([Holland & Hart](https://www.hollandhart.com/no-surprise-billing-rules-good-faith-estimates-and-unscheduled-services)).

**Ojo con la confusión:** esto no obliga a publicar tarifas. Obliga a
informar del derecho a pedir una estimación. Se puede tener la web sin una
sola cifra y cumplir perfectamente, que es exactamente lo que se ha
decidido hacer.

Ubicación: bloque propio en `/info`, no una nota al pie. CMS publica un
modelo de aviso que conviene seguir de cerca en lugar de redactar uno
nuevo.

*Contenido reformulado para cumplir con licencias.*

### 1.2 Aviso de emergencia y crisis

**Estado: previsto en el plan original, se mantiene.**

En el footer de todas las páginas y destacado en `/contact`: ante una
emergencia médica o de salud mental, llamar al 911, acudir a urgencias, o
llamar o enviar un mensaje al 988 (Suicide & Crisis Lifeline).

En un sitio de terapia esto no es burocracia. Alguien en crisis puede
aterrizar en la web a las tres de la mañana, y el aviso tiene que estar
donde lo vea sin buscarlo.

### 1.3 Ámbito de licencia y jurisdicción

**Estado: parcialmente previsto, hay que ampliarlo.**

Dos afirmaciones distintas, las dos necesarias:

- La credencial: *Licensed Clinical Social Worker in the State of New York*,
  con número de licencia.
- La jurisdicción de teleterapia: las sesiones requieren que el cliente esté
  **físicamente en el Estado de Nueva York** en el momento de la sesión. No
  basta con que sea residente.

Se generan desde `practice.ts` (`credential`, `licensedStates`), no se
escriben a mano, porque Florida entra en el futuro.

Sobre el futuro multiestado: el Social Work Licensure Compact iba por 32
estados en mayo de 2026, pero la emisión de licencias multiestado seguía en
implementación ([Social Work Licensure Compact](https://swcompact.org/2026/06/02/social-work-licensure-compact-faqs-2/)).
La regla segura hoy es Nueva York y nada más. Cuando llegue Florida, hará
falta licencia propia allí o registro como proveedora de telesalud de fuera
del estado.

*Contenido reformulado para cumplir con licencias.*

### 1.4 Aviso en el formulario de contacto

Que el canal es para consultas generales y logística, y que no se incluya
información clínica ni médica. Necesario, pero **no suficiente por sí
solo**: ver sección 3.

### 1.5 Disclaimer de no-relación terapéutica

**Estado: faltaba en el plan original.**

Que el sitio es informativo, que no crea una relación terapeuta-cliente y
que no constituye consejo médico ni sustituye a una evaluación
profesional. Va en el footer o en las páginas legales.

---

## 2. Documentos legales: son tres, no uno

El plan original los mezclaba en una sola página `/privacy`. Tienen
funciones distintas y públicos distintos.

| Documento | Ruta | Qué cubre |
|---|---|---|
| **Política de privacidad web** | `/privacy` | Datos del formulario, analítica, cookies, terceros, retención. Habla del visitante de la web |
| **Notice of Privacy Practices (NPP)** | `/notice-of-privacy-practices` | Cómo se maneja la información sanitaria protegida de los clientes. Es un requisito de HIPAA y habla del cliente en tratamiento |
| **Declaración de accesibilidad** | `/accessibility` | Nivel de conformidad, limitaciones conocidas, canal de contacto para reportar barreras |

El NPP no es opcional siendo covered entity. Su contenido tiene requisitos
formales concretos, y aquí conviene partir de una plantilla profesional o de
la que le facilite su asesor, no redactarla desde cero.

---

## 3. BAA: quién firma y quién no

Un Business Associate Agreement es el contrato que HIPAA exige a cualquier
proveedor externo que toque información sanitaria en nombre de la
profesional. Sin BAA firmado, meter datos clínicos en ese servicio es
incumplimiento, por bien configurado que esté el servicio.

| Servicio | ¿BAA? | Consecuencia para el proyecto |
|---|---|---|
| **SimplePractice** | Sí | Su canal clínico. Reserva y pago privado, y el Secure Messaging del portal |
| **Headway** | Sí | Destino de reserva para clientes con seguro |
| **Google Workspace** | Sí, con condiciones | Buzón profesional válido. Ver abajo |
| **Cloudflare** como alojamiento | No aplica | Servir HTML y CSS no toca información sanitaria |
| **Cloudflare Workers** procesando el formulario | **No** en el plan gratuito | Cloudflare solo firma BAA en Enterprise. Riesgo residual aceptado, ver sección 3.4 |
| **Resend** enviando el aviso | **No** | Mismo caso que el Worker |
| **Cloudflare Web Analytics** | No aplica | Sin cookies y sin datos personales |
| **Cloudflare Turnstile** | No aplica | Sin cookies y sin seguimiento de usuarios |

**Nota sobre Google Workspace.** Firma BAA, pero hace falta un plan de pago
gestionado por organización, y un
superadministrador tiene que aceptarlo en la consola de administración, en
la sección legal y de cumplimiento. Las cuentas gratuitas de Gmail nunca
califican ([Google](https://support.google.com/a/answer/3407054),
[Accountable](https://www.accountablehq.com/post/is-google-workspace-hipaa-compliant-baa-requirements-and-setup)).

Es decir: `johanna@sudominio.com` con Workspace de pago y BAA aceptado, sí.
Un `gmail.com` personal reenviando lo mismo, no.

Y un matiz que se pasa por alto: el BAA cubre a Google, no cubre que el
correo llegue en claro a la bandeja de un cliente en cualquier proveedor. Lo
clínico debe ir por el Secure Messaging del portal de SimplePractice, no por
correo. Ver 3.5.

*Contenido reformulado para cumplir con licencias.*

### 3.1 Alojar no es procesar

Esta distinción es la que desbloquea todo el asunto del formulario.

**Alojar el sitio no plantea ningún problema.** HTML, CSS e imágenes son
archivos estáticos; el proveedor no es business associate por entregarlos.
Valía para Netlify y vale para Cloudflare.

**Procesar el envío del formulario sí toca el dato.** Y ahí importa quién
firma y quién no.

Por eso el alojamiento y el formulario son dos decisiones separadas, y por
eso cambiar de proveedor de alojamiento no resuelve por sí solo nada del
cumplimiento.

### 3.2 El principio: la cadena completa

El BAA tiene que cubrir a **todos** los que tocan el dato, no solo al
último. Poner un buzón con BAA al final no arregla que un eslabón intermedio
no lo tenga.

Cadena que **no** vale, aunque el buzón esté cubierto:

```
navegador → un procesador que recibe Y ALMACENA sin BAA → buzón con BAA
```

Cadena plenamente cubierta:

```
navegador → endpoint con BAA (SimplePractice / Paubox / Jotform HIPAA) → buzón con BAA
```

Cadena adoptada, con riesgo residual aceptado y explicado en 3.4:

```
navegador → Worker de Cloudflare (valida, NO almacena) → Resend → buzón con BAA
```

### 3.3 Cloudflare solo firma BAA en Enterprise

Cloudflare sí ofrece BAA, pero está reservado a clientes Enterprise
([Paubox](https://www.paubox.com/blog/cloudflare-hipaa-compliant),
[Accountable](https://www.accountablehq.com/post/is-cloudflare-hipaa-compliant-baa-phi-and-security-explained)).
En el plan gratuito no hay BAA, así que un Worker que procese el formulario
no está cubierto. Resend tampoco lo firma.

*Contenido reformulado para cumplir con licencias.*

Esto no se arregla cambiando de proveedor: Netlify no lo firma en ningún
plan. La única forma de tener la cadena plenamente cubierta sin pagar es que
el dato vaya del navegador directo a un servicio con BAA, sin infraestructura
propia en medio.

### 3.4 Por qué se acepta el riesgo residual

**El formulario no recoge nada clínico.** Nombre, correo, teléfono, idioma y
un motivo de una lista cerrada y logística. Sin diagnóstico, sin síntomas,
sin descripción de lo que le pasa a nadie.

Sobre si eso es información sanitaria protegida, la posición estricta es más
conservadora de lo que la ley exige con claridad. En junio de 2024 un
tribunal federal del Distrito Norte de Texas, en *American Hospital
Association v. Becerra*, anuló la parte de la guía de OCR que sostenía que
combinar la IP de una persona con la visita a una página no autenticada sobre
condiciones de salud o proveedores constituía información sanitaria
identificable. El tribunal consideró que OCR excedió su autoridad y fue más
allá del significado literal de la definición legal, y OCR retiró después el
recurso ([HHS](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html),
[Norton Rose Fulbright](https://www.nortonrosefulbright.com/en-us/knowledge/publications/77cf7f04/applying-hipaa-to-online-tracking-technologies),
[Polsinelli](https://www.polsinelli.com/hipaa-health-information-privacy-security/publications/hhs-hipaa-web-tracking-guidance-takes-a-step-back-while-providers-grapple-with-latest-challenges)).

*Contenido reformulado para cumplir con licencias.*

**Dos matices honestos**, para no apoyarse en ese caso más de lo que
aguanta. Iba de seguimiento pasivo, no de alguien rellenando un formulario:
quien escribe su nombre y pide cita se identifica activamente con el fin de
recibir atención, que son hechos distintos. Y el tribunal dijo expresamente
que ningún otro elemento de la guía quedaba invalidado.

**El Worker no almacena nada.** Recibe, valida, convierte en correo y
termina. Sin KV, sin D1, sin logs con el contenido del envío. Es la
diferencia con Netlify Forms, que guardaba cada consulta en su panel
indefinidamente: menos datos en reposo es menos exposición.

**Con campo de texto libre esto no sería defendible.** Lo es porque no lo
hay. Si alguien añade un `textarea` en una iteración futura, este análisis
deja de aplicar y hay que volver a una cadena plenamente cubierta.

Decisión tomada por el cliente conociendo el intercambio, no por descuido. Y
sigue siendo una pregunta para su abogado o para quien le lleve el seguro de
responsabilidad profesional, que la contestan con más autoridad que este
documento.

### 3.5 El buzón de ella: necesario por su profesión, no por la web

Esto se confundió durante bastante tiempo en las conversaciones del
proyecto, así que queda escrito.

Ella es terapeuta. Se va a escribir por correo con clientes reales sobre
citas, cambios de hora, facturas y superbills. Su bandeja de entrada va a
contener información sanitaria protegida desde la primera semana, **exista
esta web o no exista**.

El buzón profesional con BAA es por tanto un requisito de tener consulta
privada, no un coste que genere nuestro formulario. Si en el futuro alguien
se pregunta por qué se paga ese correo y piensa en cancelarlo, la respuesta
no está en la web.

**Su regla de higiene** debería ser: lo clínico por el Secure Messaging del
portal de SimplePractice, el correo solo para logística. Funciona, pero tiene
un agujero que no depende de ella: no puede controlar lo que le llega.
Escribe "¿te va bien el jueves?" y alguien contesta con tres párrafos sobre
su semana. Con un buzón cubierto eso deja de ser un problema; con un correo
gratuito, no se arregla con disciplina propia.

### 3.6 Proveedores con BAA y su formato de integración

Se conserva por si el formulario cambia de forma en el futuro.

| Proveedor | Formato | Consecuencia de diseño |
|---|---|---|
| **SimplePractice** | Widget incrustable: solicitud de cita y formulario de contacto integrado | Ya lo paga y ya tiene BAA. Botón reestilizable; el resto del control visual sin verificar |
| **Paubox** | Endpoint de API, envío programático. API incluida en todos los planes de pago | Permite conservar marcado y CSS propios. La mejor opción si hace falta cobertura completa con diseño propio |
| **Jotform HIPAA** | URL de API específica para HIPAA, y opción de incrustar | Equivalente a Paubox |
| **Hushmail para sanidad** | Solo iframe. Logo personalizable únicamente en su plan superior, y avisan de incompatibilidades con algunos constructores | Peor encaje visual. A cambio junta correo y formularios en un producto pensado para terapeutas |

*Contenido reformulado para cumplir con licencias.*

**Decidido:** formulario simple sin texto libre, Worker de Cloudflare y
Resend. El detalle de implementación y la tabla de lo descartado están en
`plan.md` sección 7.

---

## 4. Tecnologías de seguimiento: la línea roja

**Nunca añadir píxeles publicitarios ni analítica que identifique
usuarios.** Meta Pixel, Google Ads remarketing y GA4 en el sitio de una
consulta de salud mental son una exposición seria bajo HIPAA: revelan a un
tercero que una persona concreta estuvo buscando tratamiento psicológico.

Cloudflare Web Analytics sin cookies es la elección correcta y hay que
defenderla. La presión de "necesitamos medir conversiones" llega siempre
unos meses después del lanzamiento, cuando ya nadie recuerda por qué se
eligió así. Queda escrito aquí para ese momento.

Por el mismo motivo, en el plan: **Cloudflare Turnstile** como antispam en
lugar de reCAPTCHA, que es Google observando a cada visitante, y vídeo
autoalojado o en Cloudflare Stream o Vimeo en lugar de embed de YouTube, que
instala cookies de terceros.

**El objetivo medible: cero peticiones a dominios de terceros en toda la
página.** Con todo en Cloudflare es alcanzable, porque el beacon de analítica
se inyecta en el borde y sus datos van a `tudominio.com/cdn-cgi/rum` en lugar
de a un host externo, y las fuentes van autoalojadas. En una web de terapia
eso significa que el navegador de alguien que está buscando ayuda psicológica
no contacta con ningún dominio ajeno. Está como tarea de verificación en la
fase 3 del plan, porque conviene medirlo y no suponerlo.

---

## 5. Accesibilidad (ADA)

Nueva York es una de las jurisdicciones más activas en reclamaciones por
accesibilidad web contra negocios locales, y una consulta sanitaria es un
objetivo típico.

Punto de partida bueno: la maqueta tiene **AA verificado nodo a nodo**,
componiendo el color real de fondo incluido el degradado del hero, con
mínimo de 4.72:1 y cero fallos en escritorio y móvil. No es una estimación
a ojo.

Qué falta:

- **Repetir la auditoría** si se toca cualquier color al pasar a Astro. En
  las rondas de diseño hubo colores que pasaban a ojo y fallaban medidos.
- **Declaración de accesibilidad** en `/accessibility` con canal de
  contacto. Es lo que se espera encontrar.
- **`prefers-reduced-motion`** no negociable: con esa preferencia activada,
  la página completa sin una sola animación y sin perder contenido. Parte
  del público de un sitio de terapia tiene sensibilidad al movimiento en
  pantalla.
- **Menú móvil real.** Ahora el menú desaparece en pantallas estrechas, lo
  que deja la navegación inaccesible en móvil.
- La conformidad completa con WCAG requiere pruebas manuales con tecnología
  de asistencia y revisión experta. La auditoría automática cubre contraste,
  no cubre lectores de pantalla ni recorrido de teclado.

---

## 6. Ética profesional

### Sin testimonios de clientes

El código ético de NASW hace muy problemático solicitar testimonios a
clientes actuales, por el desequilibrio de poder inherente a la relación
terapéutica. Muchas webs de terapeutas los tienen; esta no debería.

Si hace falta prueba social, va por credenciales, formación, especialización
y afiliaciones profesionales. Es un punto a defender activamente, porque es
lo primero que sugiere cualquier consejo de marketing genérico.

### Cómo se describe lo que hace

Con licencia LCSW puede ejercer psicoterapia de forma independiente en
Nueva York, así que puede llamarse psicoterapeuta y describir diagnóstico y
tratamiento sin más matices ([NYSED](https://www.op.nysed.gov/professions/licensed-master-social-worker/faq-licensure-practice)).

Sobre la "R": NYSED eliminó el requisito de la designación LCSW-R para
reembolso de seguros. Quien la tiene la conserva, pero ya no hace falta
([NYSED](https://www.op.nysed.gov/releases/advisory-notices/elimination-of-the-r-privilege)).
Ser LCSW sin "R" no limita nada de lo planteado.

**Pendiente de confirmar antes de publicar:** que la credencial es
efectivamente LCSW. Su Instagram sigue diciendo LMSW, que en Nueva York solo
permite trabajo clínico bajo supervisión. Nos basamos en un documento
redactado por ella misma, que es fuente más fiable que una bio de red
social sin actualizar, pero publicar una credencial que no se tiene es mala
práctica profesional y quien se expone es ella. Una frase de confirmación
resuelve el asunto. Y que actualice Instagram, porque la incoherencia entre
las dos fuentes resta credibilidad justo en el momento de decidir.

*Contenido reformulado para cumplir con licencias.*

---

## 7. Identidad legal y datos reales

Antes de la primera publicación hay que sustituir todos los datos ficticios
de la maqueta. Actualmente lleva `hello@johannabellorin.com`,
`(212) 555-0148` y "Flatiron, New York, NY", todos inventados, y ese último
además describe una consulta física que no existe.

Necesario para el footer y las páginas legales:

- Nombre legal de la entidad. Si opera como PLLC, ese es el nombre que va en
  los términos, no el nombre comercial.
- Número de licencia LCSW del Estado de Nueva York.
- NPI, necesario para los superbills si los emite.
- Email y teléfono reales.

---

## 8. Temas a vigilar, no accionables hoy

### NYHIPA

La ley de privacidad de datos de salud de Nueva York fue vetada por la
gobernadora Hochul el 19 de diciembre de 2025, y revivió en 2026 como
S9269, con la decisión pendiente ([NYC Bar](https://www.nycbar.org/reports/support-revised-ny-health-information-privacy-act-2026/),
[Nixon Peabody](https://www.nixonpeabody.com/insights/alerts/2026/07/23/new-york-renews-push-to-enact-consumer-health-information-privacy-act-nyhipa)).
Si se aprueba, endurece el tratamiento de datos de salud más allá de HIPAA.

La defensa es de diseño y ya está tomada: si el sitio recoge lo mínimo y no
comparte nada con terceros, da igual cómo acabe la ley.

*Contenido reformulado para cumplir con licencias.*

### Sección 1557 de la ACA

El aviso de no discriminación aplica si recibe financiación federal, por
ejemplo Medicare o Medicaid. Si es consulta 100% privada y seguros
comerciales, probablemente no aplica. Está en `preguntas-abiertas.md` para
confirmarlo con ella.

### NY SHIELD Act

Obliga a salvaguardas razonables sobre datos privados de residentes de Nueva
York. La estrategia de recoger lo mínimo posible lo cubre de forma natural.

### Contrato con la práctica de grupo

`newyorkcitypsychotherapists.com` es el grupo con el que trabaja o ha
trabajado. Es habitual que estos acuerdos incluyan cláusulas de no
captación, y montar un canal propio de captación es justo el escenario que
esas cláusulas contemplan.

Es un asunto contractual, no de licencia, y no lo puede resolver quien
construye la web. Que lo revise ella antes de que el sitio se publique.

---

## 9. Checklist antes de publicar

- [ ] Credencial LCSW confirmada por ella explícitamente
- [ ] Instagram actualizado a LCSW
- [ ] Contrato con la práctica de grupo revisado
- [ ] Aviso de Good Faith Estimate publicado en `/info`
- [ ] Aviso de crisis en footer y `/contact`
- [ ] Jurisdicción de teleterapia visible y generada desde `practice.ts`
- [ ] Los tres documentos legales publicados en los dos idiomas
- [ ] BAA de Google Workspace aceptado y documentado con fecha
- [ ] Formulario sin campo de texto libre, con Turnstile y aviso
- [ ] Worker verificado sin persistencia: ni KV, ni D1, ni logs con el
      contenido del envío
- [ ] Cero peticiones a dominios de terceros, medido en el sitio real
- [ ] Cero píxeles publicitarios, cero reCAPTCHA, cero embeds de YouTube
- [ ] Buzón profesional con BAA en funcionamiento, y ella al tanto de que lo
      clínico va por el Secure Messaging del portal, no por correo
- [ ] Auditoría de contraste repetida sobre el sitio real
- [ ] Menú móvil funcionando
- [ ] `prefers-reduced-motion` verificado
- [ ] Sin testimonios de clientes
- [ ] Datos ficticios sustituidos por reales, incluido quitar "Flatiron"
- [ ] `noindex` de las maquetas de exploración eliminados
- [ ] Revisión por abogado sanitario de Estados Unidos
