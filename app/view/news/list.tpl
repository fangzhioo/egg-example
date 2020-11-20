<!-- app/view/news/list.tpl -->
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
  </head>
  <body>
    <ul class="news-view view">
      {% for item in list %}
        <li class="item">
          <span> 【{{ helper.relativeTime(item.gmtCreate) }}】 </span>
          <span> {{ item.title }} </span>
        </li>
      {% endfor %}
    </ul>
  </body>
</html>