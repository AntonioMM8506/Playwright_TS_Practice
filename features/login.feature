Feature: Login
  This feature covers the login functionality for various user types, including standard, 
  locked out, problem, performance, error, and visual users. It validates successful logins, 
  handles error scenarios, and ensures proper feedback is provided for invalid credentials and 
  user states.

  Background: User is in the login page
    Given User is in the Login Page

  Scenario: Standard user logs in
    When "standard" user enters their valid credentials
    Then user can see the Home Page
  
  Scenario: Locked out user logs in
    When "lockedout" user enters their valid credentials
    Then user can see the Home Page

  Scenario: Problem user logs in
    When "problem" user enters their valid credentials
    Then user can see the Home Page

  Scenario: Performance user logs in
    When "performance" user enters their valid credentials
    Then user can see the Home Page
  
  Scenario: Error user logs in
    When "error" user enters their valid credentials
    Then user can see the Home Page

  Scenario: Visual user logs in
    When "visual" user enters their valid credentials
    Then user can see the Home Page

  Scenario: Standard user tries to log in with an invalid password and sees an error message
    When standard user enters "invalid_password" as password
    Then user sees error message "Epic sadface: Username and password do not match any user in this service"