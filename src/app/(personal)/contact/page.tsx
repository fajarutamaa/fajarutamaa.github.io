import { Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';
import { PageIntro } from '@/components/layout/PageIntro';

export const metadata = {
  title: 'Contact - Fajar Dwi Utomo',
  description: 'Get in touch with me for collaborations, opportunities, or just to say hi!',
};

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'fajardwiutomo75@gmail.com',
    href: 'mailto:fajardwiutomo75@gmail.com',
  },
  { icon: MapPin, label: 'Location', value: 'Indonesia' },
  { icon: Clock, label: 'Availability', value: 'Open for opportunities' },
];

export default function ContactPage() {
  return (
    <div className="site-container space-y-8 py-10 sm:space-y-10 sm:py-14">
      <PageIntro
        label="Contact"
        title="Get in touch"
        description="Have a project in mind, a question, or just want to say hello? I’d love to hear from you."
      />

      <div className="grid md:grid-cols-2 gap-10">
        <section className="space-y-4">
          <h2 className="section-title">Contact information</h2>
          <div className="space-y-3">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="interactive-card flex min-h-12 items-center gap-3 rounded-lg border bg-card px-3 text-sm"
                  >
                    <Icon size={14} className="text-muted-foreground shrink-0" />
                    <span className="break-all text-foreground">{item.value}</span>
                  </a>
                );
              }
              return (
                <div
                  key={item.label}
                  className="flex min-h-12 items-center gap-3 rounded-lg border bg-card px-3 text-sm"
                >
                  <Icon size={14} className="text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    {item.label}: {item.value}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="section-title">Send a message</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
