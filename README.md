This is the final project for the coding school full stack web development course.

This project uses nodeJS with express framework to create a user management system.
The user can register by providing the desired username, email and password. Once the user
signs in a session is created. The web app checks the existence of the session in order to check if
the user is signed in or not. Once the user signs in the main page is shown. The main page shows a table of users
that includes columns for username, email and the date of creation. If the user is 'Admin' he can delete or modify the users
by changing their username, email or password. The user can also change his/her username, email or password. Admin can only change his 
email and password but not the username. 

The web app connects to a MySQL database where the user data is stored.

The passwords for the users are salted and hashed. The plain text password is used to generate the salt. The md6 hash value of the plaintext
is split into two parts. The first 10 charachters and last 22 charachters. the plaintext password is added to the first 10 charachters and
then the last 22 charachters are added to the sum. The resulted string is hashed using SHA256. The resulted hash is stored in the database.
when authenticating the same salting and hashing operation is used and the resulted hash is compared to the hash stored on the database.

CSS is used to create a pleasant looking dark and flat design.
