# Application Documentation

## Overview

The application provides an API for managing the opening of new current accounts for already existing customers.

It includes functionalities to create new accounts, perform transactions, and retrieve user information including account balance and transaction history.

## How to Use the Application

### Prerequisites

- Docker must be installed and running.
- Git must be installed.

### Clone the Repositories

Clone the frontend and backend repositories:
```sh
git clone https://github.com/brunomgama/transaction-frontend
git clone https://github.com/brunomgama/transaction-capgemini
```

### Run the Frontend

Navigate to the frontend directory and start the development server:
```sh
cd transaction-frontend
npm install
npm run dev
```

### Run the Backend

Navigate to the backend directory and start the development server:
```sh
cd transaction-capgemini
mvn clean install
mvn compile quarkus:dev
```

When Quarkus starts, it will initialize a Docker container with a PostgreSQL database with the following properties:
- `quarkus.datasource.devservices.username=postgres`
- `quarkus.datasource.devservices.password=postgres`
- `quarkus.datasource.devservices.port=5432`

### Initial Data

Upon initialization, the database will be seeded with the following data:

#### Customers
```sql
INSERT INTO customer (id, name, surname) VALUES (1, 'Bruno', 'Gama'), (2, 'Alice', 'Smith'), ..., (20, 'Harper', 'Jackson');
```

#### Accounts
```sql
INSERT INTO account (id, customerId, balance) VALUES (1, 4, 100), (2, 5, 50), (3, 6, 200);
```

#### Transactions
```sql
INSERT INTO transaction (id, accountId, isDebit, amount) VALUES (1, 3, true, 20.0), (2, 3, true, 10.5), (3, 3, true, 5.25);
```

## API Endpoints

### Account Endpoints

- **Create Account**
    - **Endpoint:** `http://localhost:8080/account`
    - **Method:** <span style="color:yellow">**POST**</span>.
    - **Description:** Creates one single account.
    - **Request Body:**
      ```json
      {
        "customerId": Long,
        "balance": Double
      }
      ```
    - **Response:**
      ```json
      [
        {
          "accountId": Long,
          "customerId": Long,
          "balance": Double
        }
      ]
      ```

- **Get Account Details**
    - **Endpoint:** `http://localhost:8080/account/{accountId}`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves a specific account by the given `accountId`.
    - **Response:**
      ```json
      {
        "accountId": Long,
        "customerId": Long,
        "balance": Double
      }
        ```

- **Get Accounts by User**
    - **Endpoint:** `http://localhost:8080/account/filter/{userId}`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves all accounts associated with a specific user by `userId`.
    - **Response:**
      ```json
      [
        {
          "accountId": Long,
          "customerId": Long,
          "balance": Double
        }
      ]
      ```

- **Get All Accounts**
    - **Endpoint:** `http://localhost:8080/account`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves all existent accounts.
    - **Response:**
      ```json
      [
        {
          "accountId": Long,
          "customerId": Long,
          "balance": Double
        }
      ]
      ```     

- **Update Account**
    - **Endpoint:** `http://localhost:8080/account/{accountId}`
    - **Method:** <span style="color:orange">**PUT**</span>.
    - **Description:** Updates details of a specific account by `accountId`.
    - **Request Body:**
      ```json
      {
        "customerId": Long,
        "balance": Double
      }
      ```
    - **Response:**
      ```json
      {
        "Account with id xxx has been updated."
      }
      ```

- **Delete Account**
    - **Endpoint:** `http://localhost:8080/account/{accountId}`
    - **Method:** <span style="color:red">**DELETE**</span>.
    - **Description:** Deletes a specific account by `accountId`.
    - **Response:**
      ```json
      {
        "Account has been deleted"
      }
      ```


### Customer Endpoints

- **Create Customer**
    - **Endpoint:** `http://localhost:8080/customer`
    - **Method:** <span style="color:yellow">**POST**</span>.
    - **Description:** Creates one single customer.
    - **Request Body:**
      ```json
      {
        "name": String,
        "surname": String
      }
      ```
    - **Response:**
      ```json
      [
        {
        "id": Long,
        "name": String,
        "surname": String
        }
      ]
      ```

