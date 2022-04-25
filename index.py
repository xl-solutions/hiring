import os
from flask import Flask, flash, request, redirect, url_for, render_template
from werkzeug.utils import secure_filename

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'csv' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files.get('csv') #arquivo csv
        
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        
    print(request.files.get('csv'))
    return render_template('index.html')

if __name__ == "__main__":
    app.run()