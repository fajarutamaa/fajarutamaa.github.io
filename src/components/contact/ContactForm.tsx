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
          className={`w-full px-4 py-2.5 text-sm rounded-xl glass-subtle transition-all duration-200 outline-none placeholder:text-muted-foreground/40 ${
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
          className={`w-full px-4 py-2.5 text-sm rounded-xl glass-subtle transition-all duration-200 outline-none placeholder:text-muted-foreground/40 ${
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
          className={`w-full px-4 py-2.5 text-sm rounded-xl glass-subtle transition-all duration-200 outline-none placeholder:text-muted-foreground/40 ${
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
          className={`w-full px-4 py-2.5 text-sm rounded-xl glass-subtle transition-all duration-200 outline-none resize-none placeholder:text-muted-foreground/40 ${
            errors.message ? 'border-red-400' : 'focus:border-foreground/30 focus:bg-background/80'
          }`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-5 py-2.5 glass-card rounded-xl text-sm font-medium hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
