# **E Shopping Portal**

E-Shopping Portal or E-Commerce, also known as electronic commerce or internet commerce, refers to the buying and selling of goods or services using the internet, and the transfer of money and data to execute these transactions. The aim of our project is to provide the advantages of online shopping to customers of a real shop. It helps buying the products in the shop anywhere through the internet. Thus, the customer will get the service of online shopping and home delivery from his favourite shop. This system can be implemented to any shop in the locality or to multinational branded shops having retail outlet chains.

## **Authors**

- [@memukherjee](https://www.github.com/memukherjee)
- [@AnuragGh01](https://github.com/AnuragGh01)
- [@AishwaryaGhosh67](https://github.com/AishwaryaGhosh67)
- [@MiliBiswas02](https://github.com/MiliBiswas02)

## **How to run the project**

### Cloning the repository

```bash
    git clone https://github.com/memukherjee/e-commerce-app.git
    cd e-commerce-app
```

### Setting up the backend

1. #### Downloading dependencies
    ```bash
    cd backend
    ```
    > To run this project, you need to have java & maven installed in your system. If you don't have java installed, you can download it from given links below
    > - [Java](https://www.oracle.com/in/java/technologies/downloads/).
    > - [Maven](https://maven.apache.org/download.cgi).
2. #### Setting up the mongodb database
    > Download and install mongodb from [here](https://www.mongodb.com/try/download/community) or you can use mongodb atlas to create a cloud database.
    
3. #### Setting up the environment variables
    > Create a file named `env.properties` in the `backend` directory and add the following variables to it.
    > - `MONGODB_URI` = Database URI
    > - `MONGODB_DB` = Database name
    > - Uncomment the `spring.config.import=file:env.properties` line in `backend/src/main/resources/application.properties` file.

4. #### Running the project
    ```bash
    mvn spring-boot:run
    ```
    > The backend server will start running on port 8080.

### Setting up the frontend

1. #### Downloading dependencies
    ```bash
    cd frontend
    ```
    > To run this project, you need to have nodejs installed in your system. If you don't have nodejs installed, you can download it from [here](https://nodejs.org/en/download/).
2. #### Setting up the environment variables
   
    > Create a file named `.env` in the `frontend` directory and add the following variables to it.
    > - `REACT_APP_API` = http://localhost:8080/api
    > - `REACT_APP_RAZORPAY_KEY` = Razorpay key
    > - `REACT_APP_GEOAPIFY_API_KEY` = Geoapify api key

3. #### Running the project
    ```bash
    npm install # Only for the first time. If facing any issues, run the command with --force flag.
    npm start   # To run the project
    ```

    > The frontend server will start running on port 3000.