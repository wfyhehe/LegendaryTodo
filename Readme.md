# Legendary Todo  
#### a simple, stable, efficient and legendary Todo-list.
*@Design & Code by wfy*
### Features  
#### Sign up
Reliable authentication system. You're the only one who can get access to these Todos.  
So before you enjoy it, please spend 10 seconds to **sign up** first.  
![Sign-up](https://raw.githubusercontent.com/wfyhehe/LegendaryTodo/master/resources/sign-up2.gif)
  
#### Create & Edit & Delete
Now we can get started!  
What to do next? Just click the "+" button then write down!  
PS: You can choose how urgent your task is and when the deadline is  
Target changed? Not to worry, **edit** is quite easy!  
![Create & Edit & Delete](https://raw.githubusercontent.com/wfyhehe/LegendaryTodo/master/resources/create-edit-delete2.gif)

#### Sort & Filter
I think you got a lot to do, and now wandering what to do first.  
However, it's my favorite feature that you can put these tasks in any order. By default, the one **nearest to deadline** is one the top, and you can sort in by **urgency** if you like.  
(PS: Completed tasks are always on the bottom)  
![Sort & Filter](https://raw.githubusercontent.com/wfyhehe/LegendaryTodo/master/resources/sort-filter1.gif)

#### Complete
To complete your task, the only thing you need is a single click!  
Then you will notice that the top border of the card becomes <span style="color: #22ff99;">green</span>.  
At the same time, this action has been sent to remote database.  
![Complete](https://raw.githubusercontent.com/wfyhehe/LegendaryTodo/master/resources/complete.gif)  

#### Search
Search bar is on the top-right (the "search" option on the left menu bar is deprecated). This function is equipped with weapon "**debounce**", which means it's not necessary to press Enter key. Once you finished typing on it, it will do search in 500ms on the condition that no any changes during 500ms.  
(PS: Search, Filter, Order are all run at the *front-end*, thus users will hardly see lag, and the server can also benefit).  
![Search](https://raw.githubusercontent.com/wfyhehe/LegendaryTodo/master/resources/search.gif)
  
#### Sign-out & Sign-in  
Anonymous user(unauthenticated) has no access to the main page, every user has his/her secluded todo space(definitely!).   
 Since all your data is persisted on the database, these todos will never lost (even if you press button to delete it, we can restore from database). 
 (PS: We remember you for 24 hours, then you have to sign-in again.)
![Sign-out & Sign-in](https://raw.githubusercontent.com/wfyhehe/LegendaryTodo/master/resources/sign-in.gif)