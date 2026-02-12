@echo off
REM Script az autós vizsga projektet indít a backenddel és a frontenddel

color 0A
echo.
echo ===== Autós Vizsga - Teljes Projekt Indítása =====
echo Backend (Node.js) port: 3001
echo Frontend (Vite) port: 5173
echo.

REM Backend indítása új CMD ablakban
echo Backend indítása...
start "Backend - npm run server" cmd /k npm run server

REM Várakozás a backend indításához
timeout /t 2 /nobreak

REM Frontend indítása új CMD ablakban
echo Frontend indítása...
start "Frontend - npm run dev" cmd /k npm run dev

echo.
echo Mindkét szerver indítva!
echo Frontend elérhető: http://localhost:5173
echo Backend elérhető: http://localhost:3001
echo.
pause
