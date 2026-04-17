# BorrowHub Website

Static website for a BorrowHub-style lending platform, ready for GitHub Pages.

## Files

- `index.html` - main page structure
- `styles.css` - styling and responsive layout
- `script.js` - interactivity (menu, eligibility check, EMI calculator)

## Run locally

Open `index.html` directly in browser, or run a local static server:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Go live with your domain

1. Push this branch to GitHub (already done through agent workflow).
2. In GitHub repository settings, enable **GitHub Pages** from the main branch.
3. In your domain DNS panel:
   - Add `A` records for apex domain to GitHub Pages IPs.
   - Add `CNAME` for `www` to `<username>.github.io`.
4. Update the `CNAME` file in this repo to your exact domain.
