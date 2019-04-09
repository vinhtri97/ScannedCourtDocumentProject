var mysql = require('mysql');
var pdfreader = require('pdfreader');
const database = "court_documents";

export class Database {
    
    /*******************************************************************************************
    * Function Name: SELECT_FROM
    * Description: This function querys a select statement and returns the result.
    *
    * Parameters: 
    * query     string      Contains the entire select statement that will be queried
    *
    * Returns:
    * result    object      Contains information from the resutling query, or an error message
    ********************************************************************************************/
    SELECT_FROM(query)
    {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: database
        });

          con.connect(function(err) {
            if (err) throw err;
            con.query(query, function (err, result, fields) {
              if (err) throw err;
              console.log(result);
            });
        });
    }

    /*******************************************************************************************
    * Function Name: INSERT_INTO
    * Description: This function querys a insert into statement and returns the result.
    *
    * Parameters: 
    * query     string      Contains the entire insert statement that will be queried
    *
    * Returns:
    * result    object      Contains information from the resutling query, or an error message
    ********************************************************************************************/
    INSERT_INTO(query)
    {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: database
        });

          con.connect(function(err) {
            if (err) throw err;
            con.query(query, function (err, result) {
              if (err) throw err;
              console.log(result);
            });
        });
    }

    /*******************************************************************************************
    * Function Name: DELETE
    * Description: This function querys a delete statement and returns the result.
    *
    * Parameters: 
    * query     string      Contains the entire delete statement that will be queried
    *
    * Returns:
    * result    object      Contains information from the resutling query, or an error message
    ********************************************************************************************/
    DELETE(query)
    {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: database
        });

          con.connect(function(err) {
            if (err) throw err;
            con.query(query, function (err, result) {
              if (err) throw err;
              console.log(result);
            });
        });
    }

    /*******************************************************************************************
    * Function Name: UPDATE
    * Description: This function querys a update statement and returns the result.
    *
    * Parameters: 
    * query     string      Contains the entire update statement that will be queried
    *
    * Returns:
    * result    object      Contains information from the resutling query, or an error message
    ********************************************************************************************/
    UPDATE(query)
    {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: database
        });

          con.connect(function(err) {
            if (err) throw err;
            con.query(query, function (err, result) {
              if (err) throw err;
              console.log(result);
            });
        });
    }

    CALCULATE_WORD_FREQUENCY()
    {

    }

    // Objective: read the pdf, with tesseract. Perform word frequency, INSERT into the table metadata (all words), insert into the table document
    // Error checking: return false failed, return true successful
    // Parameter: filename with extension
    // Driver functioN
    READ_PDF_TESSERACT(filename)
    {
        var test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
        var regex = "/\w+/g";

        console.log(filename);
    }

}

