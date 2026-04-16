#!/usr/bin/env python3
"""Interactive CLI tool for editing ClassInstantiation.ts attributes."""

import re
import os
import sys
from typing import Optional

FILE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "src", "assets", "ClassInstantiation.ts")

CLASS_ATTRIBUTES = [
    "dualCredit", "subject", "usualGrade", "prerequisite", "duration",
    "semesterOffered", "honorsAP", "description", "ratings", "comments",
    "averageTimePerWeek", "icon", "className", "grades", "classDifficulty",
    "tags", "shortName", "mainColor", "accentColor"
]

ARRAY_ATTRIBUTES = {"ratings", "comments", "averageTimePerWeek", "grades", "classDifficulty", "tags"}
BOOLEAN_ATTRIBUTES = {"dualCredit"}
NUMBER_ARRAY_ATTRIBUTES = {"ratings", "averageTimePerWeek", "classDifficulty"}


def parse_classes(content: str) -> list[dict]:
    """Parse all class definitions from the file content."""
    classes = []
    pattern = r'const\s+(\w+)\s*=\s*new\s+Class\(\s*\n((?:.*?\n)*?)\s*\);'
    
    for match in re.finditer(pattern, content):
        var_name = match.group(1)
        args_block = match.group(2)
        
        args = []
        for line in args_block.strip().split('\n'):
            line = line.strip()
            if not line or line.startswith('//'):
                continue
            comment_match = re.match(r'^(.*?),\s*//', line)
            if comment_match:
                value_str = comment_match.group(1).strip()
            else:
                value_str = line.rstrip(',').strip()
            
            if value_str:
                args.append(value_str)
        
        if len(args) >= 17:
            cls = {
                "var_name": var_name,
                "dualCredit": args[0],
                "subject": args[1],
                "usualGrade": args[2],
                "prerequisite": args[3],
                "duration": args[4],
                "semesterOffered": args[5],
                "honorsAP": args[6],
                "description": args[7],
                "ratings": args[8] if len(args) > 8 else "[]",
                "comments": args[9] if len(args) > 9 else "[]",
                "averageTimePerWeek": args[10] if len(args) > 10 else "[]",
                "icon": args[11] if len(args) > 11 else '"calculate"',
                "className": args[12] if len(args) > 12 else '""',
                "grades": args[13] if len(args) > 13 else "[]",
                "classDifficulty": args[14] if len(args) > 14 else "[]",
                "tags": args[15] if len(args) > 15 else "[]",
                "shortName": args[16] if len(args) > 16 else '""',
                "mainColor": args[17] if len(args) > 17 else "undefined",
                "accentColor": args[18] if len(args) > 18 else "undefined",
                "start": match.start(),
                "end": match.end(),
                "original": match.group(0),
            }
            classes.append(cls)
    
    return classes


def parse_value(value_str: str) -> str:
    """Clean a value string for display."""
    return value_str.strip().rstrip(',')


def display_class_summary(cls: dict) -> None:
    """Display a summary of a class's attributes."""
    print(f"\n{'='*60}")
    print(f"Class: {parse_value(cls['className'])}")
    print(f"Variable: {cls['var_name']}")
    print(f"{'='*60}")
    
    for i, attr in enumerate(CLASS_ATTRIBUTES, 1):
        value = parse_value(cls[attr])
        if attr in ARRAY_ATTRIBUTES:
            if value == "[]":
                display_val = "[empty]"
            elif len(value) > 50:
                display_val = value[:50] + "..."
            else:
                display_val = value
        elif attr == "description" and len(value) > 60:
            display_val = value[:60] + "..."
        else:
            display_val = value
        
        print(f"  {i:2}. {attr:20} = {display_val}")


