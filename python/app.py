from flask import Flask, render_template, request
from werkzeug.utils import secure_filename
from process_csv import process_csv

ALLOWED_EXTENSIONS = {'csv'}

app = Flask(__name__)


@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['file']
      if  allowed_file(f.filename) == False:
          return 'File is invalid'
      path = f'./upload/{secure_filename(f.filename)}'
      f.save(path)
      process_csv(path)
      return 'file uploaded successfully'
      

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS




      