- **Get Customer Details**
    - **Endpoint:** `http://localhost:8080/customer/{customerId}`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves a specific customer by the given `id`.
    - **Response:**
      ```json
      {
        "id": Long,
        "name": String,
        "surname": String
      }
        ```

- **Get All Customers**
    - **Endpoint:** `http://localhost:8080/customer`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves all existent customers.
    - **Response:**
      ```json
      [
        {
          "id": Long,
          "name": String,
          "surname": String
        }
      ]
      ```     

- **Update Customer**
    - **Endpoint:** `http://localhost:8080/customer/{id}`
    - **Method:** <span style="color:orange">**PUT**</span>.
    - **Description:** Updates details of a specific customer by `id`.
    - **Request Body:**
      ```json
      {
          "name": String,
          "surname": String
      }
      ```
    - **Response:**
      ```json
      "Customer with id xxx has been updated."
      ```

- **Delete Customer**
    - **Endpoint:** `http://localhost:8080/customer/{customerId}`
    - **Method:** <span style="color:red">**DELETE**</span>.
    - **Description:** Deletes a specific customer by `id`.
    - **Response:**
      ```json
      {
      "Customer has been deleted"
      }
      ```


### Transaction Endpoints

- **Create Transaction**
    - **Endpoint:** `http://localhost:8080/transaction`
    - **Method:** <span style="color:yellow">**POST**</span>.
    - **Description:** Creates one single transaction.
    - **Request Body:**
      ```json
      {
        "accountId": Long,
        "isDebit": Boolean,
        "amount": Double
      }
      ```
    - **Response:**
      ```json
      [
        {
        "id": Long,
        "accountId": Long,
        "isDebit": Boolean,
        "amount": Double
        }
      ]
      ```

    - **Get Transaction Details**
        - **Endpoint:** `http://localhost:8080/transaction/{transactionId}`
        - **Method:** <span style="color:green">**GET**</span>.
        - **Description:** Retrieves a specific transaction by the given `transactionId`.
        - **Response:**
          ```json
          {
          "id": Long,
          "accountId": Long,
          "isDebit": Boolean,
          "amount": Double
          }
            ```

- **Get Transactions by User**
    - **Endpoint:** `http://localhost:8080/transaction/filter/{accountId}`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves all transactions associated with a specific account by `accountId`.
    - **Response:**
      ```json
      [
        {
        "id": Long,
        "accountId": Long,
        "isDebit": Boolean,
        "amount": Double
        }
      ]
      ```

- **Get All Transactions**
    - **Endpoint:** `http://localhost:8080/transaction`
    - **Method:** <span style="color:green">**GET**</span>.
    - **Description:** Retrieves all existent transactions.
    - **Response:**
      ```json
      [
        {
          "transactionId": Long,
          "customerId": Long,
          "balance": Double
        }
      ]
      ```     

- **Update Transaction**
    - **Endpoint:** `http://localhost:8080/transaction/{transactionId}`
    - **Method:** <span style="color:orange">**PUT**</span>.
    - **Description:** Updates details of a specific transaction by `transactionId`.
    - **Request Body:**
      ```json
      {
      "accountId": Long,
      "isDebit": Boolean,
      "amount": Double
      }
      ```
    - **Response:**
      ```json
      {
        "Transaction with id xxx has been updated."
      }
      ```

- **Delete Transaction**
    - **Endpoint:** `http://localhost:8080/transaction/{transactionId}`
    - **Method:** <span style="color:red">**DELETE**</span>.
    - **Description:** Deletes a specific transaction by `accountId`.
    - **Response:**
      ```json
      {
        "Transaction has been deleted"
      }
      ```

## Conclusion

This documentation provides a comprehensive guide to using the API for managing current accounts and transactions. By following the steps outlined, users can set up the application, interact with the endpoints, and manage customer accounts efficiently.
