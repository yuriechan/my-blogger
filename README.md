# my-blogger
A simple website to post, update, delete blog posts without user authentication. <br>
**Warning: the application is buggy when there is multiple blog post handled within the application** (As of June 30th)<br>
**However, you will be able to test all the features with no problem as long as only one blog post is published in the application**<br> 
See the hosted project [here](https://yurie-s-website.web.app/). 

## 🥞 Tech Stack
Created with [Vue](https://vuejs.org/index.html) / [Vuex](https://vuex.vuejs.org/) and bootstrapped with `vue create`.<br>
Developed with JavaScript.<br>
Styled with [Vuetify](https://vuetifyjs.com/en/).<br>
Code style enforced with [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/).<br>
Deployed through [firebase](https://firebase.google.com/) and data managed with Firestore.<br>

## 🎁 Feature 
- `Write` a new blog post, and post it 
- `Delete` an existent blog post 
- `Click` on a blog post to see details 
- `See` the entire list of the blog post by latest dates 
- `Edit` a blog post 

## 🎡 Things I have considered during the development 
- Deleting collection inside the cloud database using, `auto-generated id` to manage data in a clean manner instead of tracking blog posts with counter variables
- Using [Firestore transaction methods](https://firebase.google.com/docs/firestore/manage-data/transactions) for actions which include multiple operations such as editing a post (read + write)
- Managing the entire data in-store vs Firestore => I ended up storing the entire data inside the cloud database, so reactivity was not fully taken advantage which is one of the core features of Vue

## 💡 Learning Experience 
- Using Vue router for the first time was a good intro in understanding how single-page applications work 
- Running the application on development and hosted environment can have different behaviors, so tests are needed to ensure good performance
- Good refresher on `async/await` by handling database operations

## 🚧 Fix needed 
- Fixing glitches and bug after deploy (all the events registered in the client are triggered, causing maximum call stack size to exceed the limit)
- For the `editing` feature, I need to consider cases where users decided `not` to save the edits made.
- Update data rendered in the client without reloading the page for better user experience. 

## 🚀 Project setup
- Use `git clone` to clone this repository. Alternatively, download the source code.
- Make sure you're in the root folder by executing `cd my-blogger/`.
- Make sure required dependencies have been installed using `yarn install`.  

## 🛠 Development and testing 
- `yarn serve` to compile and hot-reload for development
- `yarn build` to compile and minify for production
- `yarn lint` to run eslint and fix files on the project
