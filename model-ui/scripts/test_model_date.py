import os
import pandas as pd
import numpy as np
import pickle
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import MinMaxScaler
import warnings
warnings.filterwarnings("ignore")


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

def test_model_from_dataframe(merged_df, model, testing_start_date, testing_end_date):
    scaler = normalize_data(merged_df)

    # Initialize variables for metrics
    total_correct_predictions = 0
    total_matches = 0
    total_absolute_error = 0
    total_percentage_error = 0
    total_actual_points = 0

    merged_df = merged_df[(merged_df['current_match_date'] <= testing_end_date) & (merged_df['current_match_date'] >= testing_start_date)]

    # Group merged_df by 'Venue' and 'current_match_date'
    grouped = merged_df.groupby(['Venue', 'current_match_date'])

    for (venue, match_date), group_df in grouped:
        # Dictionaries to store actual and predicted points
        actual_points_dict = {}
        predicted_points_dict = {}

        for _, row in group_df.iterrows():
            player_name = row['player_name']

            # Prepare player data for prediction
            irrelevant_columns = ['player_name', 'current_match_date', 'player_id', 'Venue', 'y_train']
            player_test = row.drop(irrelevant_columns)
            player_test_scaled = scaler.transform([player_test])  # Normalize the features
            player_test_scaled_df = pd.DataFrame(player_test_scaled, columns=player_test.index)

            # Predict the points for the player
            predicted_points = model.predict(player_test_scaled_df)
            actual_points = row['y_train']

            # Store actual and predicted points
            actual_points_dict[player_name] = actual_points
            predicted_points_dict[player_name] = predicted_points[0]

        total_matches += 1

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

        # Update metrics
        total_absolute_error += abs(total_dream_team_points - total_points_predicted)
        if total_dream_team_points > 0:
            total_percentage_error += abs(total_dream_team_points - total_points_predicted) / total_dream_team_points
        total_actual_points += total_dream_team_points

    # Calculate metrics
    mae = total_absolute_error / total_matches if total_matches else 0
    mape = (total_percentage_error / total_matches) * 100 if total_matches else 0
    average_correct_predictions = total_correct_predictions / total_matches if total_matches else 0

    return mae, mape, average_correct_predictions

def test_all_models_between_given_dates(value,start_date, end_date):
    if(value==0):

        # Test the function for each format
        with open('models/model_t20.pkl', 'rb') as file:
            model = pickle.load(file)
        mae_t20, mape_t20, correct_predictions_t20 = test_model_from_dataframe(pd.read_csv("data/merged_t20.csv"), model, start_date, end_date)
        

        with open('models/model_odi.pkl', 'rb') as file:
            model = pickle.load(file)
        mae_odi, mape_odi, correct_predictions_odi = test_model_from_dataframe(pd.read_csv("data/merged_odi.csv"), model, start_date, end_date)


        with open('models/model_test.pkl', 'rb') as file:
            model = pickle.load(file)
        mae_test, mape_test, correct_predictions_test = test_model_from_dataframe(pd.read_csv("data/merged_test.csv"), model, start_date, end_date)

            # Aggregate metrics across all datasets
        data = {
        "Format": ["T20", "ODI", "Test"],
        "MAE": [mae_t20,mae_odi,mae_test],
        "MAPE": [mape_t20,mape_odi,mape_test],
        "Average Correct Predictions": [correct_predictions_t20,correct_predictions_odi,correct_predictions_test],
        }
    else:
        # Test the function for each format
        with open('models/trained_by_user/model_t20.pkl', 'rb') as file:
            model = pickle.load(file)
        mae_t20, mape_t20, correct_predictions_t20 = test_model_from_dataframe(pd.read_csv("data/merged_t20.csv"), model, start_date, end_date)
        

        with open('models/trained_by_user/model_odi.pkl', 'rb') as file:
            model = pickle.load(file)
        mae_odi, mape_odi, correct_predictions_odi = test_model_from_dataframe(pd.read_csv("data/merged_odi.csv"), model, start_date, end_date)


        with open('models/trained_by_user/model_test.pkl', 'rb') as file:
            model = pickle.load(file)
        mae_test, mape_test, correct_predictions_test = test_model_from_dataframe(pd.read_csv("data/merged_test.csv"), model, start_date, end_date)

        # Aggregate metrics across all datasets
        data = {
        "Format": ["T20", "ODI", "Test"],
        "MAE": [mae_t20,mae_odi,mae_test],
        "MAPE": [mape_t20,mape_odi,mape_test],
        "Average Correct Predictions": [correct_predictions_t20,correct_predictions_odi,correct_predictions_test],
        }

    return data