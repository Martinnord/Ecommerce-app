# Ecommerce App

  

## Purpose
  

Letting people to upload things they'd like to sell. Might implement chatting feature for fun.

  

## Project goals

  

* Get feed of products to buy

* Filter products

* Sell products

* Being able to update and delete a product

* Take photo/ upload image to the product

* Give seller it's own profile to be contacted

* Design a super beautiful UI.

  

## Project planning  

The trello board with the planning:

https://trello.com/b/gNmjCoDi/ecommerce-app

  

The methodology that will be used for this project is an agile-like one which is a mix of kanban/scrum.

  

### Backlog

The project planning consists of a backlog of all the features that are planned. Not all of the will become a reality because of time constraints but there will be a prioritization.

  

## Method

When developing this project I first started with planning. I have always been a fan of Kanban, but I also wanted to try out SCRUM. Instead of switching to a SCRUM directly I ended up with combining those two. I ended up with:


* All the features I wanted

* The design of the app

* What technologies I wanted to use

* The information structure

* How the navigation will be

  

After the planning I started developing the app and API. I started of with the core features:

* Being able to create an account

* Being able to create a product

* Browse all the products

* Design the login-, register- and products screen

## Tools

Both the frontend and backend will be using ESlint. Which is basically used to find problematic patterns or code that doesn't follow a certain style guidelines.

#### Frontend (The actual app)

I'm using React Native (RN) to create the app since it's crossplatform which means it will run both on iOS and Android.

The RN app will be using Apollo Client since my I have a GraphQL API. And Apollo Client works as a bridge between the app and the API.

The app will also be running on EXPO, which makes the development less time consuming. It also helps with prototyping.

#### Backend

The backend will be running on Prisma. Prisma is a GraphQL database proxy turning your database into a GraphQL API.

I decided to use Prisma mostly to try it out, but also since I will be mostly focusing on the app Prisma will be great to have since it already comes with features that I had to develop myself (which takes time).

## Informatoin Architecture
My IA is really basic, but it fits my needs.

I'm first checking the token with my route `CheckToken`. If the user has a token I will send him/her directly to the `Products` route. If the user don't have a token he/she will land on the `Signup` route. The user can also navigate between the `Signup` and `Login` route.

The `Products` route contains of a list with all the products. From there a user can navigate to a specific product (`Product`) or create thir own product (`CreateProduct`). After a user has created a product he/ she will be redirect to the `Products` route.

From the `Product` route a user can navigate to the seller (another user) and see information about him/ her. With information I mean:
* Name
* Products
* Maybe other things (we'll see!)

Below is an image of my IA
!\[Information Architecture\](https://i.imgur.com/ll2LClT.jpg)


## Code structure

My code structure has a pretty simple concept, but it also scales and is easy to maintain. The concept is to have the different routes as containers for other reusable components. The only issue is that I only have one css file. I could split it up to have different css files for all of the different routes.

```
/src  

  /components  
    TextField.js

  /routes  
    /CheckToken.js
    /CreateProduct.js
    /Login.js
    /Products.js
    /Signup.js
    /index.js
    /styles.css

  index.js   

```
The routes will be able to import components from `/components` and use their functionality when they want. For example: I'm using `TextField` at `/Login`, `/Register` and `/CreateProduct`. 
  
## Design of the app

The photo(s) below is the current design of the app. All of the UI is built from scratch using Sketch.

  

!\[Current Design\](https://i.imgur.com/LhUkD28.png)
