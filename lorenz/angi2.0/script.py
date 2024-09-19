import os

def rename_images(folder_path):
    images = os.listdir(folder_path)
    stunden = 1
    tage = 15
    for i, image in enumerate(images):
        if image.lower().endswith(('.png', '.jpg', '.jpeg', '.heic')):
            if (stunden > 7):
                stunden = 1
                tage -= 1
            new_name = f"{tage * 10 + stunden}.jpg"
            os.rename(os.path.join(folder_path, image), os.path.join(folder_path, new_name))
            print(f"Renamed {image} to {new_name}")
            stunden += 1

# Example usage
rename_images('angi2.0/images')
