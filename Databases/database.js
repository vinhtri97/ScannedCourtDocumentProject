var mysql = require('mysql');
var pdfreader = require('pdfreader');
const { spawn } = require('child_process');

const database = "court_documents";
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
*
* Returns:
* result    object      Contains information from the resutling query, or an error message
********************************************************************************************/
function INSERT_INTO(query)
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
    if (err) throw err;
    return result;
  });

  con.end();
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
  var length = textArray.length;
    
  for(var i = 0; i < length; i++)
  {
    var word = textArray[i];
    var found = 0;

    // Skipping word we already calculated for
    if(a.indexOf(word) !== -1)
    {
      continue;
    }

    a.push(word);

    for(var x = 0; x < length; x++)
    {
      if(word === textArray[x])
      {
        found++;
      }
    }

    // Devide by the length of the array
    b.push(found / length);
  }

  return [a, b]
}

// Objective: read the pdf, with tesseract. Perform word frequency, INSERT into the table metadata (all words), insert into the table document
// Error checking: return false failed, return true successful
// Parameter: filename with extension
// Driver function
function READ_PDF_TESSERACT(file)
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

function UPDATE_TERM_FREQUENCY(data)
{
  var words = /\w+/g;

  // Looping through the database
  for(var i = 0; i < 1; i++)
  {
    var array = data[i]["metadata"].match(words);
    result = CALCULATE_WORD_FREQUENCY(array);

    for(var x = 0; x < result[0].length; x++)
    {
      INSERT_INTO("INSERT INTO `term_frequency` (`word`, `term_frequency`, `document_id`) VALUES ('" 
      + result[0][x] + "', " + result[1][x] + ", " + data[i]["ID"] + ")");
    }
  }

  console.log("done");
}

function GET_DCOUMENT_BY_ID(id)
{
  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: database
  });

  var query = "SELECT * FROM `documents` WHERE `ID` = " + id;

  con.connect(function(err) {
      if (err) throw err;
      con.query(query, function (err, result, fields) {
        if (err) throw err;
      
        UPDATE_TERM_FREQUENCY(result);
      });
  });
}

function EXECUTE_PYTHON(search)
{
  const ls = spawn('python', ['./SearchEngine/Documents-Search-Engine/python/search.py', search]);

  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
    console.log(JSON.parse(data))
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function uploadDocument(userInput)
{
  if(userInput === 'undefined')
  {
    console.log("Error: userinput is type of undefined.");
    return false;
  }

  // Extracting only the words in the user input
  var documentType = 0;
  var text = userInput.editorStateText.match(/\w+/g);
  text = text.join(" ");
  text = text.toLowerCase();

  // To determine document type, I need tesseract to be working, so send the file they upload to this function, cause i'll be doing tesseract here
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: database
  });

  // Switching between options
  con.connect();
  var query = 'INSERT INTO `documents` (`PDF`, `metadata`, `PDF_Path`, `DocTypeID`) VALUES ("'
  + userInput.filename + '", "' + text + '", "path", 0)';
  con.query(query, function (err, result) {
    if (err) throw err;

    GET_DCOUMENT_BY_ID(result.insertId);
  });
}

EXECUTE_PYTHON("court document");