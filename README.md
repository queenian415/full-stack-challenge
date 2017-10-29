# Full Stack Developer Challenge
This is an challenge forked from Paytm Labs. 

## How to Open the App
* Go to link http://xyzabc-full-stack.s3-website-us-east-1.amazonaws.com/

## Requirements
Implemented requirements are listed below:

Admin:
* Add/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

Employee:
* List of performance reviews requiring feedback
* Submit feedback

## Assumptions and App Flow (Due to time constraint and for simplicity)

### Admin Page
* No log in required, no authentication
* Only one admin manages the system
* Admin has access to all employees
* Admin sees a employee list once enter admin page
* Admin selects an employee from employee list to enter detail page
* In detail page, admin can update performance review for the employee
* Admin has to click Save button to save performance review content
* In detail page, admin can also assign other employees for feedbacks from checkbox list
* Admin can assign multiple employees for feedbacks for one performance review
* Admin can assign employees for feedback even when performance review is empty
* Admin cannot see the feedbacks given by employees

### Employee Page
* No log in required, no authentication
* Employee sees a employee list once enter employee page
* Employee select who they are from the list
* In employee page, employee sees all performance reviews assigned to him
* In employee page, employee sees feedback textarea under each performance review
* Employee cannot edit performance review
* Employee can edit feedback textarea to give feedbacks
* Employee has to click Submit button for submitting feedback

## Design and Technology
* This web app has three layers: front-end, backend, database
* Backend connects to the database, gives RESTful API endpoints
* Front-end makes HTTP request to Backend API endpoints, backend handles the requests,makes connection to database, updates records, and return results

### Front-end
* React
* React-router for routes. JavaScript fetch polyfill for making HTTP requests
* Hosted on AWS S3 static website host: http://xyzabc-full-stack.s3-website-us-east-1.amazonaws.com/
* Makes HTTP requests to backend REST API endpoints for making changes and loading content
* Integrated with Backend APIs

### Backend
* Implemented 9 APIs
* Serverless architecture for simplicity
* NodeJs
* Mysql for mysql database connection
* Hosted on AWS Lambda, with API Gateway as HTTP proxy
* Each Lambda function has as a API Gateway endpoint
* Makes connection to database

### Database
* Mysql in AWS RDS

```
Tables:
+----------------------+
| Tables_in_full_stack |
+----------------------+
| Admin                |
| Employee             |
| Feedback             |
| Performance          |
| Performance_Feedback |
+----------------------+
Schemas for tables:
Admin:
  +----+------+
  | id | name |
  +----+------+
Employee:
  +----+---------+---------------+
  | id | adminId | name          |
  +----+---------+---------------+
Feedback:
  +----+--------------+--------+-----------------+---------------+----------------+
  | id | feedbackerId | perfId | content         | create_ts     | modified_ts    |
  +----+--------------+--------+-----------------+---------------+----------------+
Performance:
  +----+------------+-------------------+-------------------+-------------------+
  | id | employeeId | content           | create_ts         | modified_ts       |
  +----+------------+-------------------+-------------------+-------------------+
Performance_Feedback:
  +--------------+--------+------------+------------+
  | feedbackerId | perfId | employeeId | feedbackId |
  +--------------+--------+------------+------------+
```