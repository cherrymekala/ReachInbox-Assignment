import gmail from './auth/gmailAuth';
import outlookClient from './auth/outlookAuth';
import { analyzeEmailContent } from './utils/openai';

async function processGmailEmails() {
  const res = await gmail.users.messages.list({ userId: 'me', maxResults: 5 });
  const messages = res.data.messages || [];

  for (const message of messages) {
    const msg = await gmail.users.messages.get({ userId: 'me', id: message.id! });
    const emailBody = Buffer.from(msg.data.payload?.body?.data || '', 'base64').toString('utf-8');
    const category = await analyzeEmailContent(emailBody);

    console.log(`Gmail Message ID: ${message.id}, Category: ${category}`);

  }
}

async function processOutlookEmails() {
  const messages = await outlookClient.api('/me/messages').top(5).get();

  for (const message of messages.value) {
    const category = await analyzeEmailContent(message.body.content);

    console.log(`Outlook Message ID: ${message.id}, Category: ${category}`);

  }
}

export { processGmailEmails, processOutlookEmails };
