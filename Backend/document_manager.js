var pool = require('./database');
const { spawn } = require('child_process');

module.exports = {
    /*******************************************************************************************
    * Function Name: run_query
    *
    * Description: This function can be used to execute a query on the database.
    *
    * Parameters: 
    * query     string      Contains the entire query statement
    *
    * Returns:
    * result    object      Contains information from the resutling query, or false on failure
    ********************************************************************************************/
    run_query: async function(query)
    {
        try {
            var result = await pool.query(query);
        } catch(err) {
            console.error(err);
            return false;
        }

        return result;
    },

    /*******************************************************************************************
    * Function Name: insert_into
    *
    * Description: This function is used to insert a row into the databse
    *
    * Parameters: 
    * query     string      Contains the entire query statement
    *
    * Returns:
    * result    object      Returns the id of the row inserted, or false on failure
    ********************************************************************************************/
    insert_into: async function(query)
    {
        try {
            var result = await pool.query(query);
        } catch(err) {
            console.error(err);
            return false;
        }

        return result.insertId;
    },

    /*******************************************************************************************
    * Function Name: delete_document
    *
    * Description: This function is uesd to delete a document from the table `documents` and
    *              from the table `term_frequency`
    *
    * Parameters: 
    * id        int         The int of the document to delete from the database
    *
    * Returns:
    * true or false         True on success, false on fail
    ********************************************************************************************/
    delete_document: async function (id)
    {
        // Try to delete the document from the database
        try {
            var docResult = await pool.query("DELETE FROM `documents` WHERE `ID` = " + id);
        } catch(err) {
            console.error(err);
            return false;
        }

        // Deleting document from term_frequency
        // Try to delete the document from the database
        try {
            var termResult = await pool.query("DELETE FROM `term_frequency` WHERE `document_id` = " + id);
        } catch(err) {
            console.error(err);
            return false;
        }

        return true;
    },

    /*******************************************************************************************
    * Function Name: get_document_type
    *
    * Description: This is used to decide on the document type based on a score. The score is
    *              calculated by producing counting the occurences of the tesseract string
    *              against the keywords from the database table `doctypes`.
    *
    * Parameters: 
    * tesseract     string      The result of executing tesseract on an image
    *
    * Returns:
    * result        int         An integer of representing the document type, 22 is when the document is uknown or a failure occured
    ********************************************************************************************/
    get_document_type: async function (tesseract)
    {
        var scores = [];
        var score = [];

        tesseract = tesseract.toLowerCase();
        word = tesseract.split(' ');
        word = word.slice(0, 10);

        // Get the DocType descriptions
        var result = await this.run_query("SELECT * FROM `doctypes`"); 

        // In our database, 22 is an unknown document type
        if(result == false)
        {
            return 22;
        }

        for(var i = 0; i < result.length; i++)
        {
            var search = result[i].keyword.toLowerCase();
            scores.push(0);

            // Looping through words
            for(var x = 0; x < word.length; x++)
            {
                // Keeping score
                if(search.includes(word[x]))
                {
                    scores[i] += 1;
                }
            }
        }

        // Getting the best match
        var max = Math.max(...scores);

        // Couldn't find a document type
        if(max == 0)
        {
            return 22;
        }

        // Couldn't find document type, return unkown document
        return result[scores.indexOf(max)].ID;
    },

    /*******************************************************************************************
    * Function Name: calculate_word_frequency
    *
    * Description: Used to calculate the word frequency in a string.
    *
    * Parameters: 
    * textArray     string      An array of strings, from the user's input to the upload box
    *
    * Returns:
    * frequencies    arry      An array of floats, the frequency of the word divided by the number of words
    ********************************************************************************************/
    calculate_word_frequency: function (textArray)
    {
        var frequencies = [];

        for(var i = 0; i < textArray.length; i++)
        {
            var current = textArray[i];
            frequencies.push(0);

            for(var x = 0; x < textArray.length; x++)
            {
                if(current == textArray[x])
                {
                    frequencies[i] += 1;
                }
            }

            frequencies[i] = frequencies[i] / textArray.length;
        }

        return frequencies;
    },

    /*******************************************************************************************
    * Function Name: uploadDocuments
    *
    * Description: This function is used to upload a document to the server, this is for manual
    *              insertion.
    *
    * Parameters: 
    * userInput     string      The metadata that the user inputs on the upload box
    * tesseract     string      The result of using tesseract on an image
    * pdfName       string      The name of the pdf document after its stored on the server
    * pdfPath       string      The path of the pdf file on the server
    *
    * Returns:
    * -1 means that the user input is empty or doesn't exist. -2 means the document could not be inserted 
    *  to the database. 1 means everything was successful.
    ********************************************************************************************/
    uploadDocument: async function (userInput, tesseract, pdfName, pdfPath)
    {
        // If the user input is empty or doesn't exist, then return a error code
        if(userInput == "" || userInput == 'undefined')
        {
            return -1;
        }
        var temp = userInput.toLowerCase();

        // Extracting only the words in the user input
        var text = temp.match(/\S+/g);

        //var docType = await this.get_document_type(tesseract);

        // Insert document
        var docId = await this.insert_into("INSERT INTO `documents` (`PDF`, `metadata`, `PDF_Path`, `doc_category_id`) VALUES ('" + pdfName + "', '" + userInput + "', '" + pdfPath + "', " + tesseract + ")");

        if(docId == false)
        {
            return -2;
        }

        // Calculate term frequency
        var termFrequency = this.calculate_word_frequency(text);
        
        // Inserting term frequency
        for(var i = 0; i < termFrequency.length; i++)
        {
            var termId = await this.insert_into("INSERT INTO `term_frequency`(`word`, `term_frequency`, `document_id`) VALUES ('" + text[i] + "'," + termFrequency[i] + ", " + docId + ")");

            if(termId == false)
            {
                console.error("Cannot insert word: ", text[i]);
            }
        }
        
        return 1;
    },

    /*******************************************************************************************
    * Function Name: run_query
    *
    * Description: This searches the database documents by executing a python script that calculates
    *              tfidf. The query uses AND to limit the amount of documents that are returned.
    *
    * Parameters: 
    * search     string      Contains the users search
    *
    * Returns:
    * Prints out a nested json object.
    ********************************************************************************************/
    SEARCH_DOCUMENTS: function(search,res)
    {
        const ls = spawn('python', ['./search.py', search]);    
        ls.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
          data = JSON.parse(data);
          console.log(data);
          pdfDocuments = [];
          const path = require('path');
          data.map(data => {
              if (data.docType == 1){
                  data.docType = "Civil";
              }
              else data.docType = "Criminal";
              pdfDocuments.push({
                  "name":path.basename(data.pdfName, '.pdf'),
                  "type":data.docType
              });
          })
          res.send(pdfDocuments);
        }); 
        ls.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        }); 
        ls.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
    }
};