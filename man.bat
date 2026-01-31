@echo off
setlocal enabledelayedexpansion

set ACTION=%1
set TARGET=%2

if "%ACTION%"=="" goto usage
if "%TARGET%"=="" set TARGET=all
if "%TARGET%"=="none" set TARGET=all

:check_action
if "%ACTION%"=="start" goto do_start
if "%ACTION%"=="stop" goto do_stop
if "%ACTION%"=="restart" goto do_restart
if "%ACTION%"=="status" goto do_status
goto usage

:do_start
if "%TARGET%"=="all" (
    start "Lingo-BE" cmd /k "cd backend && bun dev"
    start "Lingo-FE" cmd /k "cd frontend && bun dev"
) else if "%TARGET%"=="backend" (
    start "Lingo-BE" cmd /k "cd backend && bun dev"
) else if "%TARGET%"=="frontend" (
    start "Lingo-FE" cmd /k "cd frontend && bun dev"
)
goto end

:do_stop
echo [INFO] Stopping services...
if "%TARGET%"=="all" (
    taskkill /FI "WINDOWTITLE eq Lingo-BE*" /F
    taskkill /FI "WINDOWTITLE eq Lingo-FE*" /F
) else if "%TARGET%"=="backend" (
    taskkill /FI "WINDOWTITLE eq Lingo-BE*" /F
) else if "%TARGET%"=="frontend" (
    taskkill /FI "WINDOWTITLE eq Lingo-FE*" /F
)
goto end

:do_restart
call %0 stop %TARGET%
timeout /t 2
call %0 start %TARGET%
goto end

:do_status
echo [INFO] Checking status...
tasklist /V /FI "STATUS eq running" | findstr "Lingo-"
if %ERRORLEVEL% neq 0 echo Service is not running.
goto end

:usage
echo Usage: man.bat [start^|stop^|restart^|status] [all^|frontend^|backend]
echo Default target is 'all' (frontend + backend)
exit /b 1

:end
exit /b 0
