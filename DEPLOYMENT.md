# Firebase Deployment Setup

This project is configured for automatic deployment to Firebase Hosting via GitHub Actions.

## 🚀 Automatic Deployment

Every push to the `main` branch will automatically:
1. Build the project
2. Deploy to Firebase Hosting
3. Go live at your Firebase URL

## ⚙️ Setup Instructions

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select existing project
3. Enable Firebase Hosting

### 2. Get Firebase Service Account Key

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Go to **Service Accounts** tab
3. Click **Generate New Private Key**
4. Save the JSON file securely (DO NOT commit this to git!)

### 3. Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add these secrets:

#### `FIREBASE_SERVICE_ACCOUNT`
- Copy the **entire contents** of the JSON file you downloaded
- Paste it as the secret value

#### `FIREBASE_PROJECT_ID`
- Your Firebase project ID (found in Firebase Console → Project Settings)
- Example: `for-madam-ji-12345`

### 4. Push to GitHub

```bash
git add .
git commit -m "Add Firebase deployment workflow"
git push origin main
```

### 5. Monitor Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. Watch the deployment workflow run
4. Once complete, your site will be live!

## 🔧 Manual Deployment

If you need to deploy manually:

```bash
# Login to Firebase (one-time)
npx firebase login

# Initialize project (one-time)
npx firebase init hosting
# Select: dist as public directory
# Select: Yes for single-page app

# Deploy
npm run deploy
```

## 📝 Firebase Project Configuration

After running `firebase init`, a `.firebaserc` file will be created with your project ID:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

## 🌐 Your Site URL

After deployment, your site will be available at:
- `https://your-project-id.web.app`
- `https://your-project-id.firebaseapp.com`

You can also add a custom domain in Firebase Console → Hosting → Add custom domain.

## 🔄 Workflow Details

The GitHub Actions workflow:
- Triggers on every push to `main` branch
- Installs dependencies
- Builds the production bundle
- Deploys to Firebase Hosting
- Takes approximately 2-3 minutes

Check `.github/workflows/firebase-deploy.yml` for the full configuration.
