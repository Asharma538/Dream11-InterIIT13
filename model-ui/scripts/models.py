from xgboost import XGBRegressor
# from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.ensemble import RandomForestRegressor
from lightgbm import LGBMRegressor
from interpret.glassbox import ExplainableBoostingRegressor


# def XGBoost_model(X_train_scaled,y_train):
#     # Initialize the XGBoost model
#     model = XGBRegressor(n_estimators=10, random_state=42, n_jobs=-1)

#     # Train the model
#     model.fit(X_train_scaled, y_train)

#     return model

# def XGBoost_model(X_train_scaled,y_train):
#     # Initialize the Random Forest model
#     rf_model = RandomForestRegressor(n_estimators=120, random_state=42, n_jobs=-1)

#     # Train the model
#     rf_model.fit(X_train_scaled, y_train)

#     # Make predictions
#     y_train_pred = rf_model.predict(X_train_scaled)

#     return rf_model

# def XGBoost_model(X_train_scaled,y_train):

#     X_train_scaled.rename(columns={'Unnamed: 0': 'Unnamed'}, inplace=True)
#     # Initialize the Random Forest model
#     lg_model = XGBoost_model(n_estimators=8, random_state=42, n_jobs=-1)

#     # Train the model
#     lg_model.fit(X_train_scaled, y_train)

#     return lg_model

# def XGBoost_model(X_train_scaled,y_train):

#     # Initialize the Explainable Boosting Machine (EBM) model
#     rf_model = ExplainableBoostingRegressor(random_state=42)

#     # Train the EBM model
#     rf_model.fit(X_train_scaled, y_train)

#     return rf_model


def Model(X_train_scaled,y_train,match_format):
    X_train_scaled.rename(columns={'Unnamed: 0': 'Unnamed'}, inplace=True)
    if(match_format=="odi"):
        model = XGBRegressor(n_estimators=70, random_state=42, n_jobs=-1)
        model.fit(X_train_scaled,y_train)
        return model

    elif(match_format=="t20" or match_format=="test"):
        model = LGBMRegressor(n_estimators=12, random_state=42, n_jobs=-1)
        model.fit(X_train_scaled,y_train)
        return model