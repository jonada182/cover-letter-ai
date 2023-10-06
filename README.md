# CoverLetterAI - API

## What is CoverLetterAI

Introducing **CoverLetterAI**, your new best friend in the job application process. Utilizing the advanced capabilities of ChatGPT, our web app crafts compelling and personalized cover letters in minutes. Simply answer a few questions or give us some key points, and we'll turn them into a professional cover letter that stands out. Say goodbye to staring at a blank screen wondering how to start; let **CoverLetterAI** do the heavy lifting so you can focus on landing your dream job.

## Getting Started

**Cover Letter AI** requires the [cover-letter-ai-api](https://github.com/jonada182/cover-letter-ai-api) to be running on your local environment.

### Environment Variables

Create a `.env.local` file based on `.env.local.example` with the following:

- `NEXT_PUBLIC_API_BASE_URL`: the API base url for the [cover-letter-ai-api](https://github.com/jonada182/cover-letter-ai-api)
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
