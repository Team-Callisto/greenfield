# greenfield
Feature Concepts:
I.Concept behind texting(aka what it was supposed to do):

  1. Every time interval(1 hour) send out a text to a user.
  
  2. The texts asks for a number ranging from -2 to +2.
  
    //https://www.twilio.com/docs/tutorials/appointment-reminders-node-express
    
  3. Save that number to the database as **level** 
  
  4. IF mood level drops drastically(drastically === -2), THEN: option A. send to text to a user's friend which requests that the friend       reaches out to the user with an encouraging text or phone call. option B: Send Funny gif or inspirational quote to user via txt mms


II.Concept behind mood: 

  1.Track the mood of the person(check home controller file for moods)
  
    *note: may have to add mood to database*
    
  2.Correlate that data to the level 

III. Concept behind circle colors: 

  1.If someone is feeling down, you might want to brighten their day with a nice yellow color!
  
  //http://www.color-chart.org/mood-ring-color-chart.php
  
  
Things to do(if you want):

  1.Refactor to ES6 
  
  2.Work through some texting features towards the original goal **Feature Concept I**
  
  3.Authenticate with facebook or github
  
  4.Make it so you dont have to sign in everytime the page refreshes 
  
  5.Track mood **Feature Concept II **
  
  6.Move controller methods to their own factories
  
  7.Change color of the circle based off the mood of the user **Feature Concept III**
  
  8.Generally, delete anything that looks useless, and make things better, delete api keys that should be ignored 
  
