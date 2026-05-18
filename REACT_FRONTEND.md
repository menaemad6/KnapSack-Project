# 🚀 React Frontend Integration Plan

This plan describes how we will expand the Knapsack project with a modern React frontend. The current desktop GUI flow and architecture remain **100% untouched**; we are appending a lightweight web backend in a new file, which coordinates directly with our unified API layer in `main.py`.

---

## 1. Directory Structure Additions

We will create the following files in the project workspace:

```directory
KnapSack-Project/
│
├── backend_server.py          # 🐍 NEW: Zero-dependency Python API Web Server
│
├── frontend/                  # ⚛️ NEW: React Vite Project
│   ├── package.json           # Frontend dependencies (React, Tailwind CSS, Lucide icons)
│   ├── tailwind.config.js     # Tailwind setup
│   ├── index.html             # HTML Entry
│   │
│   └── src/
│       ├── main.jsx           # React mounting point
│       ├── index.css          # Tailwind CSS directives
│       ├── App.jsx            # 🖥️ Main Side-by-Side Dashboard UI
│       │
│       └── hooks/             # 🛠️ Modular React Hooks
│           └── useKnapsack.js # Custom Hook for solving state & timing APIs
```

---

## 2. Exposing the Python Backend Data (`backend_server.py`)

To serve the frontend client, we will create a dedicated, zero-dependency HTTP server using Python's standard `http.server` library. It enables **CORS** (so our React client can make cross-port requests) and handles JSON payloads.

```python
# File: backend_server.py

import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import sys
from pathlib import Path

# Ensure we can import from the root main.py
ROOT_DIR = Path(__file__).resolve().parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from main import solve_knapsack_api

class KnapsackAPIHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        # Enable Cross-Origin Resource Sharing (CORS) for local React dev server
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        # Handle pre-flight CORS requests
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/solve':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Parse parameters from React
                params = json.loads(post_data.decode('utf-8'))
                weights_str = params.get('weights', '')
                values_str = params.get('values', '')
                capacity_str = str(params.get('capacity', ''))

                # Call the core API wrapper directly (zero logic duplicate!)
                result_payload = solve_knapsack_api(weights_str, values_str, capacity_str)
                
                # Send JSON response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(result_payload).encode('utf-8'))

            except ValueError as e:
                # Catch input validation errors (e.g. negative numbers)
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": f"Internal Server Error: {str(e)}"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, KnapsackAPIHandler)
    print(f"🚀 Python Knapsack Web Backend running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping web backend...")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
```

---

## 3. Modular React Custom Hook (`useKnapsack.js`)

To keep the UI code clean and maintainable, we abstract the state management and network calls into a custom React hook.


## 4. Side-by-Side Dashboard UI Design (`App.jsx`)

The interface splits the screen into a **2-Column Layout**:
- **Left Column**: Interactive input form (add items dynamically, set capacity, trigger solver).
- **Right Column**: Comprehensive dashboard containing detailed cards for each algorithm, a comparison table, and live relative speed calculations.


## 5. Execution & Verification Flow

To run this complete web architecture:
1. **Launch Python Web Backend**:
   Run the newly appended server file in a terminal session:
   ```bash
   python backend_server.py
   ```
   This immediately hosts a web listener on port `8000`.

2. **Launch React Development Client**:
   Navigate into the frontend project and boot up the Vite dev client:
   ```bash
   cd frontend
   npm run dev
   ```
   This will host the dashboard layout on port `5173`. Opening it allows you to solve the Knapsack problem using your existing python code directly through a stunning side-by-side web dashboard!
