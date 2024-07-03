import requests
import sys
import json

# Replace with the actual FPL API endpoint
api_url = 'https://fantasy.premierleague.com/api/bootstrap-static/'

# Make the API call
response = requests.get(api_url)

# Ensure the request was successful
if response.status_code == 200:
    # Parse the response to JSON
    json_data = response.json()

    # Convert the dictionary to a JSON string
    json_str = json.dumps(json_data)

    # Calculate the size in bytes
    size_in_bytes = sys.getsizeof(json_str)
    size_in_kb = size_in_bytes/1024
    size_in_mb = size_in_kb/1024

    print(f"Size of JSON object: {size_in_bytes} bytes")
    print(f"Size of JSON object: {size_in_kb} kilabytes")
    print(f"Size of JSON object: {size_in_mb} megabytes")

else:
    print(f"Failed to fetch data. Status code: {response.status_code}")