
import streamlit as st
from datetime import date,datetime
from scripts.train_model import train_all_models
from scripts.test_model_file import test_on_a_input_file
from scripts.test_model_date import test_all_models_between_given_dates
import zipfile
import os
import io
import pandas as pd


def create_zip(files):
    buffer = io.BytesIO()
    with zipfile.ZipFile(buffer, "w") as zip_file:
        for file_name in files:
            with open(file_name, "rb") as f:
                zip_file.writestr(file_name.split("/")[2], f.read())
    buffer.seek(0)
    return buffer

def remove_files(files):
    for file in files:
        os.remove(file)
        
st.set_page_config(
    page_title="Model UI - Dream 11",
    page_icon=":soccer:",
    layout="wide",
    initial_sidebar_state=st.session_state.get(
        'sidebar_state',
        'expanded'
    )
)


if "active_tab" not in st.session_state:
    st.session_state.active_tab = "tab-1"

# FUNCTIONS
def switch_tab(tab_name):
    st.session_state.active_tab = tab_name

def make_model(from_date,to_date):
    print("dates: ",str(from_date),str(to_date))
    train_all_models(str(from_date),str(to_date))
    return

def get_results_from_model(model_file,from_date,to_date):
    return (f"{from_date} | {to_date}")

st.sidebar.title("Navigation")
if st.sidebar.button("Training/Testing Models", key="view_present_ui", use_container_width=True):
    switch_tab("tab-1")

if st.sidebar.button("Prediction for a match", key="view_other_ui", use_container_width=True):
    switch_tab("tab-2")

# CONSTANTS
list_of_teams = ['Australia', 'Bangladesh', 'Bermuda', 'Canada', 'England', 'Hong Kong', 'ICC World XI', 'India', 'Ireland', 'Jersey', 'Kenya', 'Namibia', 'Nepal', 'Netherlands', 'New Zealand', 'Oman', 'Pakistan', 'Papua New Guinea', 'Scotland', 'South Africa', 'Sri Lanka', 'Thailand', 'United Arab Emirates', 'United States of America', 'West Indies', 'Zimbabwe', 'Africa XI', 'Asia XI']
download_model_file = "models/model_odi.pkl"

# STYLES
st.markdown("""
    <style>
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
        h1{
            text-align: center;
        }
        .stButton{
            display: flex;
            justify-content: center;
        }
    </style>
""", unsafe_allow_html=True)


if st.session_state.active_tab == "tab-1":
    st.title("Model Testing")
    col1, col2 = st.columns([1, 1])

    with col1:
        st.title("Training Input")
        train_from_date = st.date_input("From-Date", min_value=datetime.strptime("2002-12-29", "%Y-%m-%d").date(), max_value=datetime.strptime("2024-01-01", "%Y-%m-%d").date(), value=datetime.strptime("2024-01-01", "%Y-%m-%d").date(), key="train_from_date")
        train_to_date = st.date_input("To-Date", min_value=datetime.strptime("2002-12-29", "%Y-%m-%d").date(), max_value=datetime.strptime("2024-06-30", "%Y-%m-%d").date(), key="train_to_date")
        if st.button("Submit", key="submit_button_1"):
            st.write(f"From-Date: {train_from_date} | To-Date: {train_to_date}")
            make_model(train_from_date,train_to_date)

            files_to_download = [f"models/trained_by_user/model_odi.pkl",
                                 f"models/trained_by_user/model_test.pkl",
                                 f"models/trained_by_user/model_t20.pkl",
                                 ]

            st.download_button(
                label="Download Trained Models",
                data=create_zip(files_to_download),
                file_name="trained_models.zip",
                mime="application/zip",
                # on_click=remove_files(files_to_download)
            )


    with col2:
        st.title("Test Input")
        test_from_date = st.date_input("From-Date80p", value=date.today(), key="test_from_date")
        test_to_date = st.date_input("To-Date80p", value=date.today(), key="test_to_date")
        # uploaded_file = st.file_uploader("Upload Model")
        # model = get_results_from_model(uploaded_file,test_from_date,test_to_date)
        st.write("Do you want to test on just train model? Use 1 for it. Otherwise use 0 to test on model trained by total data")
        cols = st.columns(7)
        with cols[3]:
            value = st.slider("Value", 0, 1, 1, label_visibility="collapsed")
            print(value)

        # Display the value in the larger column
        if st.button("Submit", key="submit_button_2"):
            # Print final metrics
            data = test_all_models_between_given_dates(value,str(test_from_date), str(test_to_date))
            df = pd.DataFrame(data)
            st.write(f"Below is the data for MAE, MAPE, and Average Correct Predictions From-Date: {test_from_date} | To-Date: {test_to_date} across formats:")
            st.dataframe(df)

elif st.session_state.active_tab == "tab-2":
    st.title("Match Input")
    ## take a csv file as input
    uploaded_file = st.file_uploader("Upload a CSV file", type=["csv"])
    # if uploaded_file is not None:
    #     test_on_a_input_file(uploaded_file)
    if uploaded_file is not None:
        with open(os.path.join("uploads", uploaded_file.name), "wb") as f:
            f.write(uploaded_file.getbuffer())
        # st.success("File saved successfully")
        print(str(os.path.join("uploads", uploaded_file.name)))
        test_on_a_input_file(str(os.path.join("uploads", uploaded_file.name)))
        st.download_button(
            label="Download Results",
            data=open("results/output.csv", "rb").read(),
            file_name="output.csv",
            mime="text/csv",
            on_click=remove_files(["results/output.csv"])
        )

    # match_date = s    t.date_input("Match Date", value=date.today(), key="match_date")

    # team1_col,team2_col = st.columns([1,1])
    # with team1_col:
    #     team1 = st.selectbox("Team 1", list_of_teams, key="team1")
    # with team2_col:
    #     team2 = st.selectbox("Team 2", list_of_teams, key="team2")
    # if st.button("Submit", key="submit_button_3"):
    #     if team1 == team2:
    #         st.error("Team 1 and Team 2 cannot be the same")
    #     else:
    #         st.write(f"Match Date: {match_date}")
    #         st.write(f"Team 1: {team1}")
    #         st.write(f"Team 2: {team2}")

