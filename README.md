
# Productivity App

This is a personal project meant to practise Full Stack skills.

You can check the online version [here](https://ancient-castle-89334.herokuapp.com/)

It uses the following technologies:
- JavaScript
- React
- nodejs
- nodemon
- express
- MongoDB
- Heroku
- cors
- dotenv
- morgan

The main objective is to build two different but complementary components within one website.

At least for now, styles and looks are not a priority.

The backend side of the project is a different repository deployed in Heroku.

## Pomodoro Timer

The first component is a simple pomodoro timer set to the most common style: 4 X 25 minutes focus, with 3 X 5 minutes short breaks and one 15 minutes long break.

A restart button is also included. So far there is yet no option for setting up different time periods.

## kanban Board

The Kanban Board uses 'react-beatutiful-dnd' library to achieve drag and drop within columns. It is also integrated to MongoDB, where cards are stored and fetched from.

