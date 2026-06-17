export const BUSINESS = {
  name: "Andrea Garcia",
  whatsapp: "573023072418",
  instagram: "https://www.instagram.com/andreagnails3?utm_source=qr",
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
  "bolsos",
  "tops",
  "Otros",
]

export const SERVICE_CATEGORIES = [
  "Pestañas",
  "Uñas",
  "Cejas",
  "Combos",
  "Otros",
]
