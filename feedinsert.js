var feedparser = require('feedparser');
var mongo = require("mongodb");
var host = "127.0.0.1";
var port = 27017;
var db = new mongo.Db("newsproject", new mongo.Server(host, port, {}), {safe:false});

var url0 = 'http://sports.espn.go.com/espn/rss/nba/news';
var url1 = 'http://tech2ipo.com/feed';//tech
var url2 = 'http://rss.sina.com.cn/news/marquee/ddt.xml';//news
var url3 = 'http://cn.nowness.com/issue/syndicate?output=rss' //fashion
var url4 = 'http://www.ftchinese.com/rss/feed';//finance
var url5 = 'http://feed.mtime.com/movienews.rss';//movie
var url6 = 'http://sports.163.com/special/00051K7F/rss_sportslq.xml';//sports

var urllist = [
	'http://sports.espn.go.com/espn/rss/nba/news',
	'http://tech2ipo.com/feed',
	'http://rss.sina.com.cn/news/marquee/ddt.xml',
	'http://cn.nowness.com/issue/syndicate?output=rss',
	'http://www.ftchinese.com/rss/feed',
	'http://feed.mtime.com/movienews.rss',
	'http://sports.163.com/special/00051K7F/rss_sportslq.xml'];

function callback (error, meta, articles){
  if (error) console.error(error);
  else {

	db.open(function(error){
		console.log("connected " + host + ":" + port);

		db.collection("story", function(error, collection){
			
		    articles.forEach(function (article){
				// console.log('source: ' + meta.title);
				// console.log('title: ' + article.title);
				// console.log('link: ' + article.link);
				// console.log('summary: ' + article.summary);//discription
				// console.log('description: ' + article.description);//content
				// console.log('publish date: ' + article.pubdate);
				// console.log('guid: ' + article.guid);
				// console.log('author: ' + article.author);
				// console.log('comments: ' + article.comments);
				// console.log('category: ' + "tech");   
				// console.log('*********************successfully inserted!\n');			
				collection.insert({
					source: meta.title,
					title: article.title,
					link: article.link,
					summary: article.summary,
					description: article.description,
					pubdate: article.pubdate,
					guid: article.guid,
					author: article.author,	
					comments: article.comments,
					category: "spt"					
				}, function(){
					console.log(article.guid + " successfully inserted!");					
				});					
		    });
			db.close();	
		});

	});//open
  }//else
}//callback

//feedparser.parseUrl(url6, callback);
for(var i = 0; i <urllist.length; i++){
	feedparser.parseUrl(urllist[i], callback);
}