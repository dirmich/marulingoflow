#!/bin/bash

ACTION=$1
TARGET=$2

if [ -z "$ACTION" ]; then
    echo "Usage: ./man.sh [start|stop|restart|status] [all|frontend|backend]"
    exit 1
fi

if [ -z "$TARGET" ]; then
    TARGET="all"
fi

BE_PORT=8000
FE_PORT=3000

check_and_kill_port() {
    local port=$1
    local name=$2
    # Find process ID using port (Windows/MINGW64 compatible)
    local pid=$(netstat -ano | grep ":$port " | grep "LISTENING" | awk '{print $5}' | head -n 1)
    
    if [ ! -z "$pid" ]; then
        echo "[WARNING] $name port $port is already in use by PID $pid."
        read -p "Do you want to kill this process? (y/n): " confirm
        if [ "$confirm" == "y" ] || [ "$confirm" == "Y" ]; then
            echo "[INFO] Killing process $pid..."
            taskkill //F //PID $pid
            sleep 1
        else
            echo "[INFO] Skipping $name start."
            return 1
        fi
    fi
    return 0
}

case $ACTION in
    start)
        if [ "$TARGET" == "all" ] || [ "$TARGET" == "backend" ]; then
            if [ -d "backend" ]; then
                if check_and_kill_port $BE_PORT "Backend"; then
                    echo "[INFO] Starting Backend..."
                    (cd backend && nohup bun dev > ../backend.log 2>&1 & echo $!) > backend.pid
                    echo "[SUCCESS] Backend started: http://localhost:$BE_PORT"
                fi
            else
                echo "[ERROR] Backend directory not found"
            fi
        fi
        if [ "$TARGET" == "all" ] || [ "$TARGET" == "frontend" ]; then
            if [ -d "frontend" ]; then
                if check_and_kill_port $FE_PORT "Frontend"; then
                    echo "[INFO] Starting Frontend..."
                    (cd frontend && nohup bun dev > ../frontend.log 2>&1 & echo $!) > frontend.pid
                    echo "[SUCCESS] Frontend started: http://localhost:$FE_PORT"
                fi
            else
                echo "[ERROR] Frontend directory not found"
            fi
        fi
        ;;
    stop)
        if [ "$TARGET" == "all" ] || [ "$TARGET" == "backend" ]; then
            if [ -f backend.pid ]; then
                echo "[INFO] Stopping Backend..."
                kill $(cat backend.pid) && rm backend.pid
            fi
        fi
        if [ "$TARGET" == "all" ] || [ "$TARGET" == "frontend" ]; then
            if [ -f frontend.pid ]; then
                echo "[INFO] Stopping Frontend..."
                kill $(cat frontend.pid) && rm frontend.pid
            fi
        fi
        ;;
    restart)
        $0 stop $TARGET
        sleep 2
        $0 start $TARGET
        ;;
    status)
        if [ -f backend.pid ]; then
            echo "[RUNNING] Backend PID: $(cat backend.pid)"
        else
            echo "[STOPPED] Backend"
        fi
        if [ -f frontend.pid ]; then
            echo "[RUNNING] Frontend PID: $(cat frontend.pid)"
        else
            echo "[STOPPED] Frontend"
        fi
        ;;
    *)
        echo "Invalid action: $ACTION"
        ;;
esac
