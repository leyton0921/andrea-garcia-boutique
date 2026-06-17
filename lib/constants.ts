// Configuración del negocio. Edita estos valores con tus datos reales.
export const BUSINESS = {
  name: "Andrea Garcia",
  // Número de WhatsApp en formato internacional sin signos (ej: Colombia 57 + número)
  whatsapp: "573023072418",
  instagram: "https://instagram.com",
  email: "contacto@andreagarcia.com",
  city: "Colombia",
}

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`
}

export const CLOTHING_CATEGORIES = [
  "Vestidos",
  "Blusas",
  "Pantalones",
  "Faldas",
  "Chaquetas",
  "Conjuntos",
  "Accesorios",
  "Calzado",
  "Otros",
]

export const SERVICE_CATEGORIES = [
  "Pestañas",
  "Uñas",
  "Cejas",
  "Combos",
  "Otros",
]
