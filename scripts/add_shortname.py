import re
import os

def generate_short_name(class_name):
    """Generate a short name by removing superfluous suffixes and patterns."""
    short = class_name
    
    # Remove asterisks
    short = short.replace('*', '')
    
    # Remove "– Dual Credit Course(s)" suffixes (en dash or hyphen)
    short = re.sub(r'\s*[-–]\s*Dual Credit Courses?', '', short)
    
    # Remove "– Graduation Requirement"
    short = re.sub(r'\s*[-–]\s*Graduation Requirement', '', short)
    
    # Remove parenthetical course codes like (MAT 157), (ENG 105 & 106), (HUM 121), (LIT 151), etc.
    short = re.sub(r'\s*\([^)]*\d{3}[^)]*\)', '', short)
    
    # Remove "Offered XX-XX" patterns
    short = re.sub(r'\s*\(Offered\s*\d+-\d+\)', '', short)
    
    # Remove parenthetical grade indicators like (9), (10-12)
    short = re.sub(r'\s*\(\d+(-\d+)?\)', '', short)
    
    # Remove semester indicators like (Fall), (Spring), (Both)
    short = re.sub(r'\s*\((?:Fall|Spring|Both)\)', '', short)
    
    # Remove "(writing)", "(literature)", etc.
    short = re.sub(r'\s*\((?:writing|literature)\)', '', short)
    short = re.sub(r'\s*\((?:writing\s*&\s*literature)\)', '', short)
    
    # Simplify "2-D" to "2D" in parentheticals like (2-D Art) -> 2D Art
    short = re.sub(r'\(2-D\s*(\w+)\)', r'2D \1', short)
    short = re.sub(r'\(3-D\s*(\w+)\)', r'3D \1', short)
    short = re.sub(r'\(4-D\s*(\w+)\)', r'4D \1', short)
    
    # Clean up any double spaces
    short = re.sub(r'\s+', ' ', short)
    
    # Strip leading/trailing whitespace
    short = short.strip()
    
    # Common manual overrides for classes that need special handling
    manual_overrides = {
        "Introduction to Agriscience": "Intro to Agriscience",
        "Agriculture, Food, & Natural Resources": "Ag Food & Natural Resources",
        "Food Science & Safety": "Food Science & Safety",
        "Agricultural Power and Technology": "Ag Power & Technology",
        "Agricultural Business Foundation": "Ag Business Foundation",
        "Advanced Animal Science": "Advanced Animal Science",
        "Advanced Plant Science": "Advanced Plant Science",
        "Ag Research & Development Capstone": "Ag Research & Dev Capstone",
        "Computer-aided Manufacturing": "Computer-aided Manufacturing",
        "introduction to Carpentry": "Intro to Carpentry",
        "introductionToManufacturing": "Intro to Manufacturing",
        "engineeringCADDDrafting": "Engineering CADD Drafting",
        "architecturalCADDDrafting": "Architectural CADD Drafting",
        "manufacturingAndWelding": "Manufacturing & Welding",
        "advancedManufacturingAndWelding": "Adv Manufacturing & Welding",
        "woodworking1": "Woodworking 1",
        "woodworking2": "Woodworking 2",
        "carpentry1": "Carpentry 1",
        "carpentry2": "Carpentry 2",
        "contractWoodworking": "Contract Woodworking",
        "itecContractAdvancedTechnology": "ITEC Contract Advanced Tech",
        "internshipProgram1": "Internship Program 1",
        "internshipProgram2": "Internship Program 2",
        "Foundations of 2-Dimensional Art (2-D Art)": "Foundations of 2D Art",
        "Foundations of 3-Dimensional (3-D) Art": "Foundations of 3D Art",
        "Foundations of 4-Dimensional Art (4D Art) & Animation": "Foundations of 4D Art & Animation",
        "Advanced 4D Art & Animation: Levels 2-8": "Advanced 4D Art & Animation",
        "Advanced Drawing, Painting, Printmaking – Levels 2-7": "Adv Drawing, Painting, Printmaking",
        "Advanced Graphic Design: Levels 2-7": "Advanced Graphic Design",
        "Advanced Ceramics: Levels 2-7": "Advanced Ceramics",
        "Advanced Jewelry: Levels 2-7": "Advanced Jewelry",
        "Advanced Photography: Levels 2-8": "Advanced Photography",
        "Advanced 3-D Art: Levels 2-8": "Advanced 3D Art",
        "Ceramics I": "Ceramics 1",
        "Jewelry I": "Jewelry 1",
        "Photography I": "Photography 1",
        "English 9 Workshop (writing)": "English 9 Workshop",
        "English 9 Literature (literature)": "English 9 Literature",
        "Basic Composition (writing)": "Basic Composition",
        "Creative Writing (writing)": "Creative Writing",
        "Mythology, Fantasy, Folklore (literature)": "Mythology, Fantasy, Folklore",
        "Survey of Literature (10th) (literature)": "Survey of Literature 10",
        "American Literature (writing & literature)": "American Literature",
        "Speech (writing)": "Speech",
        "Multimedia Composition (writing)": "Multimedia Composition",
        "Introduction to Journalism (writing)": "Intro to Journalism",
        "Activism & Social Justice Lit. (literature)": "Activism & Social Justice",
        "Horror Literature (literature)": "Horror Literature",
        "Science-Fiction Literature (literature)": "Science Fiction Literature",
        "Shakespeare (literature)": "Shakespeare",
        "Survey of Literature (12th) (Literature)": "Survey of Literature 12",
        "Adv. Journalism (AHS Newspaper – The Web)": "Adv Journalism",
        "SPIRIT (AHS Yearbook)": "SPIRIT Yearbook",
        "Algebra 1AB": "Algebra 1AB",
        "Algebra 1*": "Algebra 1",
        "Geometry AB": "Geometry AB",
        "Advanced Algebra 2": "Adv Algebra 2",
        "Computer Science": "Computer Science",
        "Statistics (MAT 157)": "Statistics",
        "Pre-Calculus (MAT 129)": "Pre-Calculus",
        "AP Calculus (AB) (MAT 211)": "AP Calculus AB",
        "Freshman Band (9)": "Freshman Band",
        "Concert Band (Fall)": "Concert Band Fall",
        "Concert Band (Spring)": "Concert Band Spring",
        "Wind Symphony / Symphonic Band*": "Wind Symphony",
        "Twirler (10-12)": "Twirler",
        "Freshman Orchestra (9)": "Freshman Orchestra",
        "Symphony Orchestra (10-12)": "Symphony Orchestra",
        "Chamber Orchestra* (10-12)": "Chamber Orchestra",
        "Lifeguarding/WSI*": "Lifeguarding/WSI",
        "Innovation Fitness: Individual Performance PE": "Innovation Fitness",
        "Earth And Space Science": "Earth & Space Science",
        "Physical Science": "Physical Science",
        "AP Biology*": "AP Biology",
        "AP Physics*": "AP Physics",
        "AP Chemistry*": "AP Chemistry",
        "Honors World Studies": "Honors World Studies",
        "AP US History": "AP US History",
        "US History": "US History",
        "US Government": "US Government",
        "AP US Government": "AP US Government",
        "World Studies": "World Studies",
        "Western Civilization I": "Western Civ 1",
        "Western Civilization II": "Western Civ 2",
    }
    
    # Check if we have a manual override
    if class_name in manual_overrides:
        return manual_overrides[class_name]
    
    return short


