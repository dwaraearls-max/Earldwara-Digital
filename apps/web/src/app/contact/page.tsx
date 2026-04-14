import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/marketing/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

  return (
    <Container>
      <div className="py-10 sm:py-14">
        <PageHeader
          eyebrow="Contact"
          title="Book a strategy call. Get a clear plan."
          description="Tell us what you are building. We respond with a conversion-first strategy and next steps."
        />

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card/20 p-6 sm:p-8">
            <ContactForm />
          </div>

          <div className="rounded-3xl border border-border bg-card/20 p-6 sm:p-8">
            <div className="text-sm font-semibold text-accent-gold">Booking integration</div>
            <p className="mt-3 text-sm leading-6 text-muted">
              Prefer to schedule directly? Use your booking link below. We recommend keeping booking UX frictionless and fast.
            </p>

            <div className="mt-5">
              {bookingUrl ? (
                <iframe
                  title="Book a call"
                  src={bookingUrl}
                  className="h-[520px] w-full rounded-2xl border border-border bg-bg"
                  loading="lazy"
                />
              ) : (
                <div className="rounded-2xl border border-border bg-card/30 p-5 text-sm text-muted">
                  Set <span className="font-semibold text-fg">NEXT_PUBLIC_BOOKING_URL</span> to enable embedded scheduling.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
