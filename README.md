# Source.ag Frontend assignment

## Link to application

[Link to the deployed application](https://source-ag-frontend-assignment.vercel.app/)

## Project overview. Stack

[Next.js](https://www.npmjs.com/package/next) 14 (App Router approach)

[TypeScript](https://www.npmjs.com/package/typescript) v5

Styles approach: module [SCSS](https://www.npmjs.com/package/sass)

Linters and formatters: [eslint](https://www.npmjs.com/package/eslint) and [prettier](https://www.npmjs.com/package/prettier)

Component library: [Ant Design](https://www.npmjs.com/package/antd)

API: [SWR](https://www.npmjs.com/package/swr?activeTab=readme) with [Axios](https://www.npmjs.com/package/axios) fetcher

## Setup instructions. How to start project locally?

Install dependencies

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Evaluation Criteria Details

## Functionality Requirements Answers

### 1. Consume the provided API to collect the data

> Yes, I integrated all the APIs to handle every functionality as required. I took into account edge cases, loading states, and error handling to ensure users always have a smooth and reliable experience with the UI.

### 2. Show a list of cultivation users

> Yes, I implemented a page to display all cultivations on the 'cultivations' page. When the "Go to cultivation team page" button is pressed, users are shown a complete list of team members for that specific cultivation. All potential edge cases are handled, including scenarios with no data, errors, loading states, and validation for incorrect or invalid cultivation users (e.g., users with wrong or missing IDs).

### 3. Have a modal to select users to add to the cultivation

> Yes, I implemented a modal allowing users to be added to Cultivation Teams. All potential edge cases are managed, including loaders, errors, and confirmation prompts for adding users. The modal supports adding multiple users at once (where supported by the API) and includes a reset selection feature. Additionally, I ensured that users already in the team cannot be selected again to prevent duplicates.

### 4. Be able to update the role of a cultivation user

> I implemented the functionality to change a user's role within the cultivation team. A request is only sent if the role is being changed to a new one, avoiding unnecessary updates. All edge cases are handled to ensure smooth operation.

### 5. Have a button to delete the user from the cultivation

> Yes, I implemented functionality to remove users from cultivation teams. Error handling is in place, and when the last user is deleted, a "no users" message is displayed. A confirmation modal appears before deletion, and notifications provide feedback on the result of the operation.

## Non-functionality Requirements Answers

### 6. Use Typescript to build your assignment

> Yes, I utilized the latest version of Next.js 14 along with TypeScript 5 to complete the assignment, ensuring type safety and improved code maintainability throughout the project.

### 7. Use the latest version of React

> Yes, I used the latest supported version of React to take advantage of the latest features and performance improvements. This ensures that the application benefits from the most recent advancements in React, enhancing both functionality and efficiency.

### 8. This assignment was designed to be completed in 6-8h. The evaluation will take into account the choices you make and what you focus on given the time you have. However, it's up to you if you spend less or more time on it

> I completed the assignment within the allocated time frame, completing during a day on September 8th after approximately 8 hours of work. I made consistent commits throughout the process to track progress and decisions clearly. This approach demonstrates effective time management and focus on key aspects of the assignment.

## Deliverables Answers

### 9. All code is pushed to your private copy of this repository

> Yes, all code has been pushed to my private GitHub repository. I have also added two users for review purposes. Additionally, the application is deployed on Vercel, allowing for easy access and review without the need to install or run it locally. The link to the deployed application is provided at the top of this README under the "Link to Application" section.

### 10. Documentation is provided in the README.md on how the solution works, and how to run and test it

> Yes, I have provided comprehensive documentation in the README.md file. It includes details on answers of how the solution works, as well as instructions on how to run and test the project.

### 11. Any information, (dummy)-data, files, and other assets that are needed to run this project, are provided in this repository

> Yes, all required information are included in the repository. For ease of use, the deployed application can be accessed directly through the link provided in the "Link to Application" section of the README.

## Assessment Criteria Answers

### 12. How is your code structured? Is it easy to read and follow?

> I structured the code using the latest web standards and best practices from my work experience to ensure scalability, maintainability, and readability. The code is organized to facilitate easy understanding and future enhancements.

### 13. How clear is the documentation?

> I made an effort to address each aspect of the assignment thoroughly in the documentation, providing a clear and comprehensive overview of the project.

### 14. Are there any clear bugs in your code?

> I have addressed all potential edge cases on the front end to minimize bugs. While there is always room for further improvement, all required functionality is implemented and performs as expected.

### 15. How does the solution perform?

> The solution performs well and addresses all required criteria, with additional functionality that enhances the user experience. It includes features such as error pages, a not-found page, a home page for assignments, support for creating multiple users, user selection reset, confirmation modals, and status notifications. These enhancements contribute to a robust and user-friendly application.

### 16. Can you clearly and concisely describe the process you have followed and the choices you have made?

> Yes, I can clearly and concisely describe the process I followed and the choices I made. Additionally, my commit history provides a detailed record of the development process and decision-making.

### 16. Can you describe the biggest short-comings of your solution and which steps could be taken to improve on that?

> While I aimed to address all key aspects to create a comprehensive solution, there is always room for improvement. To enhance the project further, I would focus on refining user experience (UX) and providing a clearer, more polished design. This could involve addressing any remaining UX issues and ensuring the design is as intuitive and user-friendly as possible.
