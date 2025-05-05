Task API
This is a simple REST API built using Node.js. It allows you to manage tasks with basic CRUD (Create, Read, Update, Delete) functionality.

Features 📝
GET /tasks: Retrieve a list of all tasks.

GET /tasks/:id: Retrieve a specific task by its id.

POST /tasks: Create a new task.

DELETE /tasks/:id: Delete a specific task by its id.

Getting Started 🚀
To get this project running on your local machine, follow the steps below.

Prerequisites 🖥️
Make sure you have Node.js installed on your machine. You can download it from the official Node.js website.

Installation 💾
Clone the repository:

git clone https://github.com/yourusername/task-api.git
cd task-api
Install dependencies:

This project uses uuid and fs (built-in Node modules) for handling unique IDs and file operations.

Install the necessary dependencies:

npm install
API Endpoints ⚡️
1. GET /tasks 📋
Retrieve a list of all tasks.

Example Response:
json

[
  {
    "id": "3aef093e-c8a9-4bc4-85cf-c64f22026ab5",
    "name": "Task 1",
    "completed": false
  },
  {
    "id": "bcb9d8b2-c645-4b2f-b83d-397b8310b233",
    "name": "Task 2",
    "completed": true
  }
]
2. GET /tasks/:id 🔍
Retrieve a task by its id.

Example Request:

GET /tasks/3aef093e-c8a9-4bc4-85cf-c64f22026ab5
Example Response:
json

{
  "id": "3aef093e-c8a9-4bc4-85cf-c64f22026ab5",
  "name": "Task 1",
  "completed": false
}
3. POST /tasks ➕
Create a new task.

Request Body:
json

{
  "name": "New Task",
  "completed": false
}
Example Response:
json

{
  "id": "1fa82b25-8d67-4c16-b98b-1ff90c987e76",
  "name": "New Task",
  "completed": false
}
4. DELETE /tasks/:id ❌
Delete a task by its id.

Example Request:


DELETE /tasks/3aef093e-c8a9-4bc4-85cf-c64f22026ab5
Examples for Testing API with cURL 🖱️
Here are some example cURL commands that can be used to test the endpoints:

Retrieve all tasks:

curl http://localhost:3000/tasks
Retrieve a specific task:

curl http://localhost:3000/tasks/{id}
Create a new task:


curl -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"name": "New Task", "completed": false}'
Delete a task:

curl -X DELETE http://localhost:3000/tasks/{id}
Error Handling ⚠️
The API includes error handling for different types of invalid requests:

400 Bad Request: This error will be returned if the request body is not valid JSON or if any required fields are missing when creating a task.

Example:

json

{
  "error": "Invalid JSON"
}
404 Not Found: This error will be returned if the task is not found by the provided id for either a GET or DELETE request.

Example:

json

{
  "error": "Task not found"
}


