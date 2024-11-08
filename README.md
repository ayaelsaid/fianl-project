<h1 align="center">MEET ME</h1>

![Site's Dashboard](https://github.com/ayaelsaid/fianl-project/blob/main/readme/imgsproject/Screenshot%202024-11-08%20103246.png)

-----------------------------------------------------------------------------------------------------------------------------------------------------------
## Project By: Aya El Sayed

# Sections

1. [**Introduction && Project Overview**](#introduction): A brief overview of the project with links to the deployed site, blog article, and author's LinkedIn.
2. [**Installation**](#Installation): Detailed steps to install and run the project locally.
3. [**Technologies & Packages Breakdown**](#Technologies): Detailed about all used technology
4. [**Challenges and Struggles**](#Challenges-and-Struggles)
5. [**Architecture**](#Architecture)
6. [**snippets**](#snippets)
7. [**Usage**](#Usage): Instructions on how to use the project and a brief description of its features.
8. [**Future Improvements**](#FutureImprovements): Features i want to aded in the future to project
9. [**Contributing**](#Contributing): Guidelines for contributing to the project.
10. [**Licensing**](#Licensing): Information about the project's license

------------------------------------------------------------------------------------------------------------------------------------------------------------ 

# Introduction
Meet me website
is a platform connects pet lovers, allowing them to interact, share experiences, and post breeding requests for their pets. Users can create a profile, post their pet's details for breeding, and engage in real-time conversations in dedicated chat rooms such as rooms for dogs, cats, other animals, and a breeding requests room. The website provides a space for users to communicate, ask for breeding partners, and find matching pets based on their needs.

-------------------------------------------------------------------------------------------------------------------------------------------------------------

## Installation


| Package                 | Installation Command                                                                                                                   | 
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| clone repository        | `git clone https://github.com/ayaelsaid/laxory-Car-Re.github.io/.git && cd laxory-Car-Re.github.io`                                    |   
| express`                |`npm install express`                                                                                                                   |
| mongodb                 | `npm install mongodb`                                                                                                                  |
| googleapis              | `npm install googleapis`                                                                                                               |
| express-session         | `npm install express-sessio`                                                                                                           |
| express-ejs-layouts     | `npm install express-ejs-layouts`                                                                                                      |
| ejs                     | `npm install ejs`                                                                                                                      |
| dotenv                  | `npm install dotenv`                                                                                                                   |
| dayjs                   | `npm install dayjs`                                                                                                                    | 
| connect-flash           | `npm install connect-flash`                                                                                                            |
| bcryptjs                | `npm install bcryptjs`                                                                                                                 |                                                | mongoose                |`npm install mongoose`                                                                                                                  |
| multer                  |`npm install multer`                                                                                                                    |       
| passport                |`npm install passport`                                                                                                                  |
| passport-google-oauth20 | `npm install passport-google-oauth20`                                                                                                  |                                               
| passport-local          |`npm install passport-local`                                                                                                            |                                       
| socket.io               |'npm install socket.io'                                                                                                                 |
|nodemon                  |`npm install nodemon --save-dev`                                                                                                        |

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Technologies
 
 **Server-Side & Frameworks**

- Node.js: The core runtime for executing JavaScript on the server.

- Express: A minimalist web framework for Node.js, managing routing and middleware.

**Authentication & Authorization**

- Passport: Middleware for authentication in Node.js applications.

- passport-google-oauth20: Provides Google OAuth 2.0 strategy for users to sign in with their Google accounts.

- passport-local: Handles local authentication (using email/password), with bcryptjs for hashing passwords securely.

**Database & ORM**

- MongoDB: The NoSQL database used to store user data, posts, chat messages, etc.

- Mongoose: An ODM (Object Data Modeling) library that allows for schema-based data validation and interaction with MongoDB.

**View Engine**

- EJS: A template engine for rendering HTML dynamically, injecting server-side data into views.

- express-ejs-layouts: Helps structure EJS layouts more effectively, allowing reusable layout templates for consistent page design.

**Real-Time Communication**

-  Socket.io: Enables real-time, bi-directional communication between the client and server, used here to implement chat rooms and instant updates.

**File Uploads**

- Multer: Middleware for handling multipart/form-data, which is primarily used for file uploads, such as user profile pictures or post images.

**Utilities & Helpers**

- dotenv: Loads environment variables from a .env file, keeping sensitive information like API keys out of the source code.

- connect-flash: Provides flash messages to the user for notifications or alerts, often used with session-based authentication.

- express-session: Middleware for handling user sessions, enabling login persistence across requests.

- bcryptjs: Used for securely hashing passwords for storage in the database.

- dayjs: A lightweight library for handling dates and times, useful for formatting timestamps and calculating relative times.

- Development Tools

- nodemon: A development dependency that automatically restarts the server when file changes are detected, improving development efficiency.

**Third-Party Services & APIs**

- Google APIs: Google OAuth 2.0 is used to allow users to sign in with their Google accounts, providing an alternative to manual registration and login.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
## Challenges and Struggles
Learning New Technologies

 1 - **Challenge**: I was unfamiliar with Node.js and the Express framework.
   
   -  **Solution**: I created a study plan, watched tutorials, and referred to the official documentation. With dedication, I became proficient in these technologies.
  
   -  **Lesson Learned**: Consistent learning and applying new knowledge helped me overcome the steep learning curve.
Routing Issues

2- **Challenge**: Implementing routing was initially confusing.
  
  -  **Solution**: After practicing and referring to tutorials, routing became easier to understand and implement.
 
  -  **Lesson Learned**: Hands-on practice and research were key to mastering routing in Express.
Adding New Elements to Pages

3 - **Challenge**: I often forgot to add necessary references when adding new elements to a page.
    
  -  **Solution**: I made sure to double-check my code and include all references properly.

  -  **Lesson Learned**: Reviewing the code for completeness before finalizing any changes became an important habit.
Handling Type Mismatches

4 - **Challenge**: When sending the post ID to link it to another user, the ID was returned as a string, not as an object.
   
   -   **Solution**: I researched this issue on StackOverflow and implemented type conversion to ensure proper handling of the ID.
   
   -  **Lesson Learned**: Researching and understanding type handling in JavaScript was crucial for fixing this issue.
Private Chat Implementation

-------------------------------------------------------------------------------------------------------------------------------------------------------------

# Architecture

### Frontend

|       Component           |                                                     Description                                                                                                   |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| view                      |  Contains EJS templates for rendering HTML pages                                                                                                                  |
| public folder             | Hosts static files such as CSS and JavaScript and images                                                                                                          |

### Backend

|    Component                           |           Description                                                                                                                                                  |
|----------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| config/:                               | Contains configuration files for multer, passport (authentication setup), and other middlewares.                                                                       | 
| controllers/:                          | Handles the application’s core logic, such as user profile updates, authentication, and other feature-specific actions.                                                |
| routes                                 | contain routs of all pages                                                                                                                                             | | app.js                                 | Entry point of the application, where configurations and routes are initialized.                                                                                       |
| Socket io                              | contain the file that handle conneciton between server and client .                                                                                                    |
| package.json                           | contain all installed packages                                                                                                                                         |
| .env                                   | contain the importana keys                                                                                                                                             | | .gitignoer                             | contain node-modulers amd .env                                                                                                                                         |

### Databases

| Component        | Description                                                                                                                                                                               |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| models/:         | Contains Mongoose schemas to define and interact with MongoDB collections                                                                                                                 |

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# snippets 
**auth**
```
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error_msg', 'You need to log in to access this page.');
    res.redirect('/login'); // Redirect to login if not authenticated
}
```

**auth of log in:**
```
const loginLocally = (req, res, next) => {
    passport.authenticate('local',  (err, user, info) => {
        if (err) throw err;
        if (!user) {
            req.flash('error_msg', info.message);
            return res.render('login', { email: req.body.email , password: req.body.password});
        }
        req.login(user, async (err) => {
            if (err) throw err;
           const allPosts = await Post.find();
            console.log(allPosts);
    
            if (allPosts.length === 0) {
                console.log('No posts found');
            }
            req.flash('success_msg', 'You are now logged in');
            return res.render('dashboard', { allPosts , user: req.user });
    
    
        });
    })(req, res, next);
}
```
**auth of logout**
```
const logOut = [
    ensureAuthenticated, (req, res) => {
    
        req.logout(err => {
            if (err) { return next(err); }

            req.flash('success-msg', { message: 'You are now logged out' });
            res.redirect('/home');
        });
    }
]   
```


**addBio**
```const addBio = [
    async (req, res) => {
        const user = req.user;
        const { bio } = req.body;
      
        console.log(bio);

        try {
            const profile = await Profile.findOneAndUpdate(
                { userId: user._id },
                { bio },
                { new: true }
            );
           return res.render('profile', { user, profile });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'An error occurred while updating the profile bio');
          return  res.redirect('/users/profile');
        }
    }
]
```


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Usage

- **HomePage:** Landing page for the site with information and features.

- **Sign Up:**

   Users can sign up to create an account on the site.

  **Sign Up With Google**:

   User can sign up with google

- **Login:**

    Users can log in to the site to reserve a car.

  **Login with Google**:

   Users can log in easily with google
-
-  **Logout:**

    To log out of the site.

- **Pet Requests:**

   Users can see breeding requests and send requests for others to match with pets."

   **My profile**:

   Each user can have own profile page and can upload imgs and write bio and share information about him

- **Settings:**

   Users can change ther password, and if the log in with google they can create a password ,
  users also can edit the basic info and add or edit details about them such as their interests.

   **Delete Profile**:

  User can delete his account and all his actions like posts.

   **View Profile as Others See It**:

   these show the profile as hoe others see it and it show the user info with amazing way

   **Chat**

   a page user can choose the room to jion it and can connect other then direct user to the choosen room

**Create Breeding Request**
  
  allow user to fill form to post their animal info to get breeding requests

**My Breeding Requests**
 
  it show to each user it's posted requested with the offers from other users


--------------------------------------------------------------------------------------------------------------------------------------
## Future Improvements & Features
1 - **Private Chat Rooms for Each User**
  
  Plan: To enhance communication, each user will have their own private chat room for one-on-one conversations.

2 - **Frontend Optimization**

Plan: Optimize the frontend for faster load times and a more responsive experience across devices.

3 - **Pet Products Store**
  
  Plan: I will add an online store where users can purchase essential pet supplies, making the platform a comprehensive resource for pet lovers.

## Contributing

Everyone has ideas to make the site better, and you are encouraged to share yours! Your advice is valuable, and I am still learning, so thank you for your help in making my site better.

- **Fork the Project**
- **Create your Feature Branch**
- **Commit your Changes**
- **Push to the Branch**
- **Open a Pull Request**
-----------------------------------------------------------------------------------------------------------------------------------------

