import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { MessageCircle, AtSign, Mail, MapPin } from "lucide-react"
import { BUSINESS, whatsappLink } from "@/lib/constants"

export default function ContactoPage() {
  return (
    <main className="min-h-screen">
      <SiteNavbar />

      <section className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-xs font-light uppercase tracking-[0.3em] text-accent">
          Contacto
        </p>
        <h1 className="mt-4 font-heading text-4xl font-light tracking-wide md:text-5xl">
          Hablemos
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-muted-foreground">
          ¿Tienes una duda sobre una prenda o quieres agendar tu cita en el spa?
          Estamos para ayudarte.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            size="lg"
            render={
              <a
                href={whatsappLink("Hola Andrea, quiero más información.")}
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            <MessageCircle className="mr-2 size-4" />
            Escríbenos por WhatsApp
          </Button>
        </div>

        <div className="mx-auto mt-14 grid max-w-xl gap-4 text-left sm:grid-cols-2">
          <ContactItem
            icon={<AtSign className="size-5" />}
            label="Instagram"
            value="@andreagarcia"
            href={BUSINESS.instagram}
          />
          <ContactItem
            icon={<Mail className="size-5" />}
            label="Correo"
            value={BUSINESS.email}
            href={`mailto:${BUSINESS.email}`}
          />
          <ContactItem
            icon={<MessageCircle className="size-5" />}
            label="WhatsApp"
            value="Chatea con nosotros"
            href={whatsappLink("Hola Andrea!")}
          />
          <ContactItem
            icon={<MapPin className="size-5" />}
            label="Ubicación"
            value={BUSINESS.city}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <div className="flex items-center gap-4 rounded-sm border border-border bg-card p-5 transition-colors hover:border-foreground">
      <span className="text-accent">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }
  return content
}
