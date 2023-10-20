# CoverLetterAI

## What is CoverLetterAI

Introducing **CoverLetterAI**, your comprehensive companion in the job application journey. Not only does our platform harness the advanced capabilities of ChatGPT to craft compelling and personalized cover letters in minutes, but it also offers a robust tracking system for all your job applications. Monitor your progress with detailed event logs, from submission to interview, and even job offers. No more juggling multiple tools or staring at a blank screen wondering how to begin. With **CoverLetterAI**, you get a holistic solution that lets you focus on what matters most: landing your dream job.

## Getting Started

**Cover Letter AI** requires the [cover-letter-ai-api](https://github.com/jonada182/cover-letter-ai-api) to be running on your local environment.

### Environment Variables

Create a `.env.local` file based on `.env.local.example` with the following:

- `NEXT_PUBLIC_API_BASE_URL`: the API base url for the [cover-letter-ai-api](https://github.com/jonada182/cover-letter-ai-api)
- `NEXT_PUBLIC_SCRAPER_BASE_URL`: the scraper base url for the [linkedin-scraper](https://github.com/jonada182/linkedin-scraper/)
- `NEXT_PUBLIC_LINKEDIN_CLIENT_ID`: the client ID of your LinkedIn app (used to generate tokens and authenticate)

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Pages

- **Cover Letter** (`/cover-letter`): Genereate a cover letter by providing the job details, and after you've created a career profile.
- **Career Profile** (`/career-profile`): Create/Update your career profile to generate more accurate cover letters
- **Tracker** (`/tracker`): Keep track of your job applications
