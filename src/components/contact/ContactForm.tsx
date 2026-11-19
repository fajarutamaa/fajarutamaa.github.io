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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('name')}
          type="text"
          id="name"
          placeholder="Your name"
          className={`control-surface min-h-11 w-full rounded-xl px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground ${
            errors.name ? 'border-red-400' : 'focus:border-foreground/30 focus:bg-background/80'
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
          className={`control-surface min-h-11 w-full rounded-xl px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground ${
            errors.email ? 'border-red-400' : 'focus:border-foreground/30 focus:bg-background/80'
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
          className={`control-surface min-h-11 w-full rounded-xl px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground ${
            errors.subject ? 'border-red-400' : 'focus:border-foreground/30 focus:bg-background/80'
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
          className={`control-surface w-full resize-y rounded-xl px-4 py-2.5 text-sm transition-colors placeholder:text-muted-foreground ${
            errors.message ? 'border-red-400' : 'focus:border-foreground/30 focus:bg-background/80'
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="action-link w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
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

      <p className="text-xs text-muted-foreground text-center">
        Your information will be kept private.
      </p>
    </form>
  );
}
