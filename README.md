### Skilled Based Assessment (SBA) -Capstone Completion 
### Per Scholas Software Engineering Bootcamp

## 👤 GitHub

**GitHub Profile:**
https://github.com/IsaiasRT

---

## Short Overview

**Community Marketplace App** is a full-stack MERN application that allows members of a community to buy and sell products with each other. 
It provides a public, filterable product catalog with a shopping cart and themed checkout flow for buyers, while registered users can become sellers to create, edit, and delete their own listings. 
The app includes JWT-based authentication, protected routes, a clean responsive UI, and a light/dark theme toggle.


## Use Cases

- **As a buyer**, I can browse all active listings, filter products by category and sort them by price (low to high or high to low), add items to my cart, and see a running total with a checkout flow.
- **As a registered user**, I can log in and manage my own listings.
- **As a seller**, I can create new product listings and edit or delete only the products I own, thanks to protected routes and ownership checks.
- **As the community**, the app provides a secure, authenticated marketplace where every request is verified to prevent unauthorized changes.

## Technical Functionality (High-Level)

- **Backend (REST API):** Node.js + Express exposes full CRUD routes for products (`routes/products.js`) and register/login routes for auth (`routes/auth.js`). Passwords are hashed with bcrypt before saving, and authentication is enforced via a JWT middleware (`middleware/auth.js`).
- **Database:** MongoDB with Mongoose. The `User` schema stores hashed passwords and a unique indexed email, and the `Product` schema references its owner. Centralized exception handling is provided in `middleware/errorHandler.js`.
- **Frontend (React + Vite):** A single-page app with navigation via React Router and multiple views (Home, Login, Register, Cart, Become a Seller, My Listings). State is managed with React Context and Hooks for the cart, theme, and auth session.
- **API integration:** A shared Axios instance (`frontend/src/api.js`) uses a request interceptor to attach the user's JWT to every request automatically.
- **Security & quality:** Protected routes guard seller actions, async/await is used throughout, and loading, error, and empty states are handled for a polished UX.

## Lessons Learned

- Building a REST API and consuming it from React clarified how the client, server, and database interact through a well-defined interface.
- Implementing JWT-based auth plus a request interceptor taught the importance of securing not just routes but every API call.
- Modeling data with Mongoose emphasized the value of schema design, indexes, and ownership references (e.g., a product belonging to a user).
- Managing auth, cart, and theme with Context and Hooks reinforced how React handles shared application state across views.

## Future Features

- [] Real image uploading instead of stored image URLs.
- [] In-app messaging between buyers and sellers.
- [] Product ratings and reviews.
- [] Payment integration (e.g., Stripe) for end-to-end checkout.
- [] Search by keyword, saved/favorite listings, and recommendation features.
- [] Admin moderation and member verification for the community.

---

## 📝 Requirements


-**(20%) Project Structure, Standardization, and Convention**
- [x] Project is organized into appropiate files and directories, following best practices (%2) 
- [x] Project contains an appropriate level of comments. (%2)
- [x] Project is pushed to GitHub, and contains a README file that documents the project, including an overall description of the project. (%5)
- [x] Standard naming conventions are used throughout the project. (%2)
- [x] Ensure that the program runs without errors (comment out things that do not work, and explain your blockers - you can still receive partial credit). (%4)
- [x] Level of effort displayed in creativity, presentation, and user experience. (%5)

**(12%) Core JavaScript**
- [x] Demonstrate proper usage of ES6 syntax and tools. (%2)
- [x] Use functions and classes to adhere to the DRY principle. (%2)
- [x] Use Promises and async/await, where appropriate. (%2)
- [x] Use Axios or fetch to retrieve data from an API (%2)
- [x] Use sound programming logic throughout the application (%2)
- [x] Use appropriate exception handling (%2)
 

**(9%) Database**
- [x] Use mongoDB to create a database for your application (%5)
- [x] Apply appropiate indexes to your database collections (%2)
- [x] Create reasonable schemas for your data by following data modeling best practices (%2)
 
 **(19%) server**
- [x] Create a RESTful API using Node and Express. For the purposes of this project, you may forgo the HATEOAS aspect of REST APIs. (%7)
- [x] Include API routes for all four CRUD operations.(%5)
- [x] Utilize the native MongoDB driver or Mongoose to interface with your database. (%5)
- [x] Include at least one form of user authentication/authorization within the application. (%2)

 **(35%) Front-End Development**
- [x] Use React to create the application's front-end. (%10)
- [x] Use CSS to style the application.(%5)
- [x] Create at least four different views or pages for the application. (%5)
- [x] Create some form of navigation that is included accross the application's pages, utilizing React Router for page rendering. (%5)
- [x] Use React Hooks or Redux for application state management. (%5)
- [x] interface directly with the server and API that you created. (%5)

 **(5%) presentation**
- [x] Create a short overview of your application. (%1)
- [x] Highlight the use cases of your applications. (%1)
- [x] Highlight the technical functionality of the application, from a high-level perspective. (%1)
- [x] Discuss any lessons learned through the development of the application. (%1)
- [x] Discuss additional features that could be added to the application in the future. (%1)

 **OPTIONAL(5%) Extra Credit**
- [] Adhere to Agile principles and the Scrum framework. Perform stand-up sessions (with an instructor) when possible. (%1)
- [] Build your application primarily with TypeScript.(%3)
- [X] Successfully track your project using a software similar to Jira. (%1)

## 🚀 Getting Started

```bash
**front end**
npm install
npm run dev

**back-end**
npm install
node server.js

```

---

# 📚 References
- https://react.dev/
- https://reactrouter.com/
- https://vitejs.dev/
- https://www.mongodb.com/docs/manual/indexes/
- https://expressjs.com/
- https://nodejs.org/
- https://github.com/IsaiasRT
- https://www.geeksforgeeks.org/mern/community-marketplace-app-using-mern-stack/
- https://csszengarden.com/220/
- https://www.reddit.com/r/webdev/comments/13r52gk/mern_stack_authentication_without_jwt/
- https://www.dafont.com/online-market.font
# Scrum 

https://capstone-community-market-app.atlassian.net/jira/software/projects/SCRUM/boards/1?filter=&groupBy=none

# Netlify 

https://community-marketplace-app.netlify.app/

# 📅 Timeline

**Due Date:** 08/07/2026

