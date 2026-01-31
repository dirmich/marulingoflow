import os
import shutil

root = r"z:\work\0.project\marulingoflow"
docs_dir = os.path.join(root, "docs")
backend_dir = os.path.join(root, "backend")
frontend_dir = os.path.join(root, "frontend")
app_dir = os.path.join(root, "app")

# 1. Create target directories
for d in [docs_dir, backend_dir, frontend_dir, app_dir]:
    if not os.path.exists(d):
        os.makedirs(d)

# 2. Files to move to docs
docs_files = ["api.md", "agent.md"]
for f in docs_files:
    src = os.path.join(root, f)
    dst = os.path.join(docs_dir, f)
    if os.path.exists(src):
        shutil.move(src, dst)

# 3. Files to move to backend
backend_files = ["package.json", "bun.lock", "tsconfig.json", "index.ts", ".gitignore"]
for f in backend_files:
    src = os.path.join(root, f)
    dst = os.path.join(backend_dir, f)
    if os.path.exists(src):
        shutil.move(src, dst)

# 4. Clean up broken folders
broken_folders = ["srcconfig", "srcdb", "srcmiddlewares", "srcroutes", "srcservices", "srctypes", "src", "docs_temp"]
for d in broken_folders:
    path = os.path.join(root, d)
    if os.path.exists(path) and os.path.isdir(path):
        shutil.rmtree(path)

print("Cleanup and reorganization complete.")
