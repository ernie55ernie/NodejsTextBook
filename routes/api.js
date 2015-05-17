var PATtree = require("pat-tree");


exports.printTree = function(req, res){
  var tree = new PATtree();
  var doc = '今明晴朗炎熱午後山區局部對流雨，下周三起梅雨報到天氣形態大轉變受到太平洋高壓籠罩影響，連續幾天以來台灣各地都是晴朗炎熱的夏季型天氣，預估這樣的情況在今明兩天(17~18日)都還會持續，各地仍是晴朗炎熱，午後雲量增多的天氣為主，山區到了中午過後有局部熱對流降雨機會，降雨範圍有限，不過對流發展起來的地方仍可能出現短時間突發性的大雨，前往山區活動還是要稍微注意午後的天氣變化。白天各地溫度偏高，普遍可達31~33度以上，部分地區甚至可達34~35度，陽光強烈，紫外線指數普遍達到過量至危險等級，提醒大家外出時務必要做好防曬準備，並且多補充水分預防中暑。下周二(19日)太平洋高壓強度開始逐漸減弱，北邊的鋒面系統跟著往南移動，台灣上空西南風有逐漸加強的趨勢，大氣轉趨不穩定，中部以北到東北部、東部地區午後熱對流的機會增加，中南部沿海因為面迎西南風水氣，也可能出現局部短暫陣雨。真正要提醒大家注意的是從周二深夜到周三(20日)清晨間逐漸來到台灣上空的鋒面系統，目前來看這波鋒面南下正好遇上今年孟加拉灣到南海一帶首度湧現的夏季西南季風水氣，到時候西南季風夾帶豐沛的水氣配合鋒面系統的抬升動力，可能在台灣附近產生活躍旺盛的中小尺度對流系統，有機會為台灣各地帶來大雨或豪雨等級的雨勢，而且這種不穩定的環境預估會在台灣附近至少持續到下周日(24日)左右，因此自下周三起連續幾天都可能出現較為明顯的降雨，天氣型態將出現巨大的轉變，跟這幾天晴朗炎熱的狀況可說是完全不同，提醒大家要預先做好準備，迎接這波今年第一道真正符合定義的梅雨鋒面系統。至於今年第7號颱風白海豚已經在昨天晚間增強為強烈颱風，結構完整而且颱風眼非常清楚，幸好它如先前預期的已經在北轉的過程中，離台灣還非常遙遠，對台灣的天氣不會造成影響，對日本的天氣影響也有限。';
  tree.addDocument(doc);
  //tree.extractSLP(10, 0.5); 
  //res = tree.segmentDoc('有時喜歡有時候不喜歡', true); 
  //res.render(result);
  //res.json(tree.toJSON());
  var SLPs = tree.extractSLP(2, 0.1, false); 
  var result = tree.segmentDoc(doc, true); 
  res.send(result.join(' '));
}

/*var redis = require('redis');
var redis_client = redis.createClient();

exports.retrieve = function (req, res) {

	redis_client.lrange('all:comments', 0, -1, function(err, repl){
      if (err) {
        console.log('Error when reading from Redis', err);
        res.writeHeader(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
        res.end();
      } else {
        res.writeHeader(200, { 'Content-Type': 'application/javascript' });
        res.write(JSON.stringify(repl));
        res.end();
      }
    });
};

exports.push = function(req, res){

    var post_request_body = '';

    req.on('data', function (data) {
      post_request_body += data;
    });

    req.on('end', function (data) {
      var x=JSON.parse(post_request_body)
      x[2]=moment().format();
      console.log(moment().format());
      post_request_body=JSON.stringify(x);
      redis_client.lpush('all:comments', post_request_body, function(err, repl){
        if (err) {
          res.writeHeader(500, { 'Content-Type': 'text/plain' });
          res.write('Internal Server Error');
          res.end();
        } else {
          res.writeHeader(200, { 'Content-Type': 'text/html' });
          res.write('OK');
          res.end();
        }
      });
    });
}*/