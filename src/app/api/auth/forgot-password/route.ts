import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/services/auth.service';
import { sendEmail } from '@/lib/mailer';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const token = await AuthService.forgotPassword(email);

    if (token) {
      try {
        const html = `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #f8fafc;">
            <div style="background-color: #0f172a; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
              <h1 style="color: #6366f1; margin: 0; font-size: 24px;">CaseMatrixDB</h1>
              <p style="color: #94a3b8; margin-top: 5px; font-size: 14px;">Terminal Access Recovery</p>
            </div>
            <div style="padding: 20px; background-color: white; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
              <h2 style="color: #1e293b; margin-top: 0;">Access Key Requested</h2>
              <p style="color: #475569; line-height: 1.6;">A request was made to reset the access key for your account. Please use the terminal code below to verify your identity.</p>
              
              <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; margin: 25px 0;">
                <span style="font-family: monospace; font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4338ca;">${token}</span>
              </div>
              
              <p style="color: #64748b; font-size: 12px; margin-top: 30px; border-top: 1px solid #f1f5f9; pt: 15px;">
                This code will expire in 1 hour. If you did not request this, please ignore this email or contact system administration.
              </p>
            </div>
          </div>
        `;

        await sendEmail(email, 'CaseMatrixDB: Access Recovery Key', html);
      } catch (err) {
        console.error('Failed to send email:', err);
      }
    }

    // Still log it for dev visibility
    console.log(`[AUTH] Reset token for ${email}: ${token}`);

    return NextResponse.json({
      message: 'If an account exists, a recovery key has been dispatched to your registered mail.',
      debugToken: process.env.NODE_ENV === 'development' ? token : undefined
    });
  } catch (error: unknown) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
