import { Client } from '@microsoft/microsoft-graph-client';
import { DeviceCodeCredential } from '@azure/identity';
import dotenv from 'dotenv';

dotenv.config();

const { OUTLOOK_CLIENT_ID, OUTLOOK_CLIENT_SECRET, OUTLOOK_TENANT_ID } = process.env;

const credential = new DeviceCodeCredential({
  clientId: OUTLOOK_CLIENT_ID!,
  tenantId: OUTLOOK_TENANT_ID!,
});

const outlookClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const tokenResponse = await credential.getToken(['Mail.ReadWrite', 'Mail.Send']);
      return tokenResponse?.token!;
    },
  },
});

export default outlookClient;
