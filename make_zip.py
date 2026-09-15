import os
import zipfile

zip_filename = "Smart_Navigation_AStar_Dijkstra_AbuBakr_Karim.zip"
exclude_dirs = {"node_modules", ".git", ".aistudio", "dist"}

with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in exclude_dirs]
        for file in files:
            if file == zip_filename or file.endswith(".pyc"):
                continue
            filepath = os.path.join(root, file)
            arcname = os.path.relpath(filepath, ".")
            zipf.write(filepath, arcname)

print(f"Created {zip_filename} successfully.")
