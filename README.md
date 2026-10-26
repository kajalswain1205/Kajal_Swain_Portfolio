# Kajal Swain — Personal Portfolio

A responsive, single-page developer portfolio built with HTML5, CSS3, and vanilla JavaScript.

## Features
- Responsive layout for mobile, tablet, and desktop
- Dark/light theme preference saved in localStorage
- Mobile navigation, active section highlighting, and smooth scrolling
- About, skills, internship experience, projects, certifications, and contact sections
- Accessible contact form validation and a direct email fallback
- Reduced-motion support, reveal effects, SEO metadata, and favicon

## Run locally
No build step is required for the static portfolio.

1. Install Node.js if you do not already have it.
2. From this directory, run `npm run dev`.
3. Open the local address printed in the terminal.
4. Run `npm run check` to check the JavaScript syntax.

You can also open `index.html` directly, but a local server is better for testing form behavior.

## Personalize before submitting
1. Copy your real resume PDF to `assets/resume/Kajal_Swain_Resume.pdf`.
2. Replace the project GitHub profile links with each actual repository URL.
3. Add your profile photo to `assets/images/` if you want to use one, and update the hero markup.
4. Add real certificate verification links only if you have them.
5. Verify your email address, phone, and social profile URLs.

## Contact form / email delivery
The form is marked up for **Netlify Forms**. After deploying to Netlify:
1. Deploy the site and confirm the `contact` form appears in the Netlify Forms dashboard.
2. Enable form detection if Netlify asks you to do so, then trigger a new deploy.
3. In the Netlify dashboard, configure form notifications for the `contact` form to send submissions to `kajalswain215@gmail.com`.
4. Submit a test message from the public website and verify that the submission appears in Netlify and the email notification arrives. Check spam/junk if needed.

**Important:** A successful browser request means Netlify accepted the form submission; email notification depends on dashboard configuration. This starter does not pretend a message was emailed if the request fails.

If you prefer a custom email API such as Resend, implement a server-side function, validate inputs server-side, and keep `RESEND_API_KEY` in hosting environment variables. Never put secrets in browser JavaScript or commit them to GitHub. The included `.env.example` contains names only and is not a working credential file.

## Deploy to Netlify
1. Push this folder to a GitHub repository.
2. In Netlify, import the repository.
3. Set the publish directory to `.`. The included `netlify.toml` also configures the publish directory.
4. Deploy the site.
5. Configure the form notifications as described above.
6. Test every section and submit a real contact form message.

## GitHub setup
```bash
git init
git add .
git commit -m "Build personal portfolio website"
git branch -M main
git remote add origin https://github.com/kajalswain1205/kajal-portfolio.git
git push -u origin main
```
Create the repository on GitHub first. If your repository has a different name or URL, change the `git remote add origin` command accordingly.

## Assessment / implementation notes
- **Technology choice:** semantic HTML, CSS, and vanilla JavaScript keep the implementation lightweight and easy to explain.
- **Responsive design:** CSS Grid, Flexbox, relative sizing, and breakpoints adapt the layout to different screens.
- **Interactive feature:** the theme toggle switches CSS custom properties and persists the preference in `localStorage`.
- **Code organization:** HTML is in `index.html`, styling is in `css/`, behavior in `js/`, and static assets in `assets/`.
- **Deployment:** Netlify hosts the static site and can process the declared Netlify contact form.
- **Challenge:** a static frontend cannot securely send email by itself. Netlify Forms with configured email notifications avoids exposing an email API secret in client-side code.

## Screenshot checklist
Save screenshots in `screenshots/`:
- Desktop hero/home section
- Mobile hero/navigation
- Skills and experience
- Projects
- Contact form
- Light theme (optional)

## Before final submission
- [ ] Resume PDF added and downloads correctly
- [ ] Project links updated to real repositories
- [ ] Contact notifications configured and tested
- [ ] No broken links or browser console errors
- [ ] README and screenshots included
- [ ] Public deployment is accessible
