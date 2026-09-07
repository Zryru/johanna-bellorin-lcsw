/**
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  TEXTOS LEGALMENTE EXIGIDOS — NO MODIFICAR SIN REVISIÓN LEGAL        ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Este archivo NO es contenido editable. Está fuera de `src/content/` a
 * propósito, para que no se confunda con la prosa que sí se puede reescribir.
 *
 * Cada texto de aquí cumple una obligación concreta, documentada en
 * `docs/legal.md`. Suavizarlos, acortarlos o "hacerlos más cálidos" rompe el
 * cumplimiento, aunque suenen secos al lado del resto del sitio. Suenan secos
 * a propósito: alguien en crisis a las tres de la mañana no necesita ingenio,
 * necesita un número de teléfono.
 *
 * SI TE HAN PEDIDO MEJORAR EL TONO DE LA WEB: este archivo no entra. El tono
 * se trabaja en `src/content/`. Ver `docs/voz-y-contenido.md`.
 *
 * Para cambiar algo de aquí hace falta la revisión de un abogado sanitario de
 * Estados Unidos, que además es una tarea pendiente antes de publicar.
 */

import type { LocaleCode } from './practice';

type LegalNotice = Record<LocaleCode, string>;

/**
 * Aviso de emergencia y crisis.
 * Obligación: va en el pie de todas las páginas y destacado en contacto.
 * Ver docs/legal.md sección 1.2.
 */
export const crisisNotice: LegalNotice = {
  en: 'If you are experiencing a medical or mental health emergency, call 911, go to your nearest emergency room, or call or text 988 to reach the Suicide & Crisis Lifeline.',
  es: 'Si estás viviendo una emergencia médica o de salud mental, llama al 911, ve a la sala de emergencias más cercana, o llama o envía un mensaje de texto al 988 para comunicarte con la Línea de Prevención del Suicidio y Crisis.',
};

/**
 * Aviso del derecho a un Good Faith Estimate (No Surprises Act).
 * Obligación: tiene que estar visible en el sitio web, no solo en la consulta.
 * OJO: esto NO obliga a publicar tarifas. Informa del derecho a pedir una
 * estimación escrita. Se puede tener la web sin una sola cifra y cumplir.
 * Ver docs/legal.md sección 1.1.
 */
export const goodFaithEstimateNotice: LegalNotice = {
  en: 'You have the right to receive a Good Faith Estimate explaining how much your care will cost. Under the law, health care providers need to give patients who do not have insurance or who are not using insurance an estimate of the expected charges for services. You can ask for a Good Faith Estimate before you schedule a service, and you have the right to receive one in writing at least one business day before your session.',
  es: 'Tienes derecho a recibir una estimación de buena fe (Good Faith Estimate) que explique cuánto va a costar tu atención. Según la ley, los proveedores de salud deben entregar a las personas que no tienen seguro, o que eligen no usarlo, una estimación de los cargos previstos por los servicios. Puedes solicitar esta estimación antes de agendar, y tienes derecho a recibirla por escrito al menos un día hábil antes de tu sesión.',
};

/**
 * Aviso sobre el uso del formulario de contacto.
 * Obligación: el canal es para logística, no para información clínica.
 * Necesario pero no suficiente por sí solo; lo que sostiene el cumplimiento es
 * la arquitectura del formulario. Ver docs/legal.md secciones 1.4 y 3.
 */
export const contactFormNotice: LegalNotice = {
  en: 'Please use this form for general questions and scheduling only. Do not include confidential medical or clinical information here.',
  es: 'Por favor usa este formulario solo para preguntas generales y para agendar. No incluyas información médica o clínica confidencial aquí.',
};

/**
 * Disclaimer de no-relación terapéutica.
 * Obligación: el sitio es informativo y no crea relación terapeuta-cliente.
 * Ver docs/legal.md sección 1.5.
 */
export const noRelationshipDisclaimer: LegalNotice = {
  en: 'The information on this website is for general purposes only. It is not medical advice, it does not replace a professional evaluation, and using this site does not create a therapist-client relationship.',
  es: 'La información de este sitio es de carácter general. No constituye consejo médico, no reemplaza una evaluación profesional, y usar este sitio no establece una relación terapeuta-cliente.',
};

/**
 * Declaración de jurisdicción de teleterapia.
 * Obligación: el cliente tiene que estar FÍSICAMENTE en un estado donde ella
 * tenga licencia durante la sesión. No basta con ser residente.
 * Se genera desde `practice.licensedStates`, así que añadir Florida no requiere
 * tocar este texto. Ver docs/legal.md sección 1.3.
 */
export function jurisdictionNotice(locale: LocaleCode, stateNames: string): string {
  return locale === 'es'
    ? `Las sesiones se realizan en línea. Para poder atenderte, necesitas encontrarte físicamente en ${stateNames} en el momento de la sesión.`
    : `Sessions are held online. To work together, you need to be physically located in ${stateNames} at the time of your session.`;
}

/**
 * Declaración de licencia, para el pie.
 * Se genera desde `practice.credential` y `practice.licensedStates`.
 * Ver docs/legal.md sección 1.3.
 */
export function licenseStatement(
  locale: LocaleCode,
  credential: string,
  stateNames: string,
): string {
  return locale === 'es'
    ? `Trabajadora Social Clínica con Licencia (${credential}) en el estado de ${stateNames}.`
    : `Licensed Clinical Social Worker (${credential}) in the State of ${stateNames}.`;
}
