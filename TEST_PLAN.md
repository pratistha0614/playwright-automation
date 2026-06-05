# Test Plan

## Project Overview

This test plan covers UI and API testing for the SauceDemo e-commerce application and ReqRes API using Playwright with TypeScript.

The goal is to verify that key user workflows and API endpoints work as expected.

---

# Scope

## In Scope

### UI Testing

* Login functionality
* Product listing and sorting
* Product details page
* Cart management
* Checkout process
* Logout functionality

### API Testing

* User retrieval
* User creation
* User update
* User deletion
* User authentication
* Error handling and validation

## Out of Scope

* Payment gateway testing
* Mobile responsiveness testing
* Cross-browser testing
* Accessibility testing
* Load and stress testing

---

# Test Cases

| ID    | Test Case                                 | Expected Result                                          |
| ----- | ----------------------------------------- | -------------------------------------------------------- |
| TC001 | Login with valid credentials              | User logs in successfully                                |
| TC002 | Login page elements are visible           | Username, password fields and login button are displayed |
| TC003 | Logout successfully                       | User returns to login page                               |
| TC004 | Session remains active after page refresh | User stays logged in                                     |
| TC005 | View product list                         | Products are displayed correctly                         |
| TC006 | Sort products A-Z                         | Products are sorted alphabetically                       |
| TC007 | Sort products Z-A                         | Products are sorted in reverse alphabetical order        |
| TC008 | Sort products by price low to high        | Products are sorted by ascending price                   |
| TC009 | Sort products by price high to low        | Products are sorted by descending price                  |
| TC010 | Open product details page                 | Product details page opens successfully                  |
| TC011 | Add item to cart                          | Item is added to cart                                    |
| TC012 | Add multiple items to cart                | Cart count updates correctly                             |
| TC013 | Remove item from cart                     | Item is removed from cart                                |
| TC014 | Continue shopping from cart               | User returns to products page                            |
| TC015 | Remove all items from cart                | Cart becomes empty                                       |
| TC016 | Complete checkout process                 | Order is completed successfully                          |
| TC017 | View checkout summary                     | Price details are displayed correctly                    |
| TC018 | Login with invalid credentials            | Error message is displayed                               |
| TC019 | Login with locked account                 | Login is blocked and error message appears               |
| TC020 | Login with empty fields                   | Validation message is shown                              |
| TC021 | Login without password                    | Password required message is displayed                   |
| TC022 | Checkout with empty form                  | Validation message is shown                              |
| TC023 | Get users list API                        | Status code 200 is returned                              |
| TC024 | Get single user API                       | Correct user data is returned                            |
| TC025 | Create user API                           | Status code 201 is returned                              |
| TC026 | Update user API                           | User information is updated                              |
| TC027 | Delete user API                           | Status code 204 is returned                              |
| TC028 | Verify pagination API                     | Different pages return different data                    |
| TC029 | Register API with valid data              | Token and ID are returned                                |
| TC030 | Login API with valid data                 | Token is returned                                        |
| TC031 | Verify API response time                  | Response is received within 3 seconds                    |
| TC032 | Get non-existing user                     | Status code 404 is returned                              |
| TC033 | Register without password                 | Status code 400 is returned                              |
| TC034 | Login without password                    | Status code 400 is returned                              |
| TC035 | PATCH request with empty body             | Status code 200 is returned                              |
| TC036 | Request with invalid API key              | Status code 401 is returned                              |

---

# Edge Cases

1. Login with blank username and password.
2. Login with locked user account.
3. Login with only username entered.
4. Add the same product multiple times.
5. Remove an item that is not present in the cart.
6. Attempt checkout with an empty cart.
7. Submit checkout form without required information.
8. Refresh page during checkout process.
9. Request a non-existing user through API.
10. Send login request without password.
11. Send register request with missing fields.
12. Use an invalid API key while accessing endpoints.

---

# Risks

| Risk                                       | Impact                               |
| ------------------------------------------ | ------------------------------------ |
| Application UI changes                     | Automated locators may fail          |
| API endpoint changes                       | API tests may fail                   |
| Test data changes                          | Test results may become inconsistent |
| Network issues                             | API requests may fail                |
| Third-party service downtime               | Tests may produce false failures     |
| Environment configuration issues           | Test execution may be interrupted    |
| Changes in API authentication requirements | API tests may stop working           |

---

# Test Environment

* Operating System: Windows 11
* Framework: Playwright
* Language: TypeScript
* Browser: Chromium
* Execution Mode: Headless
* Reporting: HTML Report

---

# Exit Criteria

Testing will be considered complete when:

* All planned test cases are executed.
* Critical defects are resolved or documented.
* Test execution report is generated successfully.
* Core UI and API workflows pass successfully.
