import requests
import json

def fetch_data(url):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Failed to fetch data from {url}. Status code: {response.status_code}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from {url}: {e}")
        return None

def fetch_and_store_fpl_player_data(base_url, player_ids, output_file):
    all_data = []

    for player_id in player_ids:
        url = base_url.format(player_id=player_id)
        data = fetch_data(url)
        if data:
            all_data.append({
                "player_id": player_id,
                "data": data
            })
        print(f"Player {player_id} completed")

    with open(output_file, 'w') as file:
        json.dump(all_data, file, indent=4)
    
    print(f"Data for {len(player_ids)} players saved to {output_file} successfully.")

# Example usage
if __name__ == "__main__":
    base_url = "https://fantasy.premierleague.com/api/element-summary/{player_id}/"
    player_ids = range(1, 866)  # Player IDs from 1 to 865
    output_file = "fpl_player_data.json"

    fetch_and_store_fpl_player_data(base_url, player_ids, output_file)
