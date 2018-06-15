<!DOCTYPE html>
<!--
Name:  Daniel Hope
Assignment:  Assignment 8
Date:  April 23, 2017

App Description: This application invokes a classic Pick-A-Pair game, 
that tracks the time and number of moves taken to find all matches(complete
game).

Page Description: This is the index/main page that allows the user to play 
the game.
Files: script.js - contains the functionality of the game
       style.css - contains the styles for the application
       index.php = contains code for user name/password and connection to DB
-->
<html>
  <head>
    <meta charset="UTF-8">
    <title>Login Page</title>
  </head>
  <body>
    <p>Question 1</p>
    <form method ="POST" action="test.php">
      <input type ="text" name ="UserNameInput" placeholder="User name" 
             title="User name must be at least 10 letters, eg. Sarah Silverman" 
             pattern="[a-zA-Z].{10,}"/>
      <input type ="text" name ="PassWordInput" placeholder="Password" 
             title="Password must be at least 10 characters and must 
             include one number and one letter, eg. FoxtrotAlpha88"
             pattern="(?=.*\d)(?=.*[a-zA-Z]).{10,}"/>
      <input type="text" name="IdInput" placeholder="User ID" pattern="[0-9]{10,}" 
             title="User ID must be at least 10 numbers eg. 0123456789"/>
      <input type ="submit" value = "Submit1" name ="SubmitLogin"/>
    </form>

    <p>Question 2</p>
    <?php
    //connect to the database using connectionstring
    $connectionString = mysqli_connect('localhost', 'root', '', 'test');
    ?>


    <div>
      <form action ="" method ="POST">
        <p><label>Username:</label>
          <input type="text" id="user" name="username"/>           
        </p>
        <p><label>PassWord</label>
          <input type="password" id="pass" name="password"/>           
        </p>
        <p>
          <input type="submit" id="btn" value="Login"/>           
        </p>
      </form>
    </div>


<?php

if (isset($_POST['username']) && isset($_POST['password'])) {
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    
    if (isset($_POST["submit"])) {
        mysqli_query($connectionString, "insert into users values('$_POST[username]',"
                . "'$_POST[password]') ");
    }


    $result = mysqli_query($connectionString, "select * from users where username = '$username' and password ='$password'") or die("failed to find db " . mysql_error());


    if ($_POST['username'] == $username && $_POST['password'] == $password) {
        echo "success welcome " . $_POST['username'];
    } else {
        echo "failed login";
    }
}
?>


  </body>
</html>
