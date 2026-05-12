# Playwright TypeScript - Swag Labs Automation

This repository contains an automated testing framework for the [Swag Labs](https://www.saucedemo.com) website. It is built using **Playwright**, **TypeScript**, and follows the **Page Object Model (POM)** design pattern.

## 🚀 Features

- **Page Object Model (POM)**: Organized and maintainable structure for page interactions.
- **TypeScript**: Type safety and better developer experience.
- **Custom Logger**: Enhanced logging for better traceability of test steps.
- **Test Tagging**: Categorized tests using tags like `@smoke`, `@positive`, `@negative`, etc.
- **Parallel Execution**: Configured to run tests in parallel to save time.
- **HTML Reporting**: Automatically generates detailed HTML reports after test execution.
- **CI/CD Integration**: Pre-configured GitHub Actions workflow for automated testing on push and pull requests.

## 📂 Project Structure

```text
├── .github/workflows/    # CI/CD configuration (GitHub Actions)
├── tests/
│   ├── fixtures/         # Test data (e.g., user credentials)
│   ├── pages/            # Page Object Model classes
│   ├── specs/            # Test script files (.spec.ts)
│   └── utils/            # Utility classes (e.g., Logger)
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation
```

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- npm (comes with Node.js)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/playwright-typescript-saucelabs.git
   cd playwright-typescript-saucelabs
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browsers:
   ```bash
   npx playwright install --with-deps
   ```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in UI mode
```bash
npm run test:ui
```

### Run tests with a specific tag
```bash
npx playwright test --grep @smoke
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Show test report
```bash
npm run report
```

## 📊 Reporting

After running the tests, an HTML report is generated. You can view it by running `npm run report`. This report includes:
- Test status (Pass/Fail)
- Execution steps
- Screenshots on failure
- Trace logs (on first retry)

## 🤖 CI/CD

This project uses **GitHub Actions** to automatically run tests whenever code is pushed to the `main` or `master` branches, or when a pull request is created. The results and HTML reports are available in the GitHub Actions "Artifacts" section.

---
