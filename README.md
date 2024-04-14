---
runme:
  id: 01HVE3ZKAVW4ZZVJT0PQYK4SSB
  version: v3
---

# Spatial Data Analyser

The Spatial Data Analyser is a fullstack web application designed to manage and visualize geospatial data efficiently. This project allows users to create accounts, upload GeoJSON or KML files, visualize these files on a map, and interact with the data by drawing and editing custom shapes.

## Features

- **User Authentication**: Secure signup and login functionality.
- **File Management**: Upload and manage GeoJSON and KML files.
- **Data Visualization**: Render uploaded files on an interactive map using React Leaflet.
- **Interactive Mapping**: Users can draw, save, and edit custom shapes directly on the map.
- **Data Security**: Ensures that user data and geospatial information are protected through secure API endpoints.

## Technology Stack

- **Frontend**: React, Next.js
- **Backend**: Go (simulated with Next.js API routes in this demo)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage for file management
- **Styling**: Tailwind CSS for a responsive and modern UI

## Project Structure

```plaintext {"id":"01HVE67WJ252J93HVFGKJR8Y02"}
/spatial-data-analyser
├── app/                  # Application logic and API endpoints
│   ├── api/              # Backend API routes
│   │   ├── files/        # File management (upload and list)
│   │   └── shapes/       # Shape management (save)
│   ├── auth/             # Authentication related components
│   ├── components/       # Reusable React components
│   └── geoSpatial/       # Geospatial components (Map and File interaction)
├── utils/                # Utility functions and Supabase client setup
└── public/               # Static files like images and favicon
```

### Key Files and Their Functions

To provide a comprehensive overview of each component within the `components` and `geoSpatial` folders of your `spatial-data-analyser` project, let’s go through their purpose and functionality:

### `components` Folder

This folder contains reusable React components that can be used throughout the application. Here’s a breakdown of typical components you might find in this folder:

- **`AuthButton.tsx`**: A button component specifically designed for authentication actions. It might handle login, logout, and display user authentication state.
- **`AuthConnectors/`**: This directory could include various components related to the authentication process:

   - **`Code.tsx`**: Handles the display and input of authentication codes if using two-factor authentication or code-based login methods.
   - **`ConnectSupabaseSteps.tsx`**: component used to connect to Supabase services.
   - **`FetchDataSteps.tsx`**: Displays steps or instructions for fetching data, possibly used in tutorials or help sections.
   - **`SignUpUserSteps.tsx`**: Manages the user interface for signing up new users, showing the necessary steps in a user-friendly format.
   - **`Step.tsx`**: A generic step component used within other step-based components for a consistent UI/UX.

- **`DeployButton.tsx`**: Might be a component used for deploying resources or changes directly from the UI, useful in admin panels or development tools.

### `geoSpatial` Folder

This folder contains components specifically tied to geospatial data interaction, visualization, and management:

- **`FileList.js`**: This component retrieves and displays a list of all geo-files uploaded by the authenticated user. It interacts with the `/api/files/list` API to fetch and render the list of files in a user-friendly manner.
- **`FileUploader.js`**: Handles the uploading of GeoJSON and KML files. It provides a UI for users to select files and uploads them to the server using the `/api/files/upload` endpoint. This component also validates file types and manages client-side file parsing if necessary.
- **`FileUploader.module.css`**: Contains CSS styles specifically for the `FileUploader` component, ensuring that the uploader's UI is consistent and responsive.
- **`GeospatialPage.module.css`**: CSS module for styling the `GeospatialPage` component, affecting layout, typography, and other visual aspects of the geospatial page.
- **`MapDisplay.js`**: A crucial component for rendering interactive maps using React Leaflet. It displays GeoJSON data on the map and allows users to interact with this data, including viewing, adding, and editing geographic shapes.
- **`page.js`**: Likely the main entry component for the geospatial functionality. It integrates other components like `MapDisplay` and `FileUploader`, orchestrates their interactions, and maintains the state related to geospatial data manipulation.

### `Middleware in the Spatial Data Analyser`

Middleware in the Spatial Data Analyser serves as an intermediary processing layer in our Next.js application, executing code before pages are rendered or API routes are handled. This allows us to perform operations such as authentication checks, redirections, and custom header manipulations, enhancing both the security and efficiency of the application.

`Purpose of Middleware`
Our middleware is primarily used for the following purposes:

`User Authentication:`

`Protecting Routes`: Ensures that certain routes/pages are only accessible to authenticated users. If a user is not authenticated, the middleware redirects them to the login page before the page is rendered.
Session Validation: Checks if the user's session or authentication token is valid for each request that requires authentication.
Redirection:

Handles conditional redirections based on user state or application logic, such as redirecting logged-in users away from the login page or directing users to different content based on their preferences.
Security Enhancements:

Automatically adds or modifies HTTP headers for responses to increase security, such as setting Content-Security-Policy headers or configuring cookies with secure attributes.

### General Notes

- **Modularity and Reusability**: The components are designed to be modular and reusable, which enhances maintainability and scalability of the application.
- **Styling with CSS Modules**: Using CSS modules helps avoid styling conflicts by ensuring styles are locally scoped to components, rather than globally.

## Local Setup

### Prerequisites

- Node.js (>=14.x)
- NPM or Yarn
- Supabase Account

### Environment Setup

1. **Clone the repository:**

```bash {"id":"01HVE67WJ252J93HVFGNMYR62A"}
git clone https://github.com/yourgithub/spatial-data-analyser.git
cd spatial-data-analyser
```

2. **Install dependencies:**

```bash {"id":"01HVE67WJ252J93HVFGPEVZA0M"}
npm install
```

3. **Setup the environment variables:**

   - Rename `.env.local.example` to `.env.local`
   - Fill in the Supabase credentials: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Supabase Configuration

- **Create a new project in Supabase.**
- **Setup database tables using the SQL scripts provided in the `/sql` directory.**
- **Configure Storage buckets as described in the Supabase setup section of this document.**

### Running Locally

```bash {"id":"01HVE67WJ252J93HVFGRG4E924"}
npm run dev
```

This command starts the local development server on `http://localhost:3000`. Navigate to this URL in your web browser to view the application.

## Demo

demo of the application functionalities can be accessed [here](https://drive.google.com/file/d/1y8jNpyMqYNvFcoo-Tnh5-aDB8jGmR4gl/view?usp=sharing).

## Contributions

Contributions are welcome! Please read the contribution guidelines first.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.
