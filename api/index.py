import sys
import os

# Add parent directory to path
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)

# Import the Flask app
from app import app

# Export the Flask app directly for Vercel
# Vercel's Python runtime expects a WSGI-compatible app
application = app
