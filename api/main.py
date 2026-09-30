import os, sys, json, argparse
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from api.inference import InferenceService

inference_service = InferenceService()

def run_stdlib_server(host="0.0.0.0", port=8000):
    from http.server import HTTPServer, BaseHTTPRequestHandler
    from urllib.parse import urlparse
    class Handler(BaseHTTPRequestHandler):
        def _send(self, data, code=200):
            self.send_response(code)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Access-Control-Allow-Headers", "*")
            self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
            self.end_headers()
            self.wfile.write(json.dumps(data, indent=2).encode("utf-8"))
        def do_OPTIONS(self): self._send({}, 200)
        def do_GET(self):
            path = urlparse(self.path).path.rstrip("/")
            if path in ["/health", "/api/health"]: self._send(inference_service.get_health())
            elif path in ["/metrics", "/api/metrics"]: self._send(inference_service.get_metrics())
            elif path in ["/importance", "/api/importance"]: self._send(inference_service.get_importance())
            elif path in ["/trends", "/api/trends"]: self._send(inference_service.get_trends())
            else: self._send({"error": "Endpoint not found"}, 404)
        def do_POST(self):
            path = urlparse(self.path).path.rstrip("/")
            l = int(self.headers.get("Content-Length", 0))
            body = json.loads(self.rfile.read(l).decode("utf-8")) if l else {}
            if path in ["/predict", "/api/predict"]: self._send(inference_service.predict_one(body.get("features", body), body.get("learner_id")))
            elif path in ["/predict/batch", "/api/predict/batch"]: self._send(inference_service.predict_batch(body.get("learners", [])))
            else: self._send({"error": "Endpoint not found"}, 404)
    print(f"\n SEB-XRIF REST Server active on http://{host}:{port}/")
    print(f" Press Ctrl + C to stop\n")
    HTTPServer((host, port), Handler).serve_forever()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8000)
    args = parser.parse_args()
    try:
        import uvicorn
        uvicorn.run("api.main:app", host="0.0.0.0", port=args.port)
    except Exception:
        run_stdlib_server(port=args.port)
