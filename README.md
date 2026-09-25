# Policy Pal

Build a modern, professional, responsive web application called **"HR Policy Assistant"** for employees to ask questions about company HR policies.

The application should look like a real internal enterprise HR tool, not a generic AI chatbot.

## 1. BRANDING

Application name:
**HR Policy Assistant**

Subtitle:
**Your AI-powered HR policy companion**

Use a clean, minimal enterprise design with plenty of whitespace, rounded cards, subtle shadows, and a professional visual hierarchy.

Do not make it overly colorful or playful.

Use a modern sans-serif font.

The application must be fully responsive for:

* Desktop
* Tablet
* Mobile

---

## 2. MAIN LANDING PAGE

Create a single-page dashboard-style landing page.

### Header

Top navigation bar:

Left:
**HR Policy Assistant**

Small badge:
**AI Powered**

Right:

* Home
* HR Policies
* Help

Add a simple user/profile icon on the right.

---

## 3. HERO SECTION

Create a centered hero section.

Heading:

**Get answers to your HR policy questions instantly.**

Subheading:

**Ask a question and get a clear answer based on your company's HR policy documents.**

Below this, create the main question input area.

Large rounded text input:

Placeholder:

**Example: How many annual leaves do I get?**

Add a button:

**Ask HR**

The button should have a loading state when clicked.

---

## 4. QUESTION FORM

The main form should contain:

### Question

A large textarea/input field.

Placeholder:

**Ask anything about company HR policies...**

Examples:

* How many annual leaves do I get?
* What is the notice period?
* Can I work from home?
* How long is the probation period?

Add:

**Ask HR**

When the user submits the form:

1. Validate that the question is not empty.
2. Show a loading indicator.
3. Send the question to a configurable backend API endpoint.
4. Wait for the response.
5. Display the answer in the answer section.

IMPORTANT:

Do not hard-code the AI answer.

Create the frontend so the backend API URL can easily be connected to an n8n webhook later.

Use a configuration variable such as:

`N8N_WEBHOOK_URL`

Do not expose API keys or secret credentials in the frontend.

---

## 5. ANSWER SECTION

Initially keep the answer section hidden.

After the user submits a question and receives a response, display an attractive answer card.

Card structure:

### AI Answer

Display the returned answer clearly and with good readability.

Below the answer, display:

**Policy Source**

Show the policy/document name returned by the backend.

Example:

**Annual Leave Policy**

Also show an optional:

**Confidence / Match**

only if the backend provides this information.

Do not invent confidence values.

---

## 6. UNKNOWN QUESTION / FALLBACK

If the backend indicates that the information was not found, display a different card.

Heading:

**I couldn't find that information.**

Message:

**This information was not found in the available HR policy documents. Please contact HR for clarification.**

Add a button:

**Contact HR**

The Contact HR button should open:

`mailto:hr@technovasolutions.example`

Do not allow the frontend to invent answers when the backend does not provide one.

---

## 7. POPULAR HR QUESTIONS

Below the main question area, create a section:

### Frequently Asked Questions

Create clickable question cards for:

**Leave & Time Off**
"How many annual leaves do I get?"

**Work From Home**
"Can I work from home?"

**Notice Period**
"What is the notice period?"

**Probation**
"How long is the probation period?"

**Working Hours**
"What are the standard working hours?"

**Salary**
"When is salary normally credited?"

When a user clicks a question card, automatically place that question into the question input.

Optionally allow the user to immediately submit it.

---

## 8. HR POLICY CATEGORIES

Create a clean category section with cards:

* Leave & Attendance
* Working Hours
* Work From Home
* Payroll & Salary
* Benefits
* Probation
* Resignation & Exit
* IT Security
* Code of Conduct
* Employee Training

Each card should have a simple professional icon.

These are UI categories only.

Do not create fake policy content for these categories.

---

## 9. HOW IT WORKS

Create a three-step section:

### 1. Ask

Enter your HR policy question.

### 2. Search

The system searches the company's available HR policy information.

### 3. Answer

The AI provides a concise answer based on the available policy information.

Use simple icons and a horizontal layout on desktop and vertical layout on mobile.

---

## 10. TRUST / DISCLAIMER SECTION

Add a small information card:

### Policy-based answers

**HR Policy Assistant answers questions using the company's available HR policy documents. If the required information is not available, the assistant will direct employees to HR instead of making assumptions.**

Add a small disclaimer:

**For official clarification, please contact the HR department.**

---

## 11. FOOTER

Footer should contain:

**HR Policy Assistant**

"Internal employee support tool"

Links:

* HR Policies
* Help
* Contact HR

Show:

**© 2026 TechNova Solutions Pvt. Ltd.**

---

## 12. BACKEND INTEGRATION

Prepare the frontend for an n8n backend.

The frontend should send a POST request to:

`N8N_WEBHOOK_URL`

Request body:

```json
{
  "question": "How many annual leaves do I get?"
}
```

Expect the backend to return JSON similar to:

```json
{
  "answer": "Employees are entitled to 18 days of paid annual leave per calendar year.",
  "source": "Annual Leave Policy",
  "found": true
}
```

For an unknown question:

```json
{
  "answer": "I couldn't find this information in the available HR policy documents. Please contact HR for clarification.",
  "source": null,
  "found": false
}
```

Build the frontend so these fields are handled dynamically.

Do not hard-code these responses.

---

## 13. ERROR HANDLING

If the n8n backend is unavailable, display:

**Something went wrong**

"Unable to connect to the HR Policy Assistant right now. Please try again later or contact HR."

Add:

**Try Again**

button.

If the user submits an empty question:

**Please enter an HR policy question.**

Do not send an empty request to the backend.

---

## 14. LOADING STATE

When the user clicks "Ask HR":

Disable the submit button temporarily.

Display:

**Searching**

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://companys-hr-helper.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e49d4872-990b-46a2-bad2-e04ed76c3f42).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
