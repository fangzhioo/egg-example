<html>
  <head>
    <title>两种文件上传的模式</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <div>
      <h1>File 模式</h1>
      <div>
        <form method="POST" action="/upload_file" enctype="multipart/form-data">
          <div> title: <input name="title" /></div>
          <div>
            file1: <input name="file1" type="file" />
          </div>
          <div>
            file2: <input name="file2" type="file" />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>

    <div>
      <h1>Stream 模式</h1>
      <div>
        <form method="POST" action="/upload_stream" enctype="multipart/form-data">
          title: <input name="title" />
          <div>
            file: <input name="file" type="file" />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  </body>
</html>