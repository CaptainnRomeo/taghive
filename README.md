This application implements all the features listed below in Nodejs.

Feature 1: User Registration and Authentication

● Design and implement API endpoints for user registration and authentication.
● Enhance the registration process to include additional information like role
(student/teacher), school/organization name, etc.
● Implement secure password storage using appropriate hashing and encryption
techniques.
● Generate and return an authentication token upon successful authentication.

Feature 2: Course Management

● Design and implement API endpoints for managing courses.
● Allow teachers to create, update, and delete courses.
● Ensure that only authenticated teachers can perform these actions.
● Implement data validation and error handling for the course-related endpoints.
● Store course information in the MongoDB database.

Feature 3: Student Enrollment

● Design and implement API endpoints for student enrollment in courses.
● Allow students to view available courses and enroll in them.
● Implement appropriate access control to ensure only authenticated students can enroll.
● Track student enrollment data in the MongoDB database.

Feature 4: Progress Tracking

● Implement a mechanism to track student progress within each enrolled course.
● Design and implement API endpoints to record and update student progress.
● Include features like marking completed lessons, tracking quiz scores, etc.
● Ensure that only enrolled students can access and update their progress.

Bonus Feature: Notifications

● Implement a system for sending notifications to users.
● Design and implement API endpoints for sending notifications.
● Allow teachers to send course-related notifications to their students.
● Implement a mechanism to track and display unread notifications for each user.

Instructions to setup the project.

1. Install Nodejs on the system.
2. Have one instance of mongodb either local or remote.
3. Clone the git repo into your local machine.
4. Run "npm install".
5. Start the server by running "node index.js"

Below is the list of the APIs and the required payload

1.(POST) http://localhost:3000/api/auth/register
Payload:
{
"username":"michael",
"password":"54321",
"email":"example@example.com
"role":"student",
"schoolName":"example"
}

2.(POST) http://localhost:3000/api/auth/authenticate
Payload
{
"username":"michael",
"password":"54321",
}

3.(POST) http://localhost:3000/api/auth/courses/

4.(PUT) http://localhost:3000/api/auth/courses/:courseId
Payload:
Bearer token and courseID

5.(DELETE) http://localhost:3000/api/auth/courses/:courseId
Payload:
Bearer token and courseID

6.(GET) http://localhost:3000/api/auth/courses/
Payload:
Bearer token

7.(POST) http://localhost:3000/api/auth/courses/:courseId/enroll
Payload:
Bearer token and courseID

8.(GET) http://localhost:3000/api/auth/courses/enrolled
Payload:
Bearer token

9.(PUT) http://localhost:3000/api/auth/courses/:courseId/progress/
Payload:
Bearer token and courseID

10.(GET) http://localhost:3000/api/auth/courses/:courseId/progress/
Payload:
Bearer token and courseID

11.(POST) http://localhost:3000/api/auth/notify ## update the notification controller with your creds for this to work ##
