# Meal Deal App

A Python web application that helps you save money on groceries by finding 
the best deals at your local store and building a smart weekly shopping list.

## The Problem

When I first moved out on my own, grocery shopping was overwhelming. I had 
no idea what to buy, how to save money, or how to plan meals efficiently. 
I kept buying ingredients for one recipe and never using them again.

## The Solution

Meal Deal pulls the weekly deal catalog from a grocery store API, 
cross-references deals against a recipe database, and generates an optimized 
weekly shopping list based on:

- What is currently on sale
- Which ingredients overlap across multiple recipes
- Minimizing waste by prioritizing recipes that share ingredients

## How It Works

1. Makes an API call to the grocery store's deal catalog
2. Parses the weekly deals and sale prices
3. Cross-references deals against recipe ingredient lists
4. Scores recipes by ingredient overlap and discount value
5. Generates a ranked weekly shopping list with estimated savings

## Tech Stack

- **Python** — core application logic
- **REST APIs** — grocery store deal catalog integration
- **Web scraping** — recipe data collection
- **Flask** — lightweight web interface

## Running Locally

```bash
git clone https://github.com/yourusername/meal-deal-app
cd meal-deal-app
pip install -r requirements.txt
python app.py
```

## Future Improvements

- Add support for multiple grocery store chains
- Deploy to cloud (AWS/GCP) for public access
- Add user accounts to save preferences and past lists
- Integrate with meal planning calendar

## About

Built by Anna Koziol — Data Engineer passionate about solving real problems 
with clean, practical code.

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
