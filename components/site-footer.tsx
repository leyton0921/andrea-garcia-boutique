import Link from "next/link"
import { AtSign, MessageCircle, Mail } from "lucide-react"
import { BUSINESS, whatsappLink } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <h3 className="font-heading text-2xl font-semibold tracking-wide">
            Andrea Garcia
          </h3>
          <p className="mt-3 max-w-xs text-sm font-light leading-relaxed text-sidebar-foreground/70">
            Boutique de ropa americana y spa de belleza. Estilo y cuidado en un
            solo lugar.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-sidebar-foreground/60">
            Navegación
          </h4>
          <ul className="mt-4 space-y-2 text-sm font-light">
            <li>
              <Link href="/ropa" className="hover:text-sidebar-primary">
                Boutique
              </Link>
            </li>
            <li>
              <Link href="/servicios" className="hover:text-sidebar-primary">
                Nails Spa
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-sidebar-primary">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-sidebar-foreground/60">
            Síguenos
          </h4>
          <div className="mt-4 flex gap-4">
            <a
              href={whatsappLink("Hola Andrea, quiero más información.")}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-sidebar-border p-2 transition-colors hover:border-sidebar-primary hover:text-sidebar-primary"
            >
              <MessageCircle className="size-5" />
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="rounded-full border border-sidebar-border p-2 transition-colors hover:border-sidebar-primary hover:text-sidebar-primary"
            >
              <AtSign className="size-5" />
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              aria-label="Correo"
              className="rounded-full border border-sidebar-border p-2 transition-colors hover:border-sidebar-primary hover:text-sidebar-primary"
            >
              <Mail className="size-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-sidebar-border/40 py-6 text-center text-xs font-light tracking-widest text-sidebar-foreground/50">
        © {new Date().getFullYear()} ANDREA GARCIA · TODOS LOS DERECHOS RESERVADOS
      </div>
    </footer>
  )
}
