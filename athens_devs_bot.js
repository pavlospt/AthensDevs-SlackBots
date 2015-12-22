var Botkit = require('botkit')
var os = require('os');
var INCOMING_WEBHOOK_URL = "https://hooks.slack.com/services/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";
var slack = require('slack-notify')(INCOMING_WEBHOOK_URL);

var controller = Botkit.slackbot({
  debug: false,
});

var bot = controller.spawn(
  {
    token:process.env.tokenathensdevs
  }
).startRTM();

var extractedId = function(message) {
  return message.text.replace(/\D+/g, '').trim();
}

controller.on('channel_created',function(bot,message){
  console.log("Channel created info:" + JSON.stringify(message));
  if(message.channel.is_channel){
    slack.send({
      channel: '#general',
      text: message.channel.name + " was just created :) Feel free to join !"
    },function(err){
      if(err)
        console.error("Slack Error:" + err);
    });
  }
});

slack.onError = function (err) {
  console.error('API error:', err);
};

controller.hears(
  ['pes geia','pes gia','πες γεια','συστήσου','systisou'],
  'direct_message,direct_mention,mention,ambient',function(bot,message){
  controller.storage.users.get(message.user,function(err,user){
    bot.reply(message,"Χαιρετώ όλους τους Athens Devs. :)");
  });
});

controller.hears(
  ['malaka','μαλάκα','μαλακα','poulo','πουλο','πούλο','pousti','πούστης','πουστης','πουστη','poutana','πουτανα','gamw','gamo','kariola','καριολα','γαμώ','γαμω','gamiesai','γαμιέσαι'],
  'direct_message,direct_mention,mention,ambient',function(bot,message){
  controller.storage.users.get(message.user,function(err,user){
    if(user && user.name){
      bot.reply(message,"Μην βρίζεις ρε μαλάκα " + user.name + "!");
    }else{
      bot.reply(message,"Μην βρίζεις!");
    }
  });
});

controller.hears(['hello','hi','γεια','geia'],'direct_message,direct_mention,mention',function(bot,message) {

  controller.storage.users.get(message.user,function(err,user) {
    if (user && user.name) {
      bot.reply(message,"Hello " + user.name+"!!");
    } else {
      bot.reply(message,"Hello :P");
    }
  });
})


controller.hears(['uptime','identify yourself','who are you','what is your name'],'direct_message,direct_mention,mention',function(bot,message) {

  var hostname = os.hostname();
  var uptime = formatUptime(process.uptime());

  bot.reply(message,':robot_face: I am a bot named <@' + bot.identity.name +'>. I have been running for ' + uptime + ' on ' + " my creator's server.");

})

function formatUptime(uptime) {
  var unit = 'second';
  if (uptime > 60) {
    uptime = uptime / 60;
    unit = 'minute';
  }
  if (uptime > 60) {
    uptime = uptime / 60;
    unit = 'hour';
  }
  if (uptime != 1) {
    unit = unit +'s';
  }

  uptime = uptime + ' ' + unit;
  return uptime;
}
