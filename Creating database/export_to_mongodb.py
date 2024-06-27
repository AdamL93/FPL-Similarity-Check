import requests
from pymongo import MongoClient
import os

# Replace with the actual FPL API endpoint
api_url = 'https://fantasy.premierleague.com/api/fixtures/'

# Make the API call
response = requests.get(api_url)

# Ensure the request was successful
if response.status_code == 200:
    # Parse the response to JSON
    json_data = response.json()


    # Construct the connection string
    connection_string = f'mongodb+srv://adamlynn93:MernPassword@fplcluster.etlpgjr.mongodb.net/?retryWrites=true&w=majority&appName=FPLCluster'
    
    # Debugging: Print the connection string (excluding the password for security)
    print(f"Connecting to MongoDB with connection string: mongodb+srv://adamlynn93:***@fplcluster.etlpgjr.mongodb.net/?retryWrites=true&w=majority&appName=FPLCluster")

    try:
        # Connect to MongoDB Atlas
        client = MongoClient(connection_string)
        db = client['fpl_database']  # Replace with your database name

        # Specify the new collection name
        new_collection_name = 'Fixtures'  # Replace with your desired collection name
        collection = db[new_collection_name]

        # Insert the JSON data into the new collection
        collection.insert_one(json_data)

        print(f"JSON data successfully inserted into the '{new_collection_name}' collection in MongoDB")
    except Exception as e:
        print(f"An error occurred: {e}")

else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
