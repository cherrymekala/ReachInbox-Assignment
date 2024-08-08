# Email Automation App

Welcome to the Email Automation App! This application automatically reads and responds to emails using AI, providing efficient email management for your Google and Outlook accounts.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Connects to Google and Outlook email accounts securely via OAuth authentication.
- Automatically categorizes incoming emails into "Interested," "Not Interested," or "More Info."
- Sends automated responses based on email categories.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [Redis](https://redis.io/download) (v6.2.0 or later)
- [Git](https://git-scm.com/)

## Installation

Follow these steps to install and set up the application locally:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/email-automation-app.git
   cd email-automation-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   Create a `.env` file in the root directory and add your credentials:

   ```env
   GMAIL_CLIENT_ID="your_gmail_client_id"
   GMAIL_CLIENT_SECRET="your_gmail_client_secret"
   GMAIL_REDIRECT_URI="your_gmail_redirect_uri"
   GMAIL_REFRESH_TOKEN="your_gmail_refresh_token"

   OUTLOOK_CLIENT_ID="your_outlook_client_id"
   OUTLOOK_CLIENT_SECRET="your_outlook_client_secret"
   OUTLOOK_TENANT_ID="your_outlook_tenant_id"
   OUTLOOK_REFRESH_TOKEN="your_outlook_refresh_token"

   REDIS_URL="redis://localhost:6379"
   ```

## Running the Application

1. **Start Redis Server:**

   Make sure your Redis server is running. You can start it with the following command if installed via a package manager:

   ```bash
   redis-server
   ```

2. **Run the Application:**

   Start the Node.js application:

   ```bash
   npm start
   ```

   You should see output indicating the email processing queue is running.

## Usage

- **Sending Test Emails:** Use any email client to send test emails to your connected accounts.
- **Monitoring Automated Responses:** Check the Sent folder of your email accounts to view the app's automated responses.

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

