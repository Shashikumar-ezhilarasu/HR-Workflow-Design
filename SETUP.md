# Setup Instructions

## Quick Start

Follow these steps to run the HR Workflow Designer locally:

### 1. Install Dependencies

```bash
npm install
```

### 2. Initialize MSW (Mock Service Worker)

This step is **critical** for the mock API to work:

```bash
npx msw init public/ --save
```

This command creates the service worker file needed for MSW to intercept API requests.

### 3. Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## What to Expect

When you first open the application:

1. **Left Sidebar**: Drag node types onto the canvas
2. **Center Canvas**: Drop and connect nodes
3. **Right Panel**: Configure selected nodes
4. **Bottom Right Button**: Test your workflow

## Testing the Application

### Create a Simple Workflow

1. Drag a **Start** node onto the canvas
2. Drag a **Task** node
3. Drag an **End** node
4. Connect them: Start → Task → End
5. Click each node to configure it
6. Click "Test Workflow" to simulate execution

### Example: Employee Onboarding Workflow

1. **Start Node**: "New Employee Onboarding"
2. **Task Node**: "Collect Documents" (Assignee: HR Team)
3. **Approval Node**: "Manager Approval" (Role: Manager)
4. **Automated Step**: "Send Welcome Email" (Action: send_email)
5. **End Node**: "Onboarding Complete"

Connect them in sequence and test!

## Troubleshooting

### "Fetch failed" or API errors

Make sure you ran:
```bash
npx msw init public/ --save
```

### Port already in use

Change the port in `vite.config.ts` or kill the process using port 5173.

### TypeScript errors

Make sure all dependencies are installed:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

See `README.md` for detailed architecture documentation.
