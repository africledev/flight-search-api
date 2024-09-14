# NumberAma : Backend Requirements Document

> Its A Game of Numbers 💯 

## 1. Overview
Develop a RESTful API service that provides trivia facts about numbers.

## 2. Functional Requirements
2.1. Provide trivia facts for given numbers

2.2. Support number inputs from 0 to 99999

2.3. Implement a shorthand endpoint for trivia requests

2.4. Return appropriate error responses for invalid inputs or server errors

## 3. Non-Functional Requirements
3.1. Implement the API using Node.js and Express

3.2. Use TypeScript for improved code quality and maintainability

3.3. Follow OpenAPI 3.0 specification for API documentation

3.4. Containerize the application using Docker

3.5. Ensure high performance and low latency responses

## 4. API Endpoints
4.1. GET /: Retrieve API metadata

4.2. GET /trivia/{num}: Get trivia fact for a specific number

4.3. GET /{num}: Shorthand endpoint for trivia facts

## 5. Response Format
Trivia responses should include:
   - text: The trivia fact

   - number: The queried number

   - found: Boolean indicating if a fact was found
   
   - type: The type of fact (e.g., "trivia")

## 6. Error Handling
6.1. Implement proper error responses for 400 and 500 status codes

6.2. Include an "error" field in error responses

## 7. Documentation
7.1. Provide clear API documentation using OpenAPI specification

7.2. Include usage examples in the API description

## 8. Deployment
8.1. Create a Dockerfile for containerization

8.2. Optimize Docker image for minimal size and security