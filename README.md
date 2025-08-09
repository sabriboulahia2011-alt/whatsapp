# WhatsApp Clone

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Application Flow

```mermaid
graph TD
  %% --- App Start & Authentication ---
  A[Start Application] --> B{Is User Logged In?}
  B -- No --> C[Display Login/Sign-up Screen]
  C --> D{User Action}
  D -- Sign-up --> E[Sign-up Process]
  E --> F{Sign-up Successful?}
  F -- Yes --> G[Login Process]
  F -- No --> C
  D -- Login --> G
  G[Login Process] --> H{Authentication Successful?}
  H -- Yes --> I[Fetch User Data & Initialize App]
  H -- No --> C
  I --> J[Display Main Application Screen]
  J --> K{User Actions: Chat, Profile, Settings, Group}

  %% --- Main Navigation ---
  K -- Select Chat --> L[Open Chat Screen]
  K -- Manage Profile --> N[Open Profile Settings]
  K -- Adjust Settings --> P[Open App Settings]
  K -- New Group --> AA[Start Group Creation Flow]

  %% --- Chat Experience ---
  L --> M{Chat Actions}
  M -- Send Message --> Q1[Type Message]
  Q1 --> Q2[Click Send]
  Q2 --> Q3[Display Message Locally (Single Tick)]
  Q3 --> Q4{Send Message via WebSocket?}
  Q4 -- Yes --> Q5[Backend Receives & Stores Message]
  Q5 --> Q6[Backend Forwards Message to Recipient]
  Q5 --> Q7[Backend Sends "Delivered" Receipt]
  Q7 --> Q8[Update Sender's UI to Double Tick]
  Q6 --> Q9[Recipient Receives Message]
  Q9 --> Q10[Display Message]
  Q9 --> Q11[Send "Read" Receipt to Backend]
  Q11 --> Q12[Backend Sends "Read" Receipt to Sender]
  Q12 --> Q13[Update Sender's UI to Blue Tick]
  Q4 -- No --> Q14[Display "Message Not Sent" Error/Retry]
  M -- Attach Media --> R1[User Taps "Attach Media" Icon]
  R1 --> R2{Select Media Type}
  R2 -- Image/Video --> R3[Open Gallery/Camera]
  R3 --> R4[User Selects/Captures Media]
  R4 --> R5[Display Media Preview]
  R5 --> R6{User Adds Caption & Sends?}
  R6 -- Yes --> R7[Upload Media to Storage]
  R6 -- No --> L
  R2 -- File --> R8[Open File Picker]
  R8 --> R9[User Selects File]
  R9 --> R10[Display File Details]
  R10 --> R11{User Confirms Send?}
  R11 -- Yes --> R7
  R11 -- No --> L
  R7 --> R12[Get Media/File URL]
  R12 --> R13[Send Message with Media URL to Backend]
  R13 --> Q5
  M -- View History --> L
  M -- End Chat Session --> J

  %% --- Profile & Settings ---
  N --> O{Profile Actions}
  O -- Edit Profile --> O1[Edit Profile Details]
  O -- Change Password --> O2[Change Password]
  O -- Privacy Settings --> O3[Adjust Privacy]
  O1 --> N
  O2 --> N
  O3 --> N
  O -- Save/Exit --> J
  P --> Q{Settings Actions}
  Q -- Theme --> Q1[Change Theme]
  Q -- Notifications --> Q2[Adjust Notifications]
  Q -- Privacy --> Q3[Adjust Privacy]
  Q1 --> P
  Q2 --> P
  Q3 --> P
  Q -- Save/Exit --> J

  %% --- Real-time & Logout ---
  J --> S[Logout]
  S --> A
  J --> T[Receive Real-time Message/Notification]
  T --> J

  %% --- Group Chat Creation & Management ---
  AA[Start Group Creation Flow] --> AB[Display Contact List]
  AB --> AC[User Selects Participants]
  AC --> AD[User Enters Group Name & Icon]
  AD --> AE[Click "Create Group"]
  AE --> AF{Send Group Creation Request?}
  AF -- Yes --> AG[Backend Creates Group & Adds Users]
  AF -- No --> AB
  AG --> AH[Notify All Participants]
  AH --> AI[Display New Group in Chat List]
  AI --> AJ[User Opens New Group Chat]
  AJ --> AK{Group Actions}
  AK -- Add Participant --> AL[Select New Contact]
  AL --> AM{Backend Adds User?}
  AM -- Yes --> AN[Notify Group of New Member]
  AM -- No --> AL
  AK -- Remove Participant --> AO[Select Member to Remove]
  AO --> AP{Backend Removes User?}
  AP -- Yes --> AQ[Notify Group of Member Removal]
  AP -- No --> AO
  AK -- Change Group Info --> AR[Edit Group Name/Icon]
  AR --> AS[Send Update to Backend]
  AS --> AT[Backend Updates Group Info & Notifies Members]
  AK -- Leave Group --> AU[Confirm Leave Group]
  AU --> AV{Backend Removes User?}
  AV -- Yes --> AW[Remove Group from User's Chat List]
  AV -- No --> AJ

  %% --- Chat List to Chat ---
  J --> L
```
