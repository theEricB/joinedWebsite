import os

def rename_images(folder_path):
    images = os.listdir(folder_path)

    for i, image in enumerate(images):
        if image.lower().endswith(('.png', '.jpg', '.jpeg')):
            new_name = f"{len(images) - i - 1}.jpg"  # Naming from highest to lowest
            os.rename(os.path.join(folder_path, image), os.path.join(folder_path, new_name))
            print(f"Renamed {image} to {new_name}")

# Example usage
rename_images('angi2.0/images')