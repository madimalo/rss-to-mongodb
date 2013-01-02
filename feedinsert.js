var feedparser = require('feedparser'),
    cheerio = require('cheerio'),
	mongo = require('mongodb'),
	config = require('./config.js'),
	host = "127.0.0.1",
	port = 27017,
	db = new mongo.Db("newstest", new mongo.Server(host, port, {}), {safe:false});


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

				var id = new mongo.ObjectID();
			
				collection.update({
					pubdate: article.pubdate,
					guid: article.guid
				}, {
					_id: id,
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
				}, {
					upsert: true
				}, function(){
					console.log(id + " with url=" + article.guid + " successfully inserted or updated!");					
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