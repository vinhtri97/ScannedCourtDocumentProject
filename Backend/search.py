#!/usr/bin/env python
import math
import os
import sys
import mysql.connector
import re

serverName = "localhost"
database = "court_documents"
directory = './SearchEngine/Documents-Search-Engine/data/RiderHaggard'
numberDocument = 0

def sort_by_score(a):
    return a[1]

def calculateIDF(listOccurences, dictionary, listFrequency, ids, pdfPath, docType, pdfName):
    position = 0
    listObjects = []
    scores = ''

    for document in ids:
        cumulative = 0
        for i in range(len(dictionary)):
            idf = math.log10(len(ids) / listOccurences[i])
            tfidf = listFrequency[position][i] * idf
            cumulative += tfidf

        # Checking if its the last iteration of the array
        if position == len(ids) - 1:
            scores += '{"id": ' + str(document) + ', "score": ' + str(cumulative) + ', "pdfPath":"' + pdfPath[position] + '", "docType":"' + str(docType[position]) + '", "pdfName":"' + str(pdfName[position]) + '"}'
            listObjects.append([document, cumulative, pdfPath[position]])
            continue
        scores += '{"id": ' + str(document) + ', "score": ' + str(cumulative) + ', "pdfPath":"' + pdfPath[position] + '", "docType":"' + str(docType[position]) + '", "pdfName":"' + str(pdfName[position]) + '"}, '
        listObjects.append([document, cumulative, pdfPath[position]])
        position += 1
        cumulative = 0
    
    #return sorted(listObjects, key=sort_by_score, reverse=True)
    return "[" + scores + "]"

def calculateWordOccurence(dictionary, sentences):
    wordOccurence = [0] * len(dictionary) 
    position = 0
    # Loop through the documents
    for sentence in sentences:
        for word in dictionary:
            # Convert sentence to array of words
            wordList = re.findall('\w+', sentence)
            occurences = wordList.count(word)
            
            # Adding Frequencies to a list, incrementing occurences
            wordOccurence[position] += occurences
            position += 1
        position = 0
        
    return wordOccurence
    
def getDocuments(search):
    mydb = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="",
            database = database
    )

    query = ''

    # Loop through the words the user provided
    count = 0
    search = re.findall('\w+', search[0])

    for word in search:
        if count == len(search) - 1:
            query += '`metadata` LIKE "%' + word + '%"'
            count += 1
            continue
        #query += ' AND `documents`.`metadata` LIKE "%' + word + '%"'
        query += '`metadata` LIKE "%' + word + '%" AND'
        count += 1
    
    mycursor = mydb.cursor()
    mycursor.execute("SELECT `term_frequency`.`id`, `document_id`, `word`, `term_frequency`, `documents`.`metadata`, `documents`.`PDF_Path`, `documents`.`doc_category_id`, `documents`.`PDF` FROM `term_frequency` LEFT JOIN `documents`ON `documents`.`ID` = `term_frequency`.`document_id` LEFT JOIN `document_category` ON `document_category`.`category_id` = `documents`.`doc_category_id` WHERE " + query)

    myresult = mycursor.fetchall()
    
    ids = []
    dictionary = []
    tf = []
    sentences = []
    pdfPath = []
    docType = []
    pdfName = []

    # Looping through the rows returned
    for row in myresult:
        ids.append(row[1])
        dictionary.append(row[2])
        tf.append({"id": row[1], "frequency": row[3], "word": row[2]})
        sentences.append(row[4])
        pdfPath.append(row[5])
        docType.append(row[6])
        pdfName.append(row[7])
    # Build correct formats
    dictionary = list(dict.fromkeys(dictionary))
    ids = list(dict.fromkeys(ids))
    sentences = list(dict.fromkeys(sentences))
    listFrequency = [[0.0] * len(dictionary) for _ in range(len(ids))] 

    for obj in tf:
        idIndex = ids.index(obj["id"])
        dictionaryIndex = dictionary.index(obj['word'])
        listFrequency[idIndex][dictionaryIndex] = obj['frequency']

    return [dictionary, ids, sentences, listFrequency, pdfPath, docType, pdfName]

def main(args):
    # Get documents by the search value
    
    result = getDocuments(args)
    wordOccurence = calculateWordOccurence(result[0], result[2])
    scores = calculateIDF(wordOccurence, result[0], result[3], result[1], result[4], result[5], result[6])
    print(scores)

if __name__ == '__main__':
    args = sys.argv[1:]
    result = main(args)