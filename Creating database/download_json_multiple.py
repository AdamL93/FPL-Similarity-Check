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

def fetch_and_store_fpl_data(base_url, team_ids, game_weeks, output_file):
    all_data = []

    for team_id in team_ids:
        for gw in game_weeks:
            url = base_url.format(team_id=team_id, gw=gw)
            data = fetch_data(url)
            if data:
                all_data.append({
                    "team_id": team_id,
                    "game_week": gw,
                    "data": data
                })
        print(f"{team_id} complete")

    with open(output_file, 'w') as file:
        json.dump(all_data, file, indent=4)
    
    print(f"Data for {len(team_ids)} teams and {len(game_weeks)} game weeks saved to {output_file} successfully.")

# Example usage
if __name__ == "__main__":
    base_url = "https://fantasy.premierleague.com/api/entry/{team_id}/event/{gw}/picks/"
    team_ids = [202710, 2732659, 259365, 5021421, 3425112, 1634013,90004,6218658, 86266,2402629, 5158690, 3355074, 2991379, 79617, 597731,
                95983, 5325894, 3058025, 3614365] #personal league team ids 
    
    """team_ids = [7632,14076,4237,6312,275269,3322,4845,908,602,16256,
                                 1596,11349,12,4746,256075,6770,23891,8366,4305040,18675
                                 ,12315,2514,329799,7726,9906,8258,36965,51396,393272,
                                 4650,387,358,4393,5986,946,1974,14165,17482,1072,3717,
                                 1672,2134,12090,2361,4664,8302,7665,5090] """ #content creator team id's
    game_weeks = list(range(1, 39))  # Game weeks from 1 to 38
    output_file = "Player_details.json"

    fetch_and_store_fpl_data(base_url, team_ids, game_weeks, output_file)