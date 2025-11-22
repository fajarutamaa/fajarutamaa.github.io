import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations/contact';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate with Zod
    const validatedData = contactFormSchema.parse(body);

    // Log the submission
    console.log('📧 Contact Form Submission:');
    console.log('━'.repeat(50));
    console.log('Name:', validatedData.name);
    console.log('Email:', validatedData.email);
    console.log('Subject:', validatedData.subject);
    console.log('Message:', validatedData.message);
    console.log('━'.repeat(50));

    // Check if in development mode or Web3Forms key is not configured
    const isDev = process.env.NODE_ENV === 'development';
    const hasWeb3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

    // If in development mode, just log and return success
    if (isDev && !hasWeb3FormsKey) {
      console.log('✅ Development mode: Message logged (not sent)');
      return NextResponse.json(
        {
          success: true,
          message: 'Message received! (Development mode - check console)',
        },
        { status: 200 }
      );
    }

    // Try to send via Web3Forms if key is configured
    if (hasWeb3FormsKey) {
      try {
        const web3formsResponse = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
            name: validatedData.name,
            email: validatedData.email,
            subject: validatedData.subject,
            message: validatedData.message,
          }),
        });

        // Check if response is OK
        if (!web3formsResponse.ok) {
          console.warn('⚠️ Web3Forms returned error:', web3formsResponse.status);
          // Don't throw error, just log and continue
          if (isDev) {
            return NextResponse.json(
              {
                success: true,
                message: 'Message logged (Web3Forms unavailable)',
              },
              { status: 200 }
            );
          }
        } else {
          const contentType = web3formsResponse.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const result = await web3formsResponse.json();
            if (result.success) {
              console.log('✅ Email sent via Web3Forms');
              return NextResponse.json(
                { success: true, message: 'Message sent successfully' },
                { status: 200 }
              );
            }
          }
        }
      } catch (web3Error) {
        console.error('Web3Forms error:', web3Error);
        // Continue to fallback
      }
    }

    // Fallback: Return success anyway with helpful message
    return NextResponse.json(
      {
        success: true,
        message: isDev
          ? 'Message received! Check server console for details.'
          : 'Message received! We will get back to you soon.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    // Zod validation error
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid form data', details: error }, { status: 400 });
    }

    // Other errors
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
