#!/bin/bash

echo "🚀 Firebase Deployment Setup"
echo "=============================="
echo ""

# Check if Firebase CLI is available
if ! command -v firebase &> /dev/null; then
    echo "📦 Installing Firebase CLI..."
    npm install -g firebase-tools
fi

echo "🔐 Logging in to Firebase..."
firebase login

echo ""
echo "🎯 Initializing Firebase Hosting..."
echo "When prompted:"
echo "  - Select your Firebase project"
echo "  - Public directory: dist"
echo "  - Single-page app: Yes"
echo "  - GitHub deploys: No"
echo ""

firebase init hosting

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to Firebase Console → Project Settings → Service Accounts"
echo "2. Generate a new private key (JSON file)"
echo "3. Add to GitHub Secrets:"
echo "   - FIREBASE_SERVICE_ACCOUNT (entire JSON content)"
echo "   - FIREBASE_PROJECT_ID (your project ID)"
echo ""
echo "4. Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Configure Firebase deployment'"
echo "   git push origin main"
echo ""
echo "🌐 Your site will be live at: https://YOUR-PROJECT-ID.web.app"
