import pandas as pd
import random

# Define the possible career options
careers = [
    "Software Developer", 
    "Data Scientist", 
    "Network Engineer", 
    "Project Manager", 
    "UI/UX Designer"
]

data = []

# Generate 1000 random student records
for _ in range(1000):
    # 1. Academic Score (CGPA 0-10)
    cgpa = round(random.uniform(6.0, 10.0), 1)
    
    # 2. Quiz Scores (0-10) - Represents the user's interest quiz
    logical_quotient = random.randint(1, 10)  # Logic/Math skill
    coding_skills = random.randint(1, 10)     # Programming interest
    public_speaking = random.randint(1, 10)   # Communication skill
    creativity = random.randint(1, 10)        # Design/Art skill
    
    # 3. Assign a Career based on rules (The "Logic")
    job_role = ""
    
    # If coding and logic are high -> Developer or Data Scientist
    if coding_skills > 7 and logical_quotient > 7:
        if random.choice([True, False]):
            job_role = "Software Developer"
        else:
            job_role = "Data Scientist"
            
    # If creativity is high -> Designer
    elif creativity > 7:
        job_role = "UI/UX Designer"
        
    # If public speaking is high but coding is low -> Manager
    elif public_speaking > 7 and coding_skills < 5:
        job_role = "Project Manager"
        
    # If logic is okay but coding is medium -> Network Engineer
    elif logical_quotient > 6 and coding_skills > 4:
        job_role = "Network Engineer"
        
    # Default fallback
    else:
        job_role = "Software Developer"

    # Add to our list
    data.append([cgpa, logical_quotient, coding_skills, public_speaking, creativity, job_role])

# Create a DataFrame (Table)
columns = ["CGPA", "Logical_Score", "Coding_Score", "Speaking_Score", "Creativity_Score", "Career_Role"]
df = pd.DataFrame(data, columns=columns)

# Save to CSV
df.to_csv("student_career_data.csv", index=False)
print("✅ Success! 'student_career_data.csv' has been created with 1000 records.")
print(df.head()) # Show first 5 rows