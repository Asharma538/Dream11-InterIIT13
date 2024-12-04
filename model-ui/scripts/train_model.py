import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import pickle
from scripts.models import Model

# print("Enter training start date in yyyy-mm-dd format.")
# training_start_date = input()#2002-12-29
# print("Enter training end date in yyyy-mm-dd format.")
# training_end_date = input()#2024-06-30

# print("Enter testing start date in yyyy-mm-dd format.")
# testing_start_date = input()#2024-07-01
# print("Enter testing end date in yyyy-mm-dd format.")
# testing_end_date = input()#2024-11-24

def normalize_data(merged_df,training_start_date,training_end_date):
    # making x and y
    y_train_col = merged_df.pop('y_train') 
    merged_df['y_train'] = y_train_col 

    merged_df['current_match_date'] = pd.to_datetime(merged_df['current_match_date'])

    train_data = merged_df[(merged_df['current_match_date'] <= training_end_date) & (merged_df['current_match_date'] >= training_start_date)]

    irrelevant_columns = ['player_name', 'current_match_date', 'player_id', 'Venue', 'y_train']
    X_train = train_data.drop(columns=irrelevant_columns)  # Exclude irrelevant columns and target
    y_train = train_data['y_train']  # Extract target variable

    # Normalize only relevant features
    scaler = MinMaxScaler()
    X_train_scaled = scaler.fit_transform(X_train)

    # Convert scaled data back to a DataFrame for easier debugging
    X_train_scaled = pd.DataFrame(X_train_scaled, columns=X_train.columns)
    return scaler,X_train_scaled,y_train

def train_model(merged_data_file,format,start_date,end_date):
    # read csv
    merged_df=pd.read_csv(merged_data_file)
    print("All columns are ---> ",merged_df.columns)
    scaler,X_train_scaled,y_train = normalize_data(merged_df,start_date,end_date)
    # test_data = merged_df[(merged_df['current_match_date'] <= testing_end_date) & (merged_df['current_match_date'] >= testing_start_date)]

    model = Model(X_train_scaled,y_train,format)

    # test_model(model,merged_df,scaler,test_file_path)
    with open(f'models/trained_by_user/model_{format}.pkl', 'wb') as file:
        pickle.dump(model, file)

    print(f"Model saved to ./model_{format}_{start_date}_{end_date}.pkl")


def train_all_models(start_date,end_date):
    train_model("data/merged_t20.csv","t20",start_date,end_date)
    train_model("data/merged_odi.csv","odi",start_date,end_date)
    train_model("data/merged_test.csv","test",start_date,end_date)

# Folder containing the CSV files
# test_file_path = input()
# test_file_path = "../rest/data_2024-07-03.csv"

# test_file = pd.read_csv(test_file_path)
# if(test_file["Format"].iloc[0]=="T20"):
#     train_model("../data/processed/merged_T20.csv",test_file_path)
# elif(test_file["Format"].iloc[0]=="ODI"):
#     train_model("../data/processed/merged_ODI.csv",test_file_path)
# elif(test_file["Format"].iloc[0]=="Test"):
#     train_model("../data/processed/merged_Test.csv",test_file_path)