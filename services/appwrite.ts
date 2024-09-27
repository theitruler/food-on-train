import { Client, Account, Databases, Query } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);

export const account = new Account(client);
export const databases = new Databases(client);

export { client, Query };