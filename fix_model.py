"""
Fix Rasa model Windows path issue
Converts forward slashes to backslashes in the model tar archive
"""
import tarfile
import os
import sys

def fix_model_paths(model_path):
    """Extract model, fix paths, and repackage"""
    print(f"Fixing model: {model_path}")
    
    # Create temp directory
    temp_dir = model_path.replace('.tar.gz', '_temp')
    os.makedirs(temp_dir, exist_ok=True)
    
    # Extract the tar file
    print("Extracting model...")
    with tarfile.open(model_path, 'r:gz') as tar:
        # Extract all members
        for member in tar.getmembers():
            # Fix the path - replace forward slashes with backslashes
            fixed_name = member.name.replace('/', os.sep)
            member.name = fixed_name
            tar.extract(member, temp_dir)
    
    # Create new tar.gz with fixed paths
    fixed_model_path = model_path.replace('.tar.gz', '_fixed.tar.gz')
    print(f"Creating fixed model: {fixed_model_path}")
    
    with tarfile.open(fixed_model_path, 'w:gz') as tar:
        for root, dirs, files in os.walk(temp_dir):
            for file in files:
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, temp_dir)
                tar.add(file_path, arcname)
    
    # Clean up temp directory
    import shutil
    shutil.rmtree(temp_dir)
    
    # Replace original with fixed
    os.remove(model_path)
    os.rename(fixed_model_path, model_path)
    
    print("Model fixed successfully!")
    return model_path

if __name__ == "__main__":
    import glob
    
    # Find the latest model
    models = glob.glob("models/*.tar.gz")
    if not models:
        print("No models found in models/ directory")
        sys.exit(1)
    
    # Get the most recent model
    latest_model = max(models, key=os.path.getmtime)
    fix_model_paths(latest_model)
