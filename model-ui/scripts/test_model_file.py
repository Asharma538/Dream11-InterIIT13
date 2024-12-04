import os
import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import MinMaxScaler

def normalize_data(merged_df):
    # making x and y
    y_train_col = merged_df.pop('y_train') 
    merged_df['y_train'] = y_train_col 

    merged_df['current_match_date'] = pd.to_datetime(merged_df['current_match_date'])

    train_data = merged_df[(merged_df['current_match_date'] <= "2024-06-30") & (merged_df['current_match_date'] >= "2002-12-29")]

    irrelevant_columns = ['player_name', 'current_match_date', 'player_id', 'Venue', 'y_train']
    X_train = train_data.drop(columns=irrelevant_columns)  # Exclude irrelevant columns and target
    y_train = train_data['y_train']  # Extract target variable

    # Normalize only relevant features
    scaler = MinMaxScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # Convert scaled data back to a DataFrame for easier debugging
    X_train_scaled = pd.DataFrame(X_train_scaled, columns=X_train.columns)
    return scaler

def test_model(merged_df_path, test_file,model):
    # Initialize lists to store rows for the output CSVs
    merged_df = pd.read_csv(merged_df_path)

    scaler = normalize_data(merged_df)

    output_rows = []

    # Counter to calculate correctly predicted players
    total_correct_predictions = 0

    # Paths to the output CSV files
    output_csv_path = 'results/output.csv'

    # Dictionaries to store actual and predicted points
    actual_points_dict = {}
    predicted_points_dict = {}
    contributions_dict = {}

    # Extract the necessary columns (assuming these columns exist in the CSV)
    for _, row in test_file.iterrows():
        player_name = row['Player Name']
        match_date = row['Match Date']
        # Find the corresponding row in merged_df based on player name and match date
        player_data = merged_df[
            (merged_df['player_name'] == player_name) &
            (merged_df['current_match_date'] == match_date)
        ]

        irrelevant_columns = ['player_name', 'current_match_date', 'player_id', 'Venue', 'y_train']
        player_test = player_data.drop(columns=irrelevant_columns)  # Exclude irrelevant columns and target
        print("player_test is ---> ",player_test)
        player_test_scaled = scaler.transform(player_test)  # Normalize the features
        player_test_scaled_df = pd.DataFrame(player_test_scaled, columns=player_test.columns)

        # Predict the points for the player
        predicted_points = model.predict(player_test_scaled_df)

        # Get SHAP values (feature contributions)

        # Get the actual points from the merged_df
        actual_points = player_data['y_train']
        actual_points_value = actual_points.iloc[0]

        # Store the actual and predicted points in the dictionaries
        actual_points_dict[player_name] = actual_points_value
        predicted_points_dict[player_name] = predicted_points[0]


    # Sort both dictionaries based on points in descending order
    sorted_actual_points_dict = dict(sorted(actual_points_dict.items(), key=lambda item: item[1], reverse=True))
    sorted_predicted_points_dict = dict(sorted(predicted_points_dict.items(), key=lambda item: item[1], reverse=True))

    # Top 11 predicted players
    predicted_players = list(sorted_predicted_points_dict.keys())[:11]
    predicted_players_points = [sorted_actual_points_dict[player] for player in predicted_players]
    predicted_players_points[0]*=2
    predicted_players_points[1]*=1.5
    # Top 11 dream team players (based on actual points)
    dream_team_players = list(sorted_actual_points_dict.keys())[:11]
    dream_team_players_points = [sorted_actual_points_dict[player] for player in dream_team_players]
    dream_team_players_points[0]*=2
    dream_team_players_points[1]*=1.5
    # Count correctly predicted players
    correct_predictions = len(set(predicted_players) & set(dream_team_players))
    total_correct_predictions += correct_predictions

    # Calculate total points for predicted players and dream team
    total_points_predicted = sum(predicted_players_points)
    total_dream_team_points = sum(dream_team_players_points)

    # Create a row for the CSV output
    row = {'Match Date': test_file["Match Date"].iloc[0]}  # Extract file name without extension

    # Add predicted player points and actual points to the row
    for i in range(1, 12):
        row[f'Predicted Player {i}'] = predicted_players[i-1]
        row[f'Predicted Player {i} Points'] = sorted_actual_points_dict.get(predicted_players[i-1], 0)

    # Add dream team player points and actual points to the row
    for i in range(1, 12):
        row[f'Dream Team Player {i}'] = dream_team_players[i-1]
        row[f'Dream Team Player {i} Points'] = dream_team_players_points[i-1]

    # Add total points and MAE to the row
    row['Total Points Predicted'] = total_points_predicted
    row['Total Dream Team Points'] = total_dream_team_points
    row['Total Points MAE'] = abs(total_dream_team_points - total_points_predicted)

    # Append the updated row to the output list
    output_rows.append(row)

    # Convert the output list of rows into a DataFrame for main output
    output_df = pd.DataFrame(output_rows)

    # Check if the output CSV already exists and append without writing the header
    if os.path.exists(output_csv_path):
        output_df.to_csv(output_csv_path, mode='a', header=False, index=False)
    else:
        output_df.to_csv(output_csv_path, index=False)

    # Convert the top features list into a DataFrame for top features output

    print(f"Number of Correctly Predicted Players: {total_correct_predictions}")



def test_on_a_input_file(test_file_path):
    test_file = pd.read_csv(test_file_path)
    if((test_file["Format"].iloc[0]).lower()=="t20"):
        with open('models/model_t20.pkl', 'rb') as file:
            model = pickle.load(file)
        test_model("data/merged_t20.csv",test_file,model)
    elif((test_file["Format"].iloc[0]).lower()=="odi"):
        with open('models/model_odi.pkl', 'rb') as file:
            model = pickle.load(file)
        test_model("data/merged_odi.csv",test_file,model)
    elif((test_file["Format"].iloc[0]).lower()=="test"):
        with open('models/model_test.pkl', 'rb') as file:
            model = pickle.load(file)
        test_model("data/merged_test.csv",test_file,model)
