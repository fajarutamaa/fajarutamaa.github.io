'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast.success('Message sent successfully!', {
        description: "I'll get back to you as soon as possible.",
      });

      reset();
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to send message', {
        description:
          error instanceof Error ? error.message : 'Please try again or email me directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Your name"
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-background transition-colors duration-200 outline-none ${
            errors.name
              ? 'border-red-400'
              : 'border-border hover:border-muted-foreground/30 focus:border-foreground/40'
          }`}
        />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
      </div>

      <div>
        <input
          {...register('email')}
          type="email"
          id="email"
          placeholder="your.email@example.com"
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-background transition-colors duration-200 outline-none ${
            errors.email
              ? 'border-red-400'
              : 'border-border hover:border-muted-foreground/30 focus:border-foreground/40'
          }`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
      </div>

      <div>
        <input
          {...register('subject')}
          type="text"
          id="subject"
          placeholder="What's this about?"
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-background transition-colors duration-200 outline-none ${
            errors.subject
              ? 'border-red-400'
              : 'border-border hover:border-muted-foreground/30 focus:border-foreground/40'
          }`}
        />
        {errors.subject && <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>}
      </div>

      <div>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          placeholder="Your message..."
          className={`w-full px-4 py-2.5 text-sm rounded-lg border bg-background transition-colors duration-200 outline-none resize-none ${
            errors.message
              ? 'border-red-400'
              : 'border-border hover:border-muted-foreground/30 focus:border-foreground/40'
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={14} className="animate-spin" />
            Sending
          </>
        ) : (
          <>
            <Send size={14} />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-muted-foreground/60 text-center">
        Your information will be kept private.
      </p>
    </form>
  );
}
