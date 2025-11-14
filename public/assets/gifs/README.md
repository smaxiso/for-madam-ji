# GIF Placeholders

Replace these placeholder SVG files with actual GIF files:

## Files to Replace:

1. **thankful.svg** → **thankful.gif**
   - Message: "I am so thankful to have you in my life."
   - Suggested GIF: Gratitude, thankful hands, hearts, or appreciation theme

2. **perfect.svg** → **perfect.gif**
   - Message: "You are the best and perfect."
   - Suggested GIF: Stars, sparkles, trophy, perfection theme

3. **smile.svg** → **smile.gif**
   - Message: "Keep smiling madam ☺️"
   - Suggested GIF: Smile, happy face, sunshine, joy theme

## How to Replace:

1. Find GIFs online (Giphy, Tenor, etc.)
2. Download and rename them to match the names above
3. Replace the .svg files in this folder
4. Update `src/data/slides.js` - change `.svg` to `.gif` in the file paths

Example:
```javascript
// In src/data/slides.js, change:
gif: '/assets/gifs/thankful.svg'
// To:
gif: '/assets/gifs/thankful.gif'
```

## Recommended GIF Size:
- Width: 400-600px
- Height: 300-400px
- File size: < 2MB each for fast loading
