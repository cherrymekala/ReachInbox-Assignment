import { Queue, Worker } from 'bullmq';
import { processGmailEmails, processOutlookEmails } from './emailService';

// Redis connection configuration
const redisConfig = {
  host: '127.0.0.1', // Change to your Redis server's address
  port: 6379,        // Default Redis port
};

// Create a queue for email processing with Redis connection
const emailQueue = new Queue('emailQueue', {
  connection: redisConfig,
});

// Set up a worker to process jobs from the queue with Redis connection
const emailWorker = new Worker('emailQueue', async (job) => {
  console.log(`Processing job ${job.id}...`);

  try {
    await processGmailEmails();
    await processOutlookEmails();
    console.log('Email processing completed.');
  } catch (error) {
    console.error('Error processing emails:', error);
  }
}, {
  connection: redisConfig,
});

// Handle worker events
emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} completed successfully.`);
});

emailWorker.on('failed', (job, err) => {
  if (job) {
    console.error(`Job ${job.id} failed with error:`, err);
  } else {
    console.error('A job failed with error:', err);
  }
});

// Function to add a job to the queue
async function addEmailProcessingJob() {
  await emailQueue.add('processEmails', {});
}

// Main function to initialize the job queue
async function main() {
  await addEmailProcessingJob();
  console.log('Email processing job has been added to the queue.');
}

main().catch((err) => {
  console.error('Error initializing email processor:', err);
});



