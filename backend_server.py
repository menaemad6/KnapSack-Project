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
        # Enable CORS for React local dev server (port 5173 or other)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        # Handle CORS pre-flight requests
        self.send_response(204)
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/solve':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                # Parse inputs from React
                params = json.loads(post_data.decode('utf-8'))
                weights_str = params.get('weights', '')
                values_str = params.get('values', '')
                capacity_str = str(params.get('capacity', ''))

                # Call the unified solver API
                result_payload = solve_knapsack_api(weights_str, values_str, capacity_str)
                
                # Success Response
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(result_payload).encode('utf-8'))

            except ValueError as e:
                # Catch invalid input formatting (negative values, sizes mismatch, etc.)
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
    print(f"[API] Python Knapsack Web Backend running on http://localhost:{port}")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping web backend...")
        httpd.server_close()

if __name__ == '__main__':
    run_server()
