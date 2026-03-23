import "server-only"
import { BrevoClient } from '@getbrevo/brevo';

const brevo = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY!,
});

export async function sendTempPasswordEmail(toEmail: string, tempPassword: string) {
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      subject: 'Välkommen til DICK',
      textContent: `Hej!\n\n Du har blivit medlem i DICK, DISKs Interna Catan Klubb\n\nLogga in på https://dick.fredriketsare.se/login med följande uppgifter:\n E-post:${toEmail} \nLösenord: ${tempPassword}\n\nVänligen byt lösenord när du loggat in.\n\n Med vänliga hälsningar,\n DICK, DISKs Interna Catan Klubb\nLignum Habes?`,
      sender: { name: 'DICK', email: 'dick@dick.su.se' },
      to: [{ email: toEmail }],
    });
  } catch (err) {
    throw err;
  }
}
