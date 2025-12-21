import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score
import pickle

# 1. Load the dataset
data = pd.read_csv("student_career_data.csv")

# 2. Split data into Inputs (X) and Output (y)
# X = The questions (CGPA, Scores)
# y = The answer (Career Role)
X = data[["CGPA", "Logical_Score", "Coding_Score", "Speaking_Score", "Creativity_Score"]]
y = data["Career_Role"]

# 3. Split into training and testing sets (80% to learn, 20% to test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Initialize and Train the Model
print("Training the model... 🤖")
model = DecisionTreeClassifier()
model.fit(X_train, y_train)

# 5. Test the accuracy
predictions = model.predict(X_test)
accuracy = accuracy_score(y_test, predictions)
print(f"✅ Model Trained! Accuracy: {accuracy * 100:.2f}%")

# 6. Save the trained model to a file
# We use 'pickle' to freeze the model so we can use it later in the website
with open("career_model.pkl", "wb") as file:
    pickle.dump(model, file)

print("💾 Model saved as 'career_model.pkl'. Ready for the website!")