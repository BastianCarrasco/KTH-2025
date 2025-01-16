import subprocess

def run_npm_dev():
    # Ruta al directorio del proyecto
    project_path = r"C:\Users\56974\Desktop\KTH 2025\KTH-2025\frontend"

    # Comando a ejecutar
    command = "npm run dev"

    try:
        # Cambiar al directorio del proyecto y ejecutar el comando
        subprocess.run(command, cwd=project_path, shell=True, check=True)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")

# Llamar a la función para ejecutar el comando
run_npm_dev()
