"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const emailService_1 = require("./emailService");
// Redis connection configuration
const redisConfig = {
    host: '127.0.0.1',
    port: 6379, // Default Redis port
};
// Create a queue for email processing with Redis connection
const emailQueue = new bullmq_1.Queue('emailQueue', {
    connection: redisConfig,
});
// Set up a worker to process jobs from the queue with Redis connection
const emailWorker = new bullmq_1.Worker('emailQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Processing job ${job.id}...`);
    try {
        yield (0, emailService_1.processGmailEmails)();
        yield (0, emailService_1.processOutlookEmails)();
        console.log('Email processing completed.');
    }
    catch (error) {
        console.error('Error processing emails:', error);
    }
}), {
    connection: redisConfig,
});
// Handle worker events
emailWorker.on('completed', (job) => {
    console.log(`Job ${job.id} completed successfully.`);
});
emailWorker.on('failed', (job, err) => {
    if (job) {
        console.error(`Job ${job.id} failed with error:`, err);
    }
    else {
        console.error('A job failed with error:', err);
    }
});
// Function to add a job to the queue
function addEmailProcessingJob() {
    return __awaiter(this, void 0, void 0, function* () {
        yield emailQueue.add('processEmails', {});
    });
}
// Main function to initialize the job queue
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield addEmailProcessingJob();
        console.log('Email processing job has been added to the queue.');
    });
}
main().catch((err) => {
    console.error('Error initializing email processor:', err);
});
