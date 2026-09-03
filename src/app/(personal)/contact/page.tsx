import { Mail, MapPin, Clock } from 'lucide-react';
import { Toaster } from 'sonner';
import { ContactForm } from '@/components/contact/ContactForm';

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
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-10 animate-pageEnter">
      <section className="max-w-lg">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Get In Touch</h1>
        <p className="text-sm text-muted-foreground">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-10">
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">Contact Information</h2>
          <div className="space-y-3">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-border transition-colors text-sm"
                  >
                    <Icon size={14} className="text-muted-foreground shrink-0" />
                    <span className="text-foreground">{item.value}</span>
                  </a>
                );
              }
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border/50 text-sm"
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
          <h2 className="text-sm font-medium text-muted-foreground">Send a Message</h2>
          <ContactForm />
        </section>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
