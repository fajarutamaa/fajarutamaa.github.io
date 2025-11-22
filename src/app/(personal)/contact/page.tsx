import { Mail, MapPin, Clock } from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact - Fajar Dwi Utomo',
  description: 'Get in touch with me for collaborations, opportunities, or just to say hi!',
};

export default function ContactPage() {
  return (
    <div className="container max-w-[680px] lg:max-w-[900px] py-12 space-y-12">
      {/* Header */}
      <section className="space-y-4 text-center animate-fadeIn">
        <h1 className="text-4xl font-bold">Get In Touch</h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          I&apos;m always open to discussing new projects, creative ideas, or opportunities to be
          part of your visions.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <section className="space-y-8 animate-fadeIn" style={{ animationDelay: '100ms' }}>
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <Mail className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Email</h3>
                  <a
                    href="mailto:fajardwiutomo75@gmail.com"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    fajardwiutomo75@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <MapPin className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <Clock className="text-primary mt-1" size={20} />
                <div>
                  <h3 className="font-medium mb-1">Availability</h3>
                  <p className="text-sm text-muted-foreground">Open for opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="animate-fadeIn" style={{ animationDelay: '200ms' }}>
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
