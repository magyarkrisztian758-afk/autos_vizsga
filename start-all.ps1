# Script az autós vizsga projektet indít a backenddel és a frontenddel

Write-Host "=== Autós Vizsga - Teljes Projekt Indítása ===" -ForegroundColor Green
Write-Host "Backend (Node.js) port: 3001" -ForegroundColor Cyan
Write-Host "Frontend (Vite) port: 5173" -ForegroundColor Cyan
Write-Host ""

# Backend indítása új PowerShell ablakban
Write-Host "Backend indítása..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run server" -WorkingDirectory $PSScriptRoot

# Rövid várakozás a backend indításához
Start-Sleep -Seconds 2

# Frontend indítása új PowerShell ablakban
Write-Host "Frontend indítása..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WorkingDirectory $PSScriptRoot

Write-Host "Mindkét szerver indítva!" -ForegroundColor Green
Write-Host "Frontend elérhető: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend elérhető: http://localhost:3001" -ForegroundColor Cyan
