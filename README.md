# X-Ray Diagnosis Assistant

A React application that provides AI-powered analysis of X-ray images using Google's Gemini AI model. This application helps medical professionals and researchers get preliminary insights from X-ray images, though it should not replace professional medical diagnosis.

## 🎯 Application Aims

The X-Ray Diagnosis Assistant is designed to:

- **Assist Medical Professionals**: Provide preliminary analysis of X-ray images to support medical decision-making
- **Educational Tool**: Help medical students and researchers understand X-ray interpretation
- **Research Support**: Enable quick screening and analysis of X-ray images for research purposes
- **Accessibility**: Make X-ray analysis more accessible to healthcare providers in resource-limited settings

**⚠️ Important Disclaimer**: This application is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical decisions.

## 🏗️ Architecture & Structure

The application follows React best practices with a modular, component-based architecture:

```
src/
├── components/          # Reusable UI components
│   ├── Alert.tsx       # Alert/notification component
│   ├── FileUpload.tsx  # File upload interface
│   ├── DiagnosisSection.tsx # Analysis controls
│   ├── ResultsSection.tsx   # Results display
│   ├── Header.tsx      # Application header
│   ├── Footer.tsx      # Application footer
│   └── __tests__/      # Component unit tests
├── services/           # External service integrations
│   ├── geminiService.ts # Google Gemini AI integration
│   └── __tests__/      # Service unit tests
├── utils/              # Utility functions
│   ├── fileUtils.ts    # File handling utilities
│   └── __tests__/      # Utility unit tests
├── hooks/              # Custom React hooks
│   ├── useApiKey.ts    # API key management
│   └── __tests__/      # Hook unit tests
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared type interfaces
├── assets/             # Static assets
│   └── icons/          # SVG icon components
└── test/               # Test configuration
    └── setup.ts        # Test environment setup
```

## 🧩 Component Overview

### Core Components

#### `App.tsx` - Main Application Component

- **Purpose**: Orchestrates the entire application flow
- **Responsibilities**:
  - Manages application state (file selection, diagnosis results, loading states)
  - Coordinates between components
  - Handles user interactions and API calls
- **Key Features**: Error handling, loading states, state reset functionality

#### `Header.tsx` - Application Header

- **Purpose**: Displays the application title and description
- **Features**: Responsive design with gradient text effects
- **Accessibility**: Proper heading structure for screen readers

#### `FileUpload.tsx` - File Upload Interface

- **Purpose**: Handles X-ray image file selection and validation
- **Features**:
  - Drag-and-drop file upload
  - File type validation (JPEG, PNG, WEBP, DICOM)
  - File size validation (max 5MB)
  - Image preview functionality
  - Accessibility support
- **Validation**: Ensures only appropriate medical image formats are accepted

#### `DiagnosisSection.tsx` - Analysis Controls

- **Purpose**: Provides controls for initiating AI analysis
- **Features**:
  - Analysis button with loading states
  - Reset functionality
  - Disabled states based on application state
  - Responsive button layout

#### `ResultsSection.tsx` - Results Display

- **Purpose**: Displays analysis results and error messages
- **Features**:
  - Conditional rendering (only shows when results exist)
  - Error message display
  - Formatted diagnosis output
  - Accessibility attributes

#### `Alert.tsx` - Alert Component

- **Purpose**: Displays user feedback messages
- **Types**: Error, success, and info alerts
- **Features**: Color-coded styling, icon integration, accessibility support

#### `Footer.tsx` - Application Footer

- **Purpose**: Displays important disclaimers and legal information
- **Content**: Medical disclaimer emphasizing the informational nature of the tool

### Utility Components

#### `useApiKey.ts` - API Key Management Hook

- **Purpose**: Manages Google Gemini API key configuration
- **Features**: Environment variable handling, error state management
- **Security**: Validates API key presence and provides user feedback

#### `fileUtils.ts` - File Handling Utilities

- **Functions**:
  - `toBase64()`: Converts files to base64 for API transmission
  - `validateFile()`: Validates file type and size
  - `createPreviewUrl()`: Creates preview URLs for uploaded images
  - `clearFileInput()`: Resets file input elements

## 🔧 Technical Features

### AI Integration

- **Google Gemini 2.5 Flash**: Latest AI model for image analysis
- **Specialized Prompting**: Medical-focused prompts for X-ray interpretation
- **Error Handling**: Comprehensive error handling for API failures
- **Response Validation**: Ensures AI responses are properly formatted

### File Handling

- **Multiple Formats**: Supports JPEG, PNG, WEBP, and DICOM files
- **Size Limits**: 5MB maximum file size for performance
- **Preview Generation**: Real-time image previews
- **Validation**: Client-side validation before API calls

### User Experience

- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Visual feedback during analysis
- **Error Recovery**: Clear error messages and recovery options
- **Accessibility**: WCAG compliant with proper ARIA attributes

### Testing

- **Comprehensive Coverage**: Unit tests for all components and utilities
- **Mock Integration**: Isolated testing with mocked external services
- **User Interaction Testing**: Tests for user workflows and edge cases

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd x-ray-diagnosis-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create a .env file in the root directory
   echo "API_KEY=your_gemini_api_key_here" > .env
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### Building for Production

```bash
npm run build
```

## 🧪 Testing Strategy

The application includes comprehensive unit tests with the following coverage:

### Component Tests

- **Alert Component**: Tests for different alert types and styling
- **FileUpload Component**: File validation, preview functionality, accessibility
- **DiagnosisSection Component**: Button states, loading indicators, user interactions
- **ResultsSection Component**: Conditional rendering, error handling
- **Header/Footer Components**: Content rendering and styling

### Utility Tests

- **fileUtils**: File conversion, validation, and manipulation functions
- **useApiKey Hook**: API key management and error handling

### Service Tests

- **geminiService**: API integration, error handling, response validation

### Integration Tests

- **App Component**: End-to-end user workflows, state management

## 🔒 Security Considerations

- **API Key Management**: API keys are handled through environment variables
- **File Validation**: Client-side validation prevents malicious file uploads
- **Error Handling**: Sensitive information is not exposed in error messages
- **CORS**: Proper CORS configuration for production deployment

## 🎨 Styling & Design

The application uses **Tailwind CSS** for styling with:

- **Dark Theme**: Medical-appropriate dark color scheme
- **Responsive Design**: Mobile-first approach
- **Accessibility**: High contrast ratios and proper focus states
- **Modern UI**: Clean, professional medical interface

## ⚠️ Medical Disclaimer

**This application is for informational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.**

The AI analysis provided by this application should be used as a supplementary tool to support medical professionals in their decision-making process, not as a replacement for professional medical judgment.
