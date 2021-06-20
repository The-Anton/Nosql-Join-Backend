This is a basic application of Backend Server using NodeJS and Express connected with MongoDB to perform left join on two different collection and rendering the result into tabular form. 

:point_right: https://shekharincubate.herokuapp.com

## API Endpoints

    
    /api/mock1data      // returns 1st collection documents.
    /api/mock2data      // returns 2nd collection documents.
    /api/join           // returns JOIN of 1st and 2nd Collection.


    

## Steps to set-up
1. Clone the Repository .
2. In your local system, open terminal at that location and run ``` npm i ```.
3. Add .env file inside the folder along with other files using below structure.
    ```
    PORT=5000
    MONGO_URI=<Your MongoDB URI>
    ```

4. Run ``` npm start ```