def process_file(input_file, output_file):
    """Process the TypeScript file and add shortName to each class."""
    
    with open(input_file, 'r') as f:
        content = f.read()
    
    # Split by new Class( to process each class
    parts = content.split('new Class(')
    
    result = [parts[0]]  # Keep the import statement
    
    for i, part in enumerate(parts[1:], 1):
        # Find the className - it's typically around the 13th parameter
        # Look for pattern: "className", // className
        
        class_name_match = re.search(r'"([^"]+)"\s*,\s*//\s*className', part)
        
        if class_name_match:
            class_name = class_name_match.group(1)
            short_name = generate_short_name(class_name)
            
            # Find the closing ); of this class instantiation
            # Look for pattern:     [] // tags
            #                       );
            # We want to replace the tags line
            
            # Split into lines and process
            lines = part.split('\n')
            
            # Find the line with [] // tags
            new_lines = []
            for j, line in enumerate(lines):
                # Check if this is the tags line (ends with [] // tags)
                stripped = line.strip()
                if stripped == '[] // tags':
                    # Replace with tags + shortName
                    new_lines.append('    [] // tags')
                    new_lines.append(f'    "{short_name}" // shortName')
                else:
                    new_lines.append(line)
            
            part = '\n'.join(new_lines)
        
        result.append('new Class(' + part)
    
    final_content = ''.join(result)
    
    with open(output_file, 'w') as f:
        f.write(final_content)
    
    # Count shortNames added
    count = final_content.count('// shortName')
    print(f"Processed file written to {output_file}")
    print(f"Added shortName to {count} classes")


if __name__ == "__main__":
    input_file = "src/assets/ClassInstantiation.ts"
    output_file = "src/assets/ClassInstantiation.ts"
    process_file(input_file, output_file)
