import re

def fix_file(input_file, output_file):
    """Fix the broken ClassInstantiation.ts file."""
    
    with open(input_file, 'r') as f:
        content = f.read()
    
    # Fix 1: Find pattern of [] // tags followed by shortName without comma
    # Pattern:     [] // tags
    #               "shortName" // shortName
    # Should be:   [] // tags,
    #               "shortName" // shortName
    
    # Split by new Class( to process each class
    parts = content.split('new Class(')
    
    result = [parts[0]]  # Keep the import statement
    
    for i, part in enumerate(parts[1:], 1):
        lines = part.split('\n')
        new_lines = []
        
        for j, line in enumerate(lines):
            stripped = line.strip()
            
            # Fix missing comma after [] // tags when followed by shortName
            if stripped == '[] // tags':
                new_lines.append('    [] // tags,')
            else:
                new_lines.append(line)
        
        part = '\n'.join(new_lines)
        
        # Remove duplicate shortName lines (when there's ", "shortName" // shortName" on one line after "shortName" // shortName)
        # This is complex, let's just do a simple cleanup
        part = re.sub(r'// shortName\n,\s*"[^"]+"\s*// shortName', '// shortName', part)
        
        result.append('new Class(' + part)
    
    final_content = ''.join(result)
    
    # Additional cleanup: remove any remaining duplicate shortName patterns
    # Find patterns like: "Name" // shortName\n, "Name2" // shortName
    final_content = re.sub(r'(".*?" // shortName)\n,\s*".*?" // shortName', r'\1', final_content)
    
    # Fix: remove duplicate shortName entries that appear as ", "name" // shortName
    final_content = re.sub(r'\n,\s*"[^"]+"\s*// shortName\n', '\n', final_content)
    
    with open(output_file, 'w') as f:
        f.write(final_content)
    
    print(f"Fixed file written to {output_file}")


if __name__ == "__main__":
    fix_file("src/assets/ClassInstantiation.ts", "src/assets/ClassInstantiation.ts")
