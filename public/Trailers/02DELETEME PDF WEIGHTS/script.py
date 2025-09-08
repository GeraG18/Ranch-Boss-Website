import os
import glob

def extract_pdf_names():
    # Get the current directory
    current_dir = os.getcwd()
    
    # Create a text file to store the results
    output_file = "pdf_names.txt"
    
    # Get all folders in the current directory and sort them in ascending order
    all_items = os.listdir(current_dir)
    folders = [item for item in all_items if os.path.isdir(os.path.join(current_dir, item))]
    folders.sort()  # This sorts in ascending order
    
    # Open the output file for writing
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("List of PDF files found in all folders (in ascending order):\n")
        f.write("=" * 60 + "\n\n")
        
        # Process each folder in ascending order
        for folder in folders:
            folder_path = os.path.join(current_dir, folder)
            
            # Find all PDF files in the current folder
            pdf_files = glob.glob(os.path.join(folder_path, '*.pdf'))
            
            # Sort PDF files in ascending order
            pdf_files.sort()
            
            if pdf_files:
                # Write the folder name
                f.write(f"Folder: {folder}\n")
                f.write("-" * 40 + "\n")
                
                # Write each PDF file name
                for pdf_file in pdf_files:
                    f.write(f"  {os.path.basename(pdf_file)}\n")
                
                f.write("\n")  # Add a blank line between folders
            else:
                # Optionally mention folders with no PDFs
                f.write(f"Folder: {folder} (No PDF files found)\n")
                f.write("-" * 40 + "\n\n")
    
    print(f"PDF names have been saved to {output_file}")
    print(f"Processed {len(folders)} folders in ascending order.")

if __name__ == "__main__":
    extract_pdf_names()