var feedparser = require('feedparser'),
    cheerio = require('cheerio'),
	mongo = require('mongodb'),
	config = require('./config.js'),
	host = "127.0.0.1",
	port = 27017,
	db = new mongo.Db("news", new mongo.Server(host, port, {}), {safe:false});


function callback (error, meta, articles){
  if (error) {
  	console.error(error);
  } else {

	db.open(function(error){

		console.log("connected " + host + ":" + port);

		db.collection("story", function(error, collection){
			
		    articles.forEach(function (article){

  				var $ = cheerio.load(article.description);
 
			    //console.log($('img').first().attr('src') + '\n');
			    var img = $('img').first().attr('src');


				// console.log('source: ' + meta.title);
				// console.log('meta link: ' + meta.link);
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
					category: config.category[meta.link],
					image: img				
				}, function(){
					console.log(article.guid + " successfully inserted!");					
				});					
		    });
			db.close();	
		});

	});//open
  }//else
}//callback

feedparser.parseUrl(config.sites.tech.url1, callback);
// for(var i = 0; i <urllist.length; i++){
// 	feedparser.parseUrl(urllist[i], callback);
// }

//console.log(config.divimg["http://www.ifanr.com"]);
//console.log(config.sites.tech.link3);