def edit_value(current: str, attr_name: str) -> str:
    """Interactively edit a value."""
    print(f"\nCurrent value: {current}")
    print(f"Type: {'boolean' if attr_name in BOOLEAN_ATTRIBUTES else 'array' if attr_name in ARRAY_ATTRIBUTES else 'string'}")
    
    while True:
        if attr_name in BOOLEAN_ATTRIBUTES:
            new_val = input("New value (true/false): ").strip().lower()
            if new_val in ("true", "false"):
                return new_val
            print("Invalid. Enter 'true' or 'false'.")
        elif attr_name in ARRAY_ATTRIBUTES:
            print("\nOptions:")
            print("  1. Replace entire array")
            print("  2. Add items to existing")
            print("  3. Clear array")
            print("  4. Cancel")
            
            choice = input("Choice: ").strip()
            
            if choice == "1":
                if attr_name in NUMBER_ARRAY_ATTRIBUTES:
                    print("Enter numbers separated by commas (e.g., 1, 2, 3):")
                    nums = input("> ").strip()
                    return f"[{nums}]"
                else:
                    print("Enter items separated by commas (use quotes for strings):")
                    print('Example: "item1", "item2", "item3"')
                    items = input("> ").strip()
                    return f"[{items}]"
            elif choice == "2":
                if current == "[]":
                    return edit_value(current, attr_name)
                if attr_name in NUMBER_ARRAY_ATTRIBUTES:
                    print("Enter numbers to add (separated by commas):")
                    nums = input("> ").strip()
                    inner = current.strip("[]").strip()
                    return f"[{inner}, {nums}]" if inner else f"[{nums}]"
                else:
                    print('Enter items to add (e.g., "tag1", "tag2"):')
                    items = input("> ").strip()
                    inner = current.strip("[]").strip()
                    return f"[{inner}, {items}]" if inner else f"[{items}]"
            elif choice == "3":
                return "[]"
            else:
                return current
        else:
            new_val = input("New value (use quotes for strings): ").strip()
            if new_val:
                return new_val
            print("Value cannot be empty.")


def edit_class(cls: dict, classes: list[dict]) -> None:
    """Interactively edit a class's attributes."""
    while True:
        display_class_summary(cls)
        
        print(f"\n{'='*60}")
        print("  0. Done editing")
        print(" -1. Delete this class")
        print(f"{'='*60}")
        
        try:
            choice = int(input("\nSelect attribute to edit (number): ").strip())
        except ValueError:
            print("Invalid input.")
            continue
        
        if choice == 0:
            break
        elif choice == -1:
            confirm = input("Delete this class? (yes/no): ").strip().lower()
            if confirm == "yes":
                cls["deleted"] = True
            break
        elif 1 <= choice <= len(CLASS_ATTRIBUTES):
            attr = CLASS_ATTRIBUTES[choice - 1]
            cls[attr] = edit_value(cls[attr], attr)
            print(f"Updated {attr}.")
        else:
            print("Invalid choice.")


def create_new_class(existing_classes: list[dict]) -> dict:
    """Create a new class from scratch."""
    print("\n" + "="*60)
    print("CREATE NEW CLASS")
    print("="*60)
    
    var_name = input("Variable name (camelCase, e.g., myNewClass): ").strip()
    if not var_name:
        print("Variable name required.")
        return {}
    
    new_cls = {
        "var_name": var_name,
        "deleted": False,
    }
    
    for attr in CLASS_ATTRIBUTES:
        if attr in BOOLEAN_ATTRIBUTES:
            val = input(f"{attr} (true/false) [false]: ").strip().lower()
            new_cls[attr] = val if val in ("true", "false") else "false"
        elif attr in ARRAY_ATTRIBUTES:
            if attr in NUMBER_ARRAY_ATTRIBUTES:
                val = input(f"{attr} (comma-separated numbers, empty for []): ").strip()
                new_cls[attr] = f"[{val}]" if val else "[]"
            else:
                val = input(f'{attr} (comma-separated strings, empty for []): ').strip()
                new_cls[attr] = f"[{val}]" if val else "[]"
        else:
            defaults = {
                "icon": '"calculate"',
                "className": f'"{var_name}"',
                "shortName": f'"{var_name}"',
                "mainColor": "undefined",
                "accentColor": "undefined",
            }
            default = defaults.get(attr, '""')
            val = input(f"{attr} [{default}]: ").strip()
            new_cls[attr] = val if val else default
    
    return new_cls


def format_class_block(cls: dict) -> str:
    """Format a class dictionary back into TypeScript code."""
    lines = [f"const {cls['var_name']} =new Class("]
    
    comments = {
        "dualCredit": "dualCredit",
        "subject": "subject",
        "usualGrade": "usualGrade",
        "prerequisite": "prerequisite",
        "duration": "duration",
        "semesterOffered": "Semester Offered",
        "honorsAP": "honorsAP",
        "description": "description",
        "ratings": "ratings",
        "comments": "comments",
        "averageTimePerWeek": "averageTimePerWeek",
        "icon": "icon",
        "className": "className",
        "grades": "grades",
        "classDifficulty": "classDifficulty",
        "tags": "tags",
        "shortName": "shortName",
    }
    
    for attr in CLASS_ATTRIBUTES:
        if attr in comments:
            comment = comments[attr]
        else:
            comment = attr
        
        value = cls[attr]
        lines.append(f"    {value}, // {comment}")
    
    lines.append(");")
    lines.append("")
    lines.append("")
    
    return "\n".join(lines)


