@echo off
echo ==========================================
echo   Quotes Recommendation Chatbot
echo ==========================================
echo.

REM Check if virtual environment exists
if not exist ".venv\Scripts\rasa.exe" (
    echo Error: Virtual environment not found!
    echo Please wait while we set up the environment...
    
    REM Create virtual environment if uv exists
    if exist "uv.exe" (
        echo Creating virtual environment with Python 3.10...
        uv.exe venv --python python3.10 .venv --clear
        if errorlevel 1 (
            echo Failed to create virtual environment!
            pause
            exit /b 1
        )
        
        echo Installing Rasa and dependencies...
        .venv\Scripts\pip install rasa==3.6.0 rasa-sdk==3.6.0 flask spacy requests python-dotenv
        if errorlevel 1 (
            echo Failed to install dependencies!
            pause
            exit /b 1
        )
        
        echo Installing compatible setuptools...
        .venv\Scripts\pip install "setuptools<60"
    ) else (
        echo uv.exe not found! Please install uv first.
        pause
        exit /b 1
    )
)

REM Kill any existing Rasa processes to avoid port conflicts
echo Stopping any existing Rasa servers...
taskkill /F /IM rasa.exe /T 2>nul
timeout /t 3 /nobreak > nul

REM Check if model exists
if not exist "models\*.tar.gz" (
    echo.
    echo ==========================================
    echo   WARNING: No trained model found!
    echo ==========================================
    echo.
    echo Please train a model first by running:
    echo.
    echo   set RASA_TELEMETRY_ENABLED=false
    echo   set SQLALCHEMY_SILENCE_UBER_WARNING=1
    echo   .venv\Scripts\rasa train
    echo.
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo Found existing model. Ready to start!

echo.
echo ==========================================
echo   Starting Rasa Servers
echo ==========================================
echo.

echo Starting Rasa Action Server on port 5055...
start "Rasa Action Server" cmd /k "echo Starting Action Server... && set RASA_TELEMETRY_ENABLED=false && set SQLALCHEMY_SILENCE_UBER_WARNING=1 && .venv\Scripts\rasa run actions"

echo Waiting for action server to initialize...
timeout /t 8 /nobreak > nul

echo.
echo Starting Rasa Server on port 5005...
start "Rasa Server" cmd /k "echo Starting Rasa Server... && echo This may take 30-60 seconds to load the model... && set RASA_TELEMETRY_ENABLED=false && set SQLALCHEMY_SILENCE_UBER_WARNING=1 && .venv\Scripts\rasa run --enable-api --cors *"

echo.
echo Waiting for Rasa server to fully load...
echo This may take 30-60 seconds on first start...
timeout /t 15 /nobreak > nul

REM Check if server is responding
echo.
echo Checking if server is ready...
set SERVER_READY=0
for /l %%i in (1,1,10) do (
    timeout /t 2 /nobreak > nul
    curl -s http://localhost:5005/ >nul 2>&1
    if not errorlevel 1 (
        set SERVER_READY=1
        goto SERVER_OK
    )
    echo Waiting for server... attempt %%i/10
)

:SERVER_OK
if %SERVER_READY%==1 (
    echo.
    echo ==========================================
    echo   Server is ready!
    echo ==========================================
) else (
    echo.
    echo ==========================================
    echo   Server is still starting...
    echo ==========================================
    echo The server may take longer to start.
    echo The web interface will check the connection.
)

echo.
echo ==========================================
echo   Opening Chatbot Interface...
echo ==========================================
start "" "web\demo.html"

echo.
echo ==========================================
echo   Chatbot is starting up! 
echo ==========================================
echo.
echo - Rasa Action Server: Running on port 5055
echo - Rasa Server: Running on port 5005
echo - Chat Interface: Opened in browser
echo.
echo If you see "Connection error" in the browser:
echo   1. Wait 30-60 seconds for the server to fully load
echo   2. Refresh the browser page (F5)
echo.
echo Try typing:
echo   - Success quotes
echo   - Love quotes
echo   - Funny quotes
echo   - Inspiration
echo.
echo Press any key to exit this window (servers will keep running)...
pause > nul