import streamlit as st
from datetime import date

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
    open(download_model_file, "w").write(f"From-Date: {from_date} | To-Date: {to_date}")
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
download_model_file = "example.txt"

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
        train_from_date = st.date_input("From-Date", value=date.today(), key="train_from_date")
        train_to_date = st.date_input("To-Date", value=date.today(), key="train_to_date")
        if st.button("Submit", key="submit_button_1"):
            st.write(f"From-Date: {train_from_date} | To-Date: {train_to_date}")
            make_model(train_from_date,train_to_date)
            download_model = st.download_button(
                label="Download Trained Model",
                data=open(download_model_file, "rb").read(),
                file_name=download_model_file,
                mime="text/plain"
            )

    with col2:
        st.title("Test Input")
        test_from_date = st.date_input("From-Date80p", value=date.today(), key="test_from_date")
        test_to_date = st.date_input("To-Date80p", value=date.today(), key="test_to_date")
        uploaded_file = st.file_uploader("Upload Model")
        model = get_results_from_model(uploaded_file,test_from_date,test_to_date)
        if st.button("Submit", key="submit_button_2"):
            st.write(model)

elif st.session_state.active_tab == "tab-2":
    st.title("Match Input")
    match_date = st.date_input("Match Date", value=date.today(), key="match_date")

    team1_col,team2_col = st.columns([1,1])
    with team1_col:
        team1 = st.selectbox("Team 1", list_of_teams, key="team1")
    with team2_col:
        team2 = st.selectbox("Team 2", list_of_teams, key="team2")
    if st.button("Submit", key="submit_button_3"):
        if team1 == team2:
            st.error("Team 1 and Team 2 cannot be the same")
        else:
            st.write(f"Match Date: {match_date}")
            st.write(f"Team 1: {team1}")
            st.write(f"Team 2: {team2}")