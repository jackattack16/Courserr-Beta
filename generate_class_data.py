import re
import random

FILE_PATH = "src/assets/ClassInstantiation.ts"

GRADE_DISTRIBUTION = [
    ('A+', 0.03), ('A', 0.08), ('A-', 0.07),
    ('B+', 0.12), ('B', 0.20), ('B-', 0.15),
    ('C+', 0.10), ('C', 0.12), ('C-', 0.06),
    ('D+', 0.03), ('D', 0.03), ('D-', 0.01),
    ('F', 0.02),
]

def generate_grades(num):
    letters = [g for g, _ in GRADE_DISTRIBUTION]
    weights = [w for _, w in GRADE_DISTRIBUTION]
    return random.choices(letters, weights=weights, k=num)

def generate_time(num):
    return [random.randint(1, 10) for _ in range(num)]

def generate_difficulty(num):
    return [random.randint(1, 5) for _ in range(num)]

def generate_ratings(num):
    return [round(random.uniform(1.0, 5.0), 1) for _ in range(num)]

def update_file():
    with open(FILE_PATH, 'r') as f:
        content = f.read()

    # Track if any changes were made
    made_changes = False

    def make_replacer(data_type):
        def replacer(match):
            nonlocal made_changes
            made_changes = True
            
            existing_str = match.group(2) if match.group(2) else ''
            prefix = match.group(1) if match.group(1) else ''
            
            # Extract existing data
            existing = []
            if existing_str and existing_str.strip() and not existing_str.strip() == '[]':
                try:
                    if data_type == 'ratings':
                        existing_matches = re.findall(r'[\d.]+', existing_str)
                        existing = [float(x) for x in existing_matches if '.' in x or float(x) >= 1.0]
                    elif data_type == 'time':
                        existing_matches = re.findall(r'\d+', existing_str)
                        existing = [int(x) for x in existing_matches if 0 < int(x) < 100]
                    elif data_type == 'grades':
                        grade_matches = re.findall(r'"([A-Z][+-]?|F)"', existing_str)
                        existing = grade_matches
                    elif data_type == 'difficulty':
                        existing_matches = re.findall(r'\d+', existing_str)
                        existing = [int(x) for x in existing_matches if 1 <= int(x) <= 5]
                except:
                    pass
            
            # Generate new data with random count per class (15-30)
            num_points = random.randint(15, 30)
            
            if data_type == 'ratings':
                new_data = generate_ratings(num_points)
                combined = existing + new_data
                return f'{prefix}[{", ".join(map(str, combined))}], // ratings'
            elif data_type == 'time':
                new_data = generate_time(num_points)
                combined = existing + new_data
                return f'{prefix}[{", ".join(map(str, combined))}], // averageTimePerWeek'
            elif data_type == 'grades':
                new_data = generate_grades(num_points)
                combined = existing + new_data
                return f'{prefix}[{", ".join(f"\"{g}\"" for g in combined)}], // grades'
            elif data_type == 'difficulty':
                new_data = generate_difficulty(num_points)
                combined = existing + new_data
                return f'{prefix}[{", ".join(map(str, combined))}], // classDifficulty'
        
        return replacer

    # content = re.sub(r'(\s*)\[([^\]]*)\]\s*,\s*//\s*ratings', make_replacer('ratings'), content)
    content = re.sub(r'(\s*)\[([^\]]*)\]\s*,\s*//\s*averageTimePerWeek', make_replacer('time'), content)
    content = re.sub(r'(\s*)\[([^\]]*)\]\s*,\s*//\s*grades', make_replacer('grades'), content)
    # content = re.sub(r'(\s*)\[([^\]]*)\]\s*,\s*//\s*classDifficulty', make_replacer('difficulty'), content)

    with open(FILE_PATH, 'w') as f:
        f.write(content)
    
    if made_changes:
        print(f"Added varying data points (15-30) to each class in {FILE_PATH}")
    else:
        print(f"No arrays found to update in {FILE_PATH}")

def clear_file():
    with open(FILE_PATH, 'r') as f:
        content = f.read()

    # Clear all data from arrays (set back to empty)
    content = re.sub(r'(\s*)\[[\d.,\s]+\]\s*,\s*//\s*ratings', r'\1[], // ratings', content)
    content = re.sub(r'(\s*)\[[\d,\s]+\]\s*,\s*//\s*averageTimePerWeek', r'\1[], // averageTimePerWeek', content)
    content = re.sub(r'(\s*)\["[^"]+"\s*(,\s*"[^"]+")*\s*\]\s*,\s*//\s*grades', r'\1[], // grades', content)
    content = re.sub(r'(\s*)\[[\d,\s]+\]\s*,\s*//\s*classDifficulty', r'\1[], // classDifficulty', content)

    with open(FILE_PATH, 'w') as f:
        f.write(content)
    
    print(f"Cleared all data from {FILE_PATH}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        if sys.argv[1] == 'generate':
            update_file()
        elif sys.argv[1] == 'clear':
            clear_file()
        else:
            print("Usage: python generate_class_data.py [generate|clear]")
    else:
        print("Usage: python generate_class_data.py [generate|clear]")
