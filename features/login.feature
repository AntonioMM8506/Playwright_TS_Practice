Feature: Login
  Validate User can Login

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