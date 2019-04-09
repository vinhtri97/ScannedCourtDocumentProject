var mysql = require('mysql');
var pdfreader = require('pdfreader');
const { spawn } = require('child_process');

const database = "projects4";
const dir = "C:/Users/Courtland/Desktop/ScannedCourtDocumentProject/Backend/UploadedFiles";
var documentID = 0;

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
function SELECT_FROM(query)
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
* option    int         1 = into words, 2 = into documents, something other integer = whatever table you specified
*
* Returns:
* result    object      Contains information from the resutling query, or an error message
********************************************************************************************/
function INSERT_INTO(query, option)
{
  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: database
  });
  
  // Switching between options
  con.connect();

  con.query(query, function (err, result) {
    if (err) return false;

    else if(option == 2)
    {
      documentID = result.insertId;
    }

    else if(option == 1)
    {
      INSERT_INTO("INSERT INTO `dockeywords`(`DocumentsID`, `KeywordID`) VALUES (" + documentID + "," + result.insertId + ")", 0);
    }
    return result;
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
function DELETE(query)
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
function UPDATE(query)
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

function CALCULATE_WORD_FREQUENCY(textArray)
{
  var a = [], b = [], prev;
    
  textArray.sort();
    for ( var i = 0; i < textArray.length; i++ ) {
        if ( textArray[i] !== prev ) {
            a.push(textArray[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = textArray[i];
    }
    
    return [a, b];
}

// Objective: read the pdf, with tesseract. Perform word frequency, INSERT into the table metadata (all words), insert into the table document
// Error checking: return false failed, return true successful
// Parameter: filename with extension
// Driver function
function READ_PDF_TESSERACT(filename)
{
  documentID = 0;
  var test = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  //var test = "hey hey hey";
  var regex = /\w+/g;

  if(filename === undefined || filename == "")
  {
    console.log("Error! File name is not defined or the string is empty.");
    return false;
  }

  INSERT_INTO("INSERT INTO `documents`(`PDF`, `metadata`, `PDF_Path`, `DocTypeID`) VALUES ('" + filename + "','" + test + "','" + (dir + "/" + filename) + "',1)", 2);
  
  // Getting an array of all the words
  var textArray = test.match(regex);

  return true;
}

function EXECUTE_PYTHON(search)
{
  const ls = spawn('python', ['./SearchEngine/Documents-Search-Engine/python/search.py', search]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    //console.log(JSON.parse(data))
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

EXECUTE_PYTHON("Lorem");