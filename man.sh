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

case $ACTION in
    start)
        if [ "$TARGET" == "all" ] || [ "$TARGET" == "backend" ]; then
            echo "[INFO] Starting Backend..."
            cd backend && nohup bun dev > ../backend.log 2>&1 & echo $! > ../backend.pid && cd ..
        fi
        if [ "$TARGET" == "all" ] || [ "$TARGET" == "frontend" ]; then
            echo "[INFO] Starting Frontend..."
            cd frontend && nohup bun dev > ../frontend.log 2>&1 & echo $! > ../frontend.pid && cd ..
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
