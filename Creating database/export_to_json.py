import pymongo
import json

# MongoDB connection URI
mongo_uri = "mongodb+srv://adamlynn93:MernPassword@fplcluster.etlpgjr.mongodb.net/?retryWrites=true&w=majority&appName=FPLCluster"

# Initialize MongoDB client
client = pymongo.MongoClient(mongo_uri)

# Database and Collection names
db_name = "fpl_database"  # Replace with your database name
collection_name = "gameweek_data_personal"  # Replace with your collection name

# Connect to the database and collection
db = client[db_name]
collection = db[collection_name]

# Export collection data to JSON file
def export_collection_to_json():
    try:
        # Query the collection (example: fetching all documents)
        cursor = collection.find({})
        
        # Convert cursor to list of dictionaries (JSON serializable format)
        data = list(cursor)
        
        # Print number of documents fetched
        print(f"Number of documents fetched: {len(data)}")
        
        # Specify output file path
        output_file = "gameweek_data.json"
        
        # Write data to JSON file
        with open(output_file, "w") as f:
            json.dump(data, f, indent=4)
        
        print(f"Data exported successfully to {output_file}")
    
    except Exception as e:
        print(f"Error exporting data: {e}")
    
    finally:
        # Close MongoDB client connection
        client.close()

# Execute the export function
export_collection_to_json()
