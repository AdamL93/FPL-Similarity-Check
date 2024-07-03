import requests
import json

def fetch_data_and_save(url, output_file):
    try:
        # Send GET request to the API endpoint
        response = requests.get(url)
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse JSON data from the response
            data = response.json()
            
            # Save JSON data to a file
            with open(output_file, 'w') as file:
                json.dump(data, file, indent=4)
                
            print(f"Data saved to {output_file} successfully.")
        else:
            print(f"Failed to fetch data. Status code: {response.status_code}")
    
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")

# Example usage:
if __name__ == "__main__":

    api_url = "https://fantasy.premierleague.com/api/leagues-classic/111030/standings/"  # Replace with your API endpoint
    output_file = "Classic_league_data.json"
    
    fetch_data_and_save(api_url, output_file)