def write_file(content: str, classes: list[dict]) -> None:
    """Write the updated content back to the file."""
    sorted_classes = sorted(
        [c for c in classes if not c.get("deleted")],
        key=lambda c: c.get("start", 0)
    )
    
    new_blocks = []
    for cls in sorted_classes:
        if "start" in cls:
            new_blocks.append((cls["start"], cls["end"], format_class_block(cls)))
    
    result = content
    offset = 0
    for start, end, new_block in new_blocks:
        adjusted_start = start + offset
        adjusted_end = end + offset
        result = result[:adjusted_start] + new_block + result[adjusted_end:]
        offset += len(new_block) - (adjusted_end - adjusted_start)
    
    course_map_section = re.search(
        r'(const courseMap = new Map\(\);[\s\S]*?)(?=//\s*DO NOT CHANGE|$)',
        result
    )
    
    if course_map_section:
        existing_map = course_map_section.group(1)
        map_lines = ["const courseMap = new Map();\n"]
        
        active_classes = [c for c in sorted_classes if not c.get("deleted")]
        for cls in active_classes:
            map_lines.append(f"courseMap.set({cls['var_name']}.getCourseId(), {cls['var_name']});\n")
        
        result = result[:course_map_section.start()] + "".join(map_lines) + result[course_map_section.end():]
    
    with open(FILE_PATH, "w") as f:
        f.write(result)
    
    print(f"\nFile updated: {FILE_PATH}")


def main():
    """Main entry point."""
    if not os.path.exists(FILE_PATH):
        print(f"Error: File not found: {FILE_PATH}")
        sys.exit(1)
    
    with open(FILE_PATH, "r") as f:
        content = f.read()
    
    classes = parse_classes(content)
    
    if not classes:
        print("No classes found in file.")
        sys.exit(1)
    
    print("="*60)
    print("CLASS INSTANTIATION EDITOR")
    print("="*60)
    
    while True:
        print(f"\nFound {len(classes)} classes.")
        print("\nOptions:")
        print("  1. Edit existing class")
        print("  2. Create new class")
        print("  3. Search classes")
        print("  4. List all classes")
        print("  5. Save and exit")
        print("  6. Exit without saving")
        
        choice = input("\nChoice: ").strip()
        
        if choice == "1":
            print("\nAvailable classes:")
            for i, cls in enumerate(classes, 1):
                name = parse_value(cls["className"])
                print(f"  {i}. {name} ({cls['var_name']})")
            
            try:
                idx = int(input("\nSelect class (number): ").strip()) - 1
                if 0 <= idx < len(classes):
                    edit_class(classes[idx], classes)
                else:
                    print("Invalid selection.")
            except ValueError:
                print("Invalid input.")
        
        elif choice == "2":
            new_cls = create_new_class(classes)
            if new_cls and new_cls.get("var_name"):
                new_cls["start"] = classes[-1]["end"] if classes else 0
                new_cls["end"] = new_cls["start"]
                classes.append(new_cls)
                print(f"\nClass '{new_cls['var_name']}' created. Edit it now?")
                edit_class(new_cls, classes)
        
        elif choice == "3":
            query = input("\nSearch term: ").strip().lower()
            matches = [
                c for c in classes
                if query in parse_value(c["className"]).lower()
                or query in c["var_name"].lower()
                or query in parse_value(c.get("subject", "")).lower()
            ]
            if matches:
                print(f"\nFound {len(matches)} matches:")
                for i, cls in enumerate(matches, 1):
                    print(f"  {i}. {parse_value(cls['className'])} ({cls['var_name']})")
                
                try:
                    idx = int(input("\nSelect class to edit (number, 0 to cancel): ").strip())
                    if idx > 0:
                        edit_class(matches[idx - 1], classes)
                except ValueError:
                    pass
            else:
                print("No matches found.")
        
        elif choice == "4":
            print("\nAll classes:")
            for i, cls in enumerate(classes, 1):
                name = parse_value(cls["className"])
                subject = parse_value(cls.get("subject", "N/A"))
                print(f"  {i}. {name} [{subject}]")
        
        elif choice == "5":
            write_file(content, classes)
            print("Changes saved.")
            break
        
        elif choice == "6":
            print("Exiting without saving.")
            break
        
        else:
            print("Invalid choice.")


if __name__ == "__main__":
    main